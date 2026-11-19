-- ============================================================
-- CORRECTION : Fonction submit_public_order pour accepter les packs
-- qui ne sont pas encore dans la table produits de Supabase
--
-- À exécuter dans l'éditeur SQL de votre dashboard Supabase.
-- Ce fichier ne modifie aucune table, il ne fait que mettre à jour
-- la fonction existante submit_public_order.
-- ============================================================

create or replace function public.submit_public_order(order_data jsonb)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  v_product_id bigint;
  v_quantity integer;
  v_submitted_total bigint;
  v_unit_price numeric;
  v_promo_price integer;
  v_name text;
  v_whatsapp text;
  v_phone text;
  v_city text;
  v_district text;
  v_product_name text;
  v_phone_digits text;
  v_recent_orders integer;
  v_product record;
  v_order_id bigint;
begin
  -- Extraction des données
  v_product_id := (order_data->>'produit_id')::bigint;
  v_quantity := (order_data->>'quantite')::integer;
  v_submitted_total := (order_data->>'prix_total')::bigint;
  v_name := btrim(coalesce(order_data->>'nom_client', ''));
  v_whatsapp := btrim(coalesce(order_data->>'telephone', ''));
  v_phone := btrim(coalesce(order_data->>'telephone_appel', ''));
  v_city := btrim(coalesce(order_data->>'ville', ''));
  v_district := btrim(coalesce(order_data->>'quartier', ''));
  v_product_name := btrim(coalesce(order_data->>'produit_nom', ''));
  v_phone_digits := regexp_replace(v_whatsapp, '[^0-9]', '', 'g');

  -- Validations de base
  if v_product_id < 1 or v_quantity < 1 or v_quantity > 999
     or v_submitted_total < 1 or length(v_name) not between 2 and 120
     or length(v_city) not between 2 and 120
     or length(v_district) not between 2 and 120
     or length(v_phone_digits) not between 8 and 15
     or length(regexp_replace(v_phone, '[^0-9]', '', 'g')) not between 8 and 15
     or length(v_product_name) > 160 then
    return jsonb_build_object('success', false, 'message', 'Vérifiez vos coordonnées et les informations de commande.');
  end if;

  -- Anti-doublon rapide
  select count(*) into v_recent_orders
  from public.commandes_formulaire as orders
  where regexp_replace(coalesce(orders.telephone, ''), '[^0-9]', '', 'g') = v_phone_digits
    and orders.created_at > now() - interval '1 minute';
  if v_recent_orders >= 3 then
    return jsonb_build_object('success', false, 'message', 'Plusieurs commandes viennent d’être envoyées avec ce numéro. Réessayez dans une minute.');
  end if;

  -- Récupération du produit (peut être null pour les packs non présents en base)
  select * into v_product
  from public.produits
  where id = v_product_id and actif = true;

  -- Si le produit n'existe pas en base (cas des packs), accepter avec le prix soumis
  if not found then
    v_unit_price := v_submitted_total / v_quantity;
  else
    if v_product.prix < 1 then
      return jsonb_build_object('success', false, 'message', 'Ce produit n’est plus disponible.');
    end if;
    v_unit_price := v_product.prix;
  end if;

  -- Cas particulier : savon gommant petit pot
  if v_product is not null and v_product.slug = 'savon-gommant' and v_product_name ilike '%petit pot%' then
    v_unit_price := 3000;
  end if;

  -- Promotions
  select min(promotion.prix_promo) into v_promo_price
  from public.promotions as promotion
  where promotion.produit_id = v_product_id
    and promotion.actif = true
    and promotion.min_unites <= v_quantity
    and (promotion.date_debut is null or promotion.date_debut <= current_date)
    and (promotion.date_fin is null or promotion.date_fin >= current_date)
    and promotion.prix_promo > 0
    and promotion.prix_promo < v_unit_price;
  v_unit_price := coalesce(v_promo_price, v_unit_price);

  -- Vérification du prix seulement si le produit existe en base
  if v_product is not null and v_submitted_total <> v_unit_price::bigint * v_quantity
     or v_submitted_total > 2147483647 then
    return jsonb_build_object('success', false, 'message', 'Le prix affiché a changé. Actualisez la page puis vérifiez votre commande.');
  end if;

  -- Insertion de la commande
  insert into public.commandes_formulaire
    (nom_client, telephone, telephone_appel, ville, quartier, produit_id,
     quantite, prix_unitaire, prix_total, notes)
  values
    (v_name, v_whatsapp, v_phone, v_city, v_district, v_product_id,
     v_quantity, v_unit_price, v_submitted_total,
     case when v_product is not null then 'Fiche : ' || v_product.nom else v_product_name end)
  returning id into v_order_id;

  return jsonb_build_object(
    'success', true,
    'commande_id', v_order_id,
    'message', 'Votre commande a bien été enregistrée.'
  );
end;
$$;

revoke all on function public.submit_public_order(jsonb) from public, anon, authenticated;
grant execute on function public.submit_public_order(jsonb) to anon, authenticated;