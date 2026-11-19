const defaultOrigins = [
  "https://www.iboukouncosmetics.com",
  "https://iboukouncosmetics.com",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];

const allowedOrigins = new Set(
  (Deno.env.get("ALLOWED_ORIGINS") ?? defaultOrigins.join(","))
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);
const allowedHostnames = new Set(
  (Deno.env.get("TURNSTILE_ALLOWED_HOSTNAMES") ??
    "www.iboukouncosmetics.com,iboukouncosmetics.com,localhost,127.0.0.1")
    .split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean),
);

function response(
  body: Record<string, unknown>,
  status: number,
  origin: string | null,
): Response {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin",
  });
  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Headers", "authorization, apikey, content-type, x-client-info");
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function text(value: unknown, maximum: number): string {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function positiveInteger(value: unknown): number | null {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}

function validPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) throw new Error("Turnstile is not configured");
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(10000),
  });
  if (!result.ok) throw new Error(`Turnstile verification failed with HTTP ${result.status}`);
  const verification = await result.json();
  return verification.success === true &&
    typeof verification.hostname === "string" &&
    allowedHostnames.has(verification.hostname.toLowerCase());
}

async function supabaseRequest(
  path: string,
  init: RequestInit = {},
): Promise<unknown> {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Supabase server credentials are not configured");

  const result = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    signal: AbortSignal.timeout(10000),
  });
  if (!result.ok) {
    console.error("public-submit: Supabase request failed", result.status);
    throw new Error("Database request failed");
  }
  return await result.json();
}

async function submitOrder(payload: Record<string, unknown>) {
  const productId = positiveInteger(payload.produit_id);
  const quantity = positiveInteger(payload.quantite);
  const name = text(payload.nom_client, 120);
  const whatsapp = text(payload.telephone, 32);
  const phone = text(payload.telephone_appel, 32);
  const city = text(payload.ville, 120);
  const district = text(payload.quartier, 120);
  const productName = text(payload.produit_nom, 160);
  const submittedTotal = positiveInteger(payload.prix_total);

  if (
    !productId || !quantity || quantity > 999 || !name || !city || !district ||
    !validPhone(whatsapp) || !validPhone(phone) || !submittedTotal
  ) {
    return { status: 400, body: { success: false, message: "Vérifiez les informations de votre commande." } };
  }

  const products = await supabaseRequest(
    `produits?select=id,nom,slug,prix,actif&id=eq.${productId}&limit=1`,
  ) as Array<{ id: number; nom: string; slug: string; prix: number; actif: boolean }>;
  const product = products[0];
  if (product && (!product.actif || !Number.isSafeInteger(product.prix) || product.prix <= 0)) {
    return { status: 404, body: { success: false, message: "Ce produit n'est plus disponible. Actualisez la page." } };
  }

  let unitPrice: number;
  let priceVerified = false;
  if (product) {
    unitPrice = product.prix;
    if (product.slug === "savon-gommant" && /petit pot/i.test(productName)) {
      unitPrice = 3000;
    }
    priceVerified = true;
  } else {
    // Produit pack non présent dans Supabase : accepter le prix soumis tel quel
    unitPrice = submittedTotal / quantity;
  }

  const promotions = await supabaseRequest(
    `promotions?select=prix_promo,min_unites,date_debut,date_fin&produit_id=eq.${productId}&actif=eq.true`,
  ) as Array<{ prix_promo: number; min_unites: number; date_debut: string | null; date_fin: string | null }>;
  const today = new Date().toISOString().slice(0, 10);
  for (const promotion of promotions) {
    const starts = !promotion.date_debut || promotion.date_debut <= today;
    const ends = !promotion.date_fin || promotion.date_fin >= today;
    if (
      starts && ends && promotion.min_unites <= quantity &&
      promotion.prix_promo > 0 && promotion.prix_promo < unitPrice
    ) {
      unitPrice = promotion.prix_promo;
    }
  }

  const total = unitPrice * quantity;
  if (priceVerified && submittedTotal !== total) {
    return {
      status: 409,
      body: { success: false, message: "Le prix a changé. Actualisez la page puis vérifiez votre commande." },
    };
  }

  const rows = await supabaseRequest("commandes_formulaire", {
    method: "POST",
    body: JSON.stringify({
      nom_client: name,
      telephone: whatsapp,
      telephone_appel: phone,
      ville: city,
      quartier: district,
      produit_id: productId,
      quantite: quantity,
      prix_unitaire: unitPrice,
      prix_total: total,
      notes: productName && (!product || productName !== product.nom) ? productName : null,
    }),
  }) as Array<{ id: number }>;
  if (!rows[0]?.id) throw new Error("Supabase did not return the saved order");
  return {
    status: 200,
    body: { success: true, commande_id: rows[0].id, message: "Commande enregistrée avec succès." },
  };
}

Deno.serve(async (request) => {
  const origin = request.headers.get("Origin");
  if (request.method === "OPTIONS") {
    return response({ success: true }, 200, origin);
  }
  if (request.method !== "POST") {
    return response({ success: false, message: "Méthode non autorisée." }, 405, origin);
  }
  if (!origin || !allowedOrigins.has(origin)) {
    return response({ success: false, message: "Origine non autorisée." }, 403, origin);
  }

  try {
    const contentLength = Number(request.headers.get("Content-Length") ?? "0");
    if (contentLength > 16_384) {
      return response({ success: false, message: "Demande trop volumineuse." }, 413, origin);
    }
    const input = await request.json();
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return response({ success: false, message: "Demande invalide." }, 400, origin);
    }
    const action = text(input.action, 24);
    const payload = input.payload;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return response({ success: false, message: "Données de formulaire invalides." }, 400, origin);
    }

    if (action === "whatsapp") {
      await supabaseRequest("commandes_whatsapp", {
        method: "POST",
        body: JSON.stringify({
          nom_client: text(payload.nom_client, 120) || null,
          produit: text(payload.produit, 160) || null,
          source: text(payload.source, 80) || null,
        }),
      });
      return response({ success: true }, 200, origin);
    }

    if (action !== "commande" && action !== "contact" && action !== "revendeur") {
      return response({ success: false, message: "Formulaire non reconnu." }, 400, origin);
    }
    if (!Deno.env.get("TURNSTILE_SECRET_KEY")) {
      console.error("public-submit: TURNSTILE_SECRET_KEY is not configured");
      return response({ success: false, message: "Le formulaire est temporairement indisponible. Contactez-nous sur WhatsApp." }, 503, origin);
    }
    const token = text(input.token, 2048);
    if (!await verifyTurnstile(token)) {
      return response({ success: false, message: "La vérification anti-robot a échoué. Réessayez." }, 400, origin);
    }

    if (action === "commande") {
      const result = await submitOrder(payload);
      return response(result.body, result.status, origin);
    }

    if (action === "contact") {
      const name = text(payload.nom, 120);
      const email = text(payload.email, 254);
      const phone = text(payload.telephone, 32);
      const subject = text(payload.sujet, 160);
      const message = text(payload.message, 4000);
      if (!name || !subject || message.length < 5 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        return response({ success: false, message: "Vérifiez les informations de votre message." }, 400, origin);
      }
      await supabaseRequest("messages", {
        method: "POST",
        body: JSON.stringify({ nom: name, email: email || null, telephone: phone || null, sujet: subject, message }),
      });
      return response({ success: true, message: "Votre message a bien été envoyé." }, 200, origin);
    }

    const name = text(payload.nom, 120);
    const city = text(payload.ville, 120);
    const phone = text(payload.telephone, 32);
    if (!name || !city || !validPhone(phone)) {
      return response({ success: false, message: "Vérifiez vos coordonnées de revendeur." }, 400, origin);
    }
    await supabaseRequest("revendeurs", {
      method: "POST",
      body: JSON.stringify({ nom: name, ville: city, telephone: phone }),
    });
    return response({ success: true, message: "Votre candidature a bien été envoyée." }, 200, origin);
  } catch (error) {
    console.error("public-submit: request failed", error);
    return response({ success: false, message: "Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp." }, 500, origin);
  }
});
