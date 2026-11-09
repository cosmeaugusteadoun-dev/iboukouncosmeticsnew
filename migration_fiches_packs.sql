-- Met à jour les visuels et prix des packs, puis crée une fiche commandable
-- pour chaque nouveau pack. Les images des produits sont servies depuis /produit/.
-- À exécuter après migration_accueil_sections.sql dans Supabase.

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
       0,
       packs.image,
       true,
       packs.ordre
from public.categories as categories
cross join (
  values
    ('Savon Antiseptique + Crème de Visage',
     'pack-savon-antiseptique-creme-visage',
     'Un pack réunissant le savon antiseptique et la crème de visage Iboukoun Cosmetics.',
     'Savon antiseptique et crème de visage',
     4000,
     'savon-antiseptique-creme.png',
     10),
    ('Savon Gommant Premium + Crème de Visage',
     'pack-savon-gommant-premium-creme-visage',
     'Un pack réunissant le Savon Gommant Premium et la crème de visage Iboukoun Cosmetics.',
     'Savon Gommant Premium et crème de visage',
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
    description = 'Un pack réunissant le savon antiseptique et la crème de visage Iboukoun Cosmetics.',
    image = 'savon-antiseptique-creme.png',
    produit_id = (
      select id from public.produits
      where slug = 'pack-savon-antiseptique-creme-visage'
      limit 1
    )
where section = 'packs' and item_type = 'pack' and ordre = 2;

update public.accueil_sections
set titre = 'Savon Gommant Premium + Crème de Visage',
    description = 'Un pack réunissant le Savon Gommant Premium et la crème de visage Iboukoun Cosmetics.',
    image = 'offre-special-gommant-creme.png',
    produit_id = (
      select id from public.produits
      where slug = 'pack-savon-gommant-premium-creme-visage'
      limit 1
    )
where section = 'packs' and item_type = 'pack' and ordre = 3;
