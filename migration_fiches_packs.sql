-- Crée/met à jour les fiches des trois packs et la RPC sécurisée de commande.
-- À exécuter après migration_accueil_sections.sql dans Supabase SQL Editor.

update public.produits
set nom = 'Duo Éclaircissant+',
    slug = 'duo-eclat',
    description = 'Le duo de soins éclaircissants Iboukoun Cosmetics.',
    prix = 11000,
    image = 'duo-eclat.png',
    actif = true
where id = 8 or slug in ('duo-eclat', 'duo-eclaircissant-plus');

insert into public.produits
  (categorie_id, nom, slug, description, benefices, prix, stock, image, actif, ordre)
select categories.id,
       packs.nom,
       packs.slug,
       packs.description,
       packs.benefices,
       packs.prix,
       50,
       packs.image,
       true,
       packs.ordre
from public.categories as categories
cross join (
  values
    ('Savon Antiseptique + Crème de Visage',
     'pack-savon-antiseptique-creme-visage',
     'Un soin antiseptique associé à la Crème de Visage Iboukoun.',
     'Savon antiseptique et crème de visage',
     4000,
     'savon-antiseptique-creme.png',
     10),
    ('Savon Gommant + Crème de Visage',
     'pack-savon-gommant-premium-creme-visage',
     'Le Savon Gommant associé à la Crème de Visage Iboukoun Cosmetics.',
     'Savon Gommant et crème de visage',
     10000,
     'offre-special-gommant-creme.png',
     11)
) as packs(nom, slug, description, benefices, prix, image, ordre)
where categories.slug = 'corps'
on conflict (slug) do update
set categorie_id = excluded.categorie_id,
    nom = excluded.nom,
    description = excluded.description,
    benefices = excluded.benefices,
    prix = excluded.prix,
    stock = excluded.stock,
    image = excluded.image,
    actif = excluded.actif,
    ordre = excluded.ordre;

update public.accueil_sections
set titre = 'Duo Éclaircissant+',
    description = 'Le duo de soins éclaircissants Iboukoun Cosmetics.',
    image = 'duo-eclat.png',
    produit_id = (
      select id from public.produits
      where slug = 'duo-eclat'
      order by id
      limit 1
    )
where section = 'packs' and item_type = 'pack' and ordre = 1;

update public.accueil_sections
set titre = 'Savon Antiseptique + Crème de Visage',
    description = 'Un soin antiseptique associé à la Crème de Visage Iboukoun.',
    image = 'savon-antiseptique-creme.png',
    produit_id = (
      select id from public.produits
      where slug = 'pack-savon-antiseptique-creme-visage'
      limit 1
    )
where section = 'packs' and item_type = 'pack' and ordre = 2;

update public.accueil_sections
set titre = 'Savon Gommant + Crème de Visage',
    description = 'Le Savon Gommant associé à la Crème de Visage Iboukoun Cosmetics.',
    image = 'offre-special-gommant-creme.png',
    produit_id = (
      select id from public.produits
      where slug = 'pack-savon-gommant-premium-creme-visage'
      limit 1
    )
where section = 'packs' and item_type = 'pack' and ordre = 3;

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
  v_unit_price integer;
  v_promo_price integer;
  v_name text;
  v_whatsapp text;
  v_phone text;
  v_city text;
  v_district text;
  v_product_name text;
  v_phone_digits text;
  v_recent_orders integer;
  v_order_id bigint;
  v_product public.produits%rowtype;
begin
  if order_data is null or jsonb_typeof(order_data) <> 'object' then
    return jsonb_build_object('success', false, 'message', 'Informations de commande invalides.');
  end if;

  if coalesce(order_data->>'produit_id', '') !~ '^[0-9]{1,18}$'
     or coalesce(order_data->>'quantite', '') !~ '^[0-9]{1,3}$'
     or coalesce(order_data->>'prix_total', '') !~ '^[0-9]{1,12}$' then
    return jsonb_build_object('success', false, 'message', 'Vérifiez le produit et la quantité.');
  end if;

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

  if v_product_id < 1 or v_quantity < 1 or v_quantity > 999
     or v_submitted_total < 1 or length(v_name) not between 2 and 120
     or length(v_city) not between 2 and 120
     or length(v_district) not between 2 and 120
     or length(v_phone_digits) not between 8 and 15
     or length(regexp_replace(v_phone, '[^0-9]', '', 'g')) not between 8 and 15
     or length(v_product_name) > 160 then
    return jsonb_build_object('success', false, 'message', 'Vérifiez vos coordonnées et les informations de commande.');
  end if;

  select count(*) into v_recent_orders
  from public.commandes_formulaire as orders
  where regexp_replace(coalesce(orders.telephone, ''), '[^0-9]', '', 'g') = v_phone_digits
    and orders.created_at > now() - interval '1 minute';
  if v_recent_orders >= 3 then
    return jsonb_build_object('success', false, 'message', 'Plusieurs commandes viennent d’être envoyées avec ce numéro. Réessayez dans une minute.');
  end if;

  select * into v_product
  from public.produits
  where id = v_product_id and actif = true;
  if not found or v_product.prix < 1 then
    return jsonb_build_object('success', false, 'message', 'Ce produit n’est plus disponible.');
  end if;

  v_unit_price := v_product.prix;
  if v_product.slug = 'savon-gommant' and v_product_name ilike '%petit pot%' then
    v_unit_price := 3000;
  end if;

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

  if v_submitted_total <> v_unit_price::bigint * v_quantity
     or v_submitted_total > 2147483647 then
    return jsonb_build_object('success', false, 'message', 'Le prix affiché a changé. Actualisez la page puis vérifiez votre commande.');
  end if;

  insert into public.commandes_formulaire
    (nom_client, telephone, telephone_appel, ville, quartier, produit_id,
     quantite, prix_unitaire, prix_total, notes)
  values
    (v_name, v_whatsapp, v_phone, v_city, v_district, v_product_id,
     v_quantity, v_unit_price, v_submitted_total, 'Fiche : ' || v_product.nom)
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
