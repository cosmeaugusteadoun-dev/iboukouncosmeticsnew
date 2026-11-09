import * as helpers from "../helpers.mjs";
export function render(ctx) {
var out="";
var {BASE_URL,GSC_VERIFICATION_CODE,UPLOAD_PATH,UPLOAD_URL_EGERIES,UPLOAD_URL_EQUIPE,UPLOAD_URL_PRODUITS,UPLOAD_URL_TEMOIGNAGES,WA_NUMBER,cat_filtre,categories,egeries,equipe,faqs,fondateur,img_principale,nb_clients,nb_produits,nb_revendeurs,note_moy,page,page_active,params,photos,produit,produits,promo_active,promo_nav,promos,screenshots,seo,seo_desc,seo_img,seo_title,seo_url,similaires,temos,temos_texte,total_avi,videos,wa_number}=ctx;
var {e,htmlspecialchars,empty,count,file_exists,rawurlencode,format_prix,format_date,time_ago,couleur_cat,icone_cat,avatar_color,nav_active,date,round,array_filter,array_column,array_sum,array_merge,array_map,mb_substr,mb_strlen,substr,strtoupper,strtolower,strpos,trim,explode,nl2br,addslashes,preg_replace,json_encode,get_youtube_id,js_string,schema_organisation,schema_local_business,schema_faq,schema_produit,schema_breadcrumb}=helpers;
var map,meta_desc,page_title;
out += "";
out += "\n\n<!-- PAGE HERO -->\n<section class=\"page-hero\">\n  <div class=\"ph-deco ph-deco-1\"></div>\n  <div class=\"ph-deco ph-deco-2\"></div>\n  <div class=\"ph-deco ph-deco-3\"></div>\n  <div class=\"container\">\n    <div class=\"page-hero-content\">\n      <div class=\"section-eyebrow\"><i class=\"ri-sparkling-2-line\"></i>Notre gamme complète</div>\n      <h1 class=\"page-hero-title\">Soins naturels<br><span class=\"page-hero-accent\">fabriqués au Bénin</span></h1>\n      <p class=\"page-hero-sub\">Formulés à Parakou avec des ingrédients naturels soigneusement sélectionnés — disponibles à Cotonou, Porto-Novo, Abomey-Calavi et partout au Bénin.</p>\n      <div class=\"page-hero-stats\">\n        <div class=\"ph-stat\">\n          <div class=\"ph-stat-num\">";
out += (count(produits)) ?? "";
out += "</div>\n          <div class=\"ph-stat-label\">Produits</div>\n        </div>\n        <div class=\"ph-stat-sep\"></div>\n        <div class=\"ph-stat\">\n          <div class=\"ph-stat-num\">100%</div>\n          <div class=\"ph-stat-label\">Naturel</div>\n        </div>\n        <div class=\"ph-stat-sep\"></div>\n        <div class=\"ph-stat\">\n          <div class=\"ph-stat-num\">500+</div>\n          <div class=\"ph-stat-label\">Clients</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n\n<!-- PRODUITS -->\n<section class=\"section section-produits-page\">\n  <div class=\"container\">\n\n    <!-- Filtres -->\n    <div class=\"products-filter-wrap reveal\">\n      <div class=\"products-filter\">\n        <a href=\"produits.php?cat=all\"\n           class=\"filter-btn ";
out += (cat_filtre === "all" ? "active" : "") ?? "";
out += "\">\n          <i class=\"ri-grid-line\"></i>Tous les produits\n        </a>\n        ";
for (var cat of categories) {
out += "\n        <a href=\"produits.php?cat=";
out += (e(cat["slug"])) ?? "";
out += "\"\n           class=\"filter-btn ";
out += (cat_filtre === cat["slug"] ? "active" : "") ?? "";
out += "\">\n          <i class=\"";
out += (icone_cat(cat["slug"])) ?? "";
out += "\"></i>";
out += (e(cat["nom"])) ?? "";
out += "\n        </a>\n        ";
}
out += "\n      </div>\n    </div>\n\n    ";
if (cat_filtre !== "all") {
out += "\n    <div class=\"filter-result-label reveal\">\n      ";
out += (count(produits)) ?? "";
out += " produit";
out += (count(produits) > 1 ? "s" : "") ?? "";
out += "\n      dans cette catégorie\n    </div>\n    ";
}
out += "\n\n    ";
if (empty(produits)) {
out += "\n    <div class=\"empty-state\">\n      <div class=\"empty-state-icon\"><i class=\"ri-leaf-line\"></i></div>\n      <h3>Aucun produit pour le moment</h3>\n      <p>Cette catégorie sera bientôt disponible. En attendant, découvrez toute notre gamme.</p>\n      <a href=\"produits.php\" class=\"btn-primary\"><i class=\"ri-grid-line\"></i>Voir tous les produits</a>\n    </div>\n    ";
} else {
out += "\n    <div class=\"products-grid-page\">\n      ";
for (var p of produits) {
out += "\n      <!-- MODIFICATION : carte entière cliquable → fiche produit -->\n      <article class=\"product-card-page reveal\"\n               data-cat=\"";
out += (e(p["categorie_slug"])) ?? "";
out += "\"\n               onclick=\"window.location='";
out += (js_string(BASE_URL)) ?? "";
out += "produit.php?id=";
out += (p["id"]) ?? "";
out += "'\"\n               style=\"cursor:pointer;\">\n\n        <!-- Image -->\n        <div class=\"pcp-img-wrap\">\n          <div class=\"pcp-img\" style=\"background:";
out += (couleur_cat(p["categorie_slug"])) ?? "";
out += "\">\n            ";
if (!empty(p["image"]) && file_exists(UPLOAD_PATH + "produits/" + p["image"])) {
out += "\n              <img src=\"";
out += (e(p["image_url"])) ?? "";
out += "\"\n                 alt=\"";
out += (e(p["nom"])) ?? "";
out += " — Soin naturel Iboukoun Cosmetics, Parakou Bénin\"\n                 title=\"";
out += (e(p["nom"])) ?? "";
out += " | Iboukoun Cosmetics\"\n                 width=\"600\"\n                 height=\"600\"\n                 loading=\"lazy\">\n            ";
} else {
out += "\n              <div class=\"pcp-placeholder\" aria-hidden=\"true\"></div>\n            ";
}
out += "\n          </div>\n\n          <div class=\"pcp-tags\">\n            ";
if (!empty(p["promo_id"])) {
out += "\n              <span class=\"badge-promo\"><i class=\"ri-flashlight-fill\"></i>Promotion</span>\n            ";
}
out += "\n          </div>\n\n          <div class=\"pcp-cat-pill\">\n            <i class=\"";
out += (icone_cat(p["categorie_slug"])) ?? "";
out += "\"></i>\n            ";
out += (e(p["categorie_nom"])) ?? "";
out += "\n          </div>\n\n          <!-- MODIFICATION : overlay → voir le produit -->\n          <div class=\"pcp-overlay\">\n            <div class=\"pcp-overlay-btn\">\n              <i class=\"ri-eye-line\"></i>Voir le produit\n            </div>\n          </div>\n        </div>\n\n        <!-- Corps -->\n        <div class=\"pcp-body\">\n          <h2 class=\"pcp-name\">";
out += (e(p["nom"])) ?? "";
out += "</h2>\n          <p class=\"pcp-desc\">";
out += (e(p["description"])) ?? "";
out += "</p>\n\n          <div class=\"pcp-benefits\">\n            <div class=\"pcp-benefit\"><i class=\"ri-leaf-line\"></i><span>100% naturel</span></div>\n            <div class=\"pcp-benefit\"><i class=\"ri-shield-check-line\"></i><span>Testé</span></div>\n            <div class=\"pcp-benefit\"><i class=\"ri-map-pin-line\"></i><span>Fait au Bénin</span></div>\n          </div>\n\n          <div class=\"pcp-footer\">\n            <div class=\"pcp-price-group\">\n              ";
if (!empty(p["promo_id"])) {
out += "\n                <span class=\"pcp-price-current\">";
out += (format_prix(p["prix_promo"])) ?? "";
out += "</span>\n                <span class=\"pcp-price-old\">";
out += (format_prix(p["prix"])) ?? "";
out += "</span>\n                <span class=\"pcp-promo-badge\">-";
out += (round((1 - p["prix_promo"]/p["prix"])*100)) ?? "";
out += "%</span>\n              ";
} else {
out += "\n                <span class=\"pcp-price-current\">";
out += (format_prix(p["prix"])) ?? "";
out += "</span>\n              ";
}
out += "\n            </div>\n            <!-- MODIFICATION : lien voir fiche produit -->\n            <a href=\"";
out += (BASE_URL) ?? "";
out += "produit.php?id=";
out += (p["id"]) ?? "";
out += "\"\n               class=\"pcp-btn-voir\"\n               onclick=\"event.stopPropagation()\">\n              <i class=\"ri-eye-line\"></i>\n              <span>Voir</span>\n            </a>\n          </div>\n        </div>\n\n      </article>\n      ";
}
out += "\n    </div>\n    ";
}
out += "\n\n  </div>\n</section>\n\n<!-- CTA REVENDEUR -->\n<section class=\"produits-cta-band\">\n  <div class=\"container\">\n    <div class=\"pcta-inner\">\n      <div class=\"pcta-left\">\n        <div class=\"pcta-eyebrow\"><i class=\"ri-store-2-line\"></i>Programme revendeurs</div>\n        <h2 class=\"pcta-title\">Achetez à 1.000f,<br>revendez à 2.000f</h2>\n        <p class=\"pcta-sub\">Rejoignez notre réseau de revendeurs au Bénin — Cotonou, Parakou, Porto-Novo et doublez votre investissement dès 10 pièces commandées.</p>\n      </div>\n      <div class=\"pcta-right\">\n        <a href=\"revendeurs.php\" class=\"btn-primary large\">\n          <i class=\"ri-store-2-line\"></i>Devenir revendeur\n        </a>\n        <a href=\"https://wa.me/";
out += (WA_NUMBER) ?? "";
out += "?text=";
out += (rawurlencode("Bonjour, je veux commander en gros !")) ?? "";
out += "\"\n           class=\"pcta-wa\" target=\"_blank\">\n          <i class=\"ri-whatsapp-line\"></i>Commander en gros\n        </a>\n      </div>\n    </div>\n  </div>\n</section>\n\n";
out += ctx.renderFooter({...ctx, faqs: typeof faqs === "undefined" ? [] : faqs});
out += "\n\n<style>\n/* ============================================================\n   PAGE HERO PRODUITS\n============================================================ */\n.page-hero{\n  background:linear-gradient(135deg,rgba(5,14,46,.82) 0%,rgba(13,26,94,.82) 55%,rgba(15,32,112,.82) 100%), url('/assets/images/hero-produits.jfif');\n  background-size:cover;\n  background-position:center;\n  padding:100px 5% 80px;\n  text-align:center;color:#fff;\n  position:relative;overflow:hidden;\n}\n.ph-deco{position:absolute;border-radius:50%;pointer-events:none;}\n.ph-deco-1{width:500px;height:500px;top:-200px;right:-100px;background:radial-gradient(circle,rgba(45,158,53,.1) 0%,transparent 70%);}\n.ph-deco-2{width:300px;height:300px;bottom:-100px;left:-80px;background:radial-gradient(circle,rgba(201,146,10,.08) 0%,transparent 70%);}\n.ph-deco-3{width:200px;height:200px;top:20%;left:10%;border:1px solid rgba(255,255,255,.04);}\n.page-hero-content{position:relative;z-index:1;max-width:640px;margin:0 auto;}\n.section-eyebrow{display:inline-flex;align-items:center;gap:7px;background:rgba(45,158,53,.15);border:1px solid rgba(45,158,53,.3);color:var(--green-mid);padding:7px 16px;border-radius:var(--radius-pill);font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:22px;}\n.section-eyebrow i{font-size:13px;}\n.page-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(40px,5vw,68px);font-weight:700;color:#fff;margin-bottom:18px;line-height:1.06;letter-spacing:-1px;}\n.page-hero-accent{background:linear-gradient(90deg,#6DDB6D,var(--green-mid),#A8F0A8);-webkit-background-clip:text;background-clip:text;color:transparent;}\n.page-hero-sub{font-size:15px;color:rgba(255,255,255,.68);max-width:480px;margin:0 auto 36px;line-height:1.75;}\n.page-hero-stats{display:inline-flex;align-items:center;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:var(--radius);padding:16px 28px;gap:0;}\n.ph-stat{text-align:center;padding:0 20px;}\n.ph-stat-num{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#fff;line-height:1;}\n.ph-stat-label{font-size:10px;color:rgba(255,255,255,.45);margin-top:3px;letter-spacing:.5px;}\n.ph-stat-sep{width:1px;height:32px;background:rgba(255,255,255,.12);}\n\n/* ============================================================\n   SECTION PRODUITS PAGE\n============================================================ */\n.section-produits-page{background:var(--white);padding:80px clamp(16px,5%,64px) 96px;}\n.products-filter-wrap{margin-bottom:52px;}\n.products-filter{display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap;padding:6px;background:var(--cream);border-radius:var(--radius-pill);width:fit-content;margin:0 auto;}\n.filter-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;border-radius:var(--radius-pill);font-size:13px;font-weight:500;border:none;background:transparent;color:var(--text2);cursor:pointer;transition:all .2s;text-decoration:none;}\n.filter-btn i{font-size:14px;}\n.filter-btn.active{background:var(--navy);color:#fff;box-shadow:0 4px 14px rgba(13,26,94,.25);font-weight:600;}\n.filter-btn:hover:not(.active){background:rgba(13,26,94,.06);color:var(--navy);}\n.filter-result-label{text-align:center;font-size:13px;color:var(--text3);margin-bottom:32px;margin-top:-20px;}\n.products-grid-page{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:32px;}\n\n/* Carte produit */\n.product-card-page{background:#fff;border-radius:var(--radius-xl);border:1px solid rgba(0,0,0,.06);overflow:hidden;transition:transform .35s cubic-bezier(.23,1,.32,1),box-shadow .35s;}\n.product-card-page:hover{transform:translateY(-8px);box-shadow:0 24px 64px rgba(13,26,94,.13);}\n.pcp-img-wrap{position:relative;}\n.pcp-img{height:280px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;}\n.pcp-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.23,1,.32,1);}\n.product-card-page:hover .pcp-img img{transform:scale(1.07);}\n.pcp-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;}\n.pcp-placeholder i{font-size:72px;color:rgba(0,0,0,.1);}\n.pcp-tags{position:absolute;top:14px;left:14px;display:flex;gap:6px;z-index:2;}\n.pcp-cat-pill{position:absolute;bottom:14px;left:14px;display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.9);backdrop-filter:blur(8px);color:var(--navy);padding:5px 12px;border-radius:var(--radius-pill);font-size:11px;font-weight:600;z-index:2;}\n.pcp-cat-pill i{font-size:12px;color:var(--green);}\n/* MODIFICATION : overlay → voir le produit */\n.pcp-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,26,94,.8) 0%,rgba(13,26,94,.15) 100%);display:flex;align-items:flex-end;justify-content:center;padding-bottom:28px;opacity:0;transition:opacity .3s;z-index:3;}\n.product-card-page:hover .pcp-overlay{opacity:1;}\n.pcp-overlay-btn{display:flex;align-items:center;gap:8px;background:#fff;color:var(--navy);padding:12px 24px;border-radius:var(--radius-pill);font-size:13px;font-weight:700;transform:translateY(12px);transition:transform .35s cubic-bezier(.23,1,.32,1);box-shadow:0 4px 20px rgba(0,0,0,.2);pointer-events:none;}\n.product-card-page:hover .pcp-overlay-btn{transform:translateY(0);}\n.pcp-overlay-btn i{font-size:17px;}\n.pcp-body{padding:24px 26px 28px;}\n.pcp-name{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:var(--navy);margin-bottom:10px;line-height:1.15;}\n.pcp-desc{font-size:13px;color:var(--text2);line-height:1.7;margin-bottom:18px;}\n.pcp-benefits{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid rgba(0,0,0,.06);}\n.pcp-benefit{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--text2);font-weight:500;}\n.pcp-benefit i{font-size:13px;color:var(--green);}\n.pcp-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;}\n.pcp-price-group{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;}\n.pcp-price-current{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:var(--navy);line-height:1;}\n.pcp-price-old{font-size:13px;color:var(--text3);text-decoration:line-through;}\n.pcp-promo-badge{font-size:11px;font-weight:700;color:#fff;background:var(--green);padding:3px 8px;border-radius:var(--radius-pill);}\n/* MODIFICATION : bouton voir */\n.pcp-btn-voir{display:flex;align-items:center;gap:7px;background:var(--navy);color:#fff;padding:12px 22px;border-radius:var(--radius-pill);font-size:13px;font-weight:700;border:none;cursor:pointer;transition:all .25s;flex-shrink:0;box-shadow:0 2px 12px rgba(13,26,94,.25);text-decoration:none;}\n.pcp-btn-voir:hover{background:var(--green);transform:translateY(-2px);box-shadow:0 6px 20px rgba(45,158,53,.4);}\n.pcp-btn-voir i{font-size:17px;}\n\n/* Empty state */\n.empty-state{text-align:center;padding:96px 20px;}\n.empty-state-icon{width:80px;height:80px;border-radius:50%;background:var(--cream);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}\n.empty-state-icon i{font-size:36px;color:var(--text3);}\n.empty-state h3{font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--navy);margin-bottom:10px;}\n.empty-state p{font-size:14px;color:var(--text3);margin-bottom:28px;}\n\n/* ============================================================\n   CTA REVENDEUR\n============================================================ */\n.produits-cta-band{background:linear-gradient(135deg,#050E2E 0%,var(--navy) 60%,#0f2070 100%);padding:72px clamp(16px,5%,64px);position:relative;overflow:hidden;}\n.produits-cta-band::before{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(45,158,53,.12) 0%,transparent 70%);pointer-events:none;}\n.pcta-inner{max-width:var(--container);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:48px;flex-wrap:wrap;position:relative;z-index:1;}\n.pcta-eyebrow{display:inline-flex;align-items:center;gap:7px;background:rgba(45,158,53,.15);border:1px solid rgba(45,158,53,.3);color:var(--green-mid);padding:6px 14px;border-radius:var(--radius-pill);font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:16px;}\n.pcta-title{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,3vw,38px);font-weight:700;color:#fff;line-height:1.2;margin-bottom:12px;}\n.pcta-sub{font-size:14px;color:rgba(255,255,255,.62);line-height:1.7;max-width:400px;}\n.pcta-right{display:flex;align-items:center;gap:14px;flex-wrap:wrap;flex-shrink:0;}\n.btn-primary.large{padding:16px 32px;font-size:15px;}\n.pcta-wa{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.2);color:#fff;padding:15px 26px;border-radius:var(--radius-pill);font-size:14px;font-weight:600;transition:all .25s;text-decoration:none;}\n.pcta-wa:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.4);}\n.pcta-wa i{font-size:18px;color:#25D366;}\n\n/* ============================================================\n   RESPONSIVE\n============================================================ */\n@media(max-width:1024px){\n  .pcta-inner{flex-direction:column;text-align:center;}\n  .pcta-sub{max-width:100%;}\n  .pcta-right{justify-content:center;}\n}\n@media(max-width:768px){\n  .page-hero{padding:72px 5% 60px;}\n  .page-hero-stats{padding:12px 16px;}\n  .ph-stat{padding:0 14px;}\n  .ph-stat-num{font-size:22px;}\n  .products-filter{width:100%;border-radius:var(--radius-lg);padding:4px;}\n  .filter-btn{padding:8px 14px;font-size:12px;}\n  .products-grid-page{grid-template-columns:1fr 1fr;gap:16px;}\n  .pcp-img{height:200px;}\n  .pcp-body{padding:16px 18px 20px;}\n  .pcp-name{font-size:20px;}\n  .pcp-desc{font-size:12px;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}\n  .pcp-benefits{display:none;}\n  .pcp-price-current{font-size:22px;}\n  .pcp-btn-voir{padding:10px 14px;font-size:12px;}\n  .pcp-btn-voir span{display:none;}\n  .pcp-overlay{display:none;}\n  .produits-cta-band{padding:52px clamp(16px,4%,32px);}\n}\n@media(max-width:480px){\n  .page-hero{padding:60px 5% 48px;}\n  .page-hero-stats{flex-direction:column;gap:12px;padding:20px;}\n  .ph-stat-sep{width:40px;height:1px;}\n  .products-grid-page{grid-template-columns:1fr;gap:16px;}\n  .pcp-img{height:240px;}\n  .pcp-desc{display:block;}\n  .pcp-benefits{display:flex;}\n  .pcp-btn-voir span{display:inline;}\n  .pcp-btn-voir{padding:12px 18px;}\n  .pcta-right{flex-direction:column;width:100%;}\n  .btn-primary.large,.pcta-wa{width:100%;justify-content:center;}\n}\n@media(max-width:360px){\n  .page-hero-title{font-size:clamp(32px,9vw,44px);}\n  .ph-stat-num{font-size:20px;}\n  .pcp-name{font-size:18px;}\n  .pcp-price-current{font-size:20px;}\n}\n</style>\n\n";

out += "";
return out;
}
