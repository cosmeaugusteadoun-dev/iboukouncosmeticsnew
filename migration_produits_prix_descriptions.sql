-- ============================================================
-- IBOUKOUN COSMETICS — Synchronisation des Produits, Prix et Descriptions
-- ============================================================
-- À exécuter dans Supabase : Dashboard -> SQL Editor -> New query -> Run
-- Ce script met à jour tous les produits avec les vraies descriptions
-- et prix normaux définis dans produits.html.
-- ============================================================

-- 1. Aisselles Chic (ID 1) - 2.000 F
update public.produits
set nom = 'Aisselles Chic',
    slug = 'aisselles-chic',
    prix = 2000,
    description = 'Découvrez notre Déodorant AISSELLES CHICS, notre solution naturelle spécialement conçue pour les aisselles.
Il combat durablement les mauvaises odeurs, aide à réduire l''excès de transpiration .Formule sans parfum.
Le résultat ? Des aisselles chics, saines, et une sensation de fraîcheur qui dure plus de 24H.',
    actif = true
where id = 1 or slug = 'aisselles-chic';

-- 2. Savon Gommant (ID 2) - 6.000 F (Grand pot) / 3.000 F (Petit pot)
update public.produits
set nom = 'Savon Gommant',
    slug = 'savon-gommant',
    prix = 6000,
    description = 'Votre peau manque d''éclat ? Il est peut-être temps de revoir votre routine de soin.
Le Savon Gommant IBOUKOUN COSMETICS aide à exfolier la peau et à éliminer les cellules mortes qui s''accumulent à sa surface. Il contribue ainsi à rendre la peau plus douce, plus nette et à révéler son éclat naturel.
Un soin idéal pour intégrer l''exfoliation à votre routine et prendre soin de votre peau sans chercher à changer votre teint.
Durée d''utilisation estimée : Jusqu''à 1 mois et demi.
Présenté en 2 formats : Grand pot (6 000 F) et Petit pot (3 000 F).',
    actif = true
where id = 2 or slug = 'savon-gommant';

-- 3. Sérum Anti-taches & Éclat (ID 3) - 7.000 F
update public.produits
set nom = 'Sérum Anti-taches & Éclat',
    slug = 'serum-anti-tache',
    prix = 7000,
    description = 'Tu veux dire adieu aux boutons et aux taches sur ton visage? Ce sérum est la solution. Il est là pour nettoyer, lisser et redonner à ta peau son flow naturel, sans l’agresser.
Et le meilleur? Il est ultra doux, agit en profondeur et les peaux sensibles peuvent l''utiliser sans stress.',
    actif = true
where id = 3 or slug in ('serum-anti-tache', 'serum-eclat');

-- 4. Huile Éclat (ID 4) - 3.000 F
update public.produits
set nom = 'Huile Éclat',
    slug = 'huile-eclat',
    prix = 3000,
    description = 'Obtenez une peau lumineuse et rayonnante avec notre Huile éclat ! Elle :
- Réveille l''éclat naturel de ta peau
- Nourrit en profondeur
- Unifie le teint tout en douceur.
Convient à tous les types de peau, visage et corps.',
    actif = true
where id = 4 or slug = 'huile-eclat';

-- 5. Savon Gommant Premium (ID 5) - 10.000 F
update public.produits
set nom = 'Savon Gommant Premium',
    slug = 'savon-gommant-premium',
    prix = 10000,
    description = 'Les boutons reviennent, les taches persistent et votre teint manque d''uniformité? Votre peau a besoin de soins adaptés et réguliers.
Le savon Gommant Premium IBOUKOUN COSMETICS est un savon noir réparateur conçu poue accompagner votre routine de soin. Il aide à prendre soin des peaux sujettes aux boutons, aux taches et au manque d''uniformité.
Avec une utilisation régulière et une routine adaptée, accordez à votre peau toute l''attention qu''elle mérite.
Contenance: 1kg
Durée d''utilisation: Jusqu''à 3 mois.',
    actif = true
where id = 5 or slug in ('savon-gommant-premium', 'savont-gommant-premium');

-- 6. Gel Clarifiant + (ID 6) - 5.000 F
update public.produits
set nom = 'Gel Clarifiant +',
    slug = 'gel-clarifiant-plus',
    prix = 5000,
    description = 'Prendre soin de sa peau n''a pas de genre !
Le Gel Clarifiant IBOUKOUN COSMETICS est destiné aussi bien aux hommes qu''aux femmes qui souhaitent prendre soin de leur peau et retrouver un teint lumineux et harmonieux.
Il accompagne votre routine de soin pour aider à révéler l''éclat naturel de votre peau.
Parce qu''une belle peau, c''est avant tout une peau dont on prend soin régulièrement.',
    actif = true
where id = 6 or slug = 'gel-clarifiant-plus';

-- 7. Savon Antiseptique (ID 7) - 2.000 F
update public.produits
set nom = 'Savon Antiseptique',
    slug = 'savon-antiseptique',
    prix = 2000,
    description = 'Une bonne hygiène de la peau commence par un nettoyage adapté.
Le Savon Antiseptique IBOUKOUN COSMETICS vous accompagne dans votre routine quotidienne pour nettoyer votre peau et prendre soin de votre hygiène corporelle.
Un geste simple au quotidien pour garder une peau propre et bien entretenue.',
    actif = true
where id = 7 or slug = 'savon-antiseptique';

-- 8. Duo Éclaircissant+ (ID 8) - 11.000 F
update public.produits
set nom = 'Duo Éclaircissant+',
    slug = 'duo-eclat',
    prix = 11000,
    description = 'Offrez à votre peau une routine de soin qui lui fait du bien !
Le Duo Éclat IBOUKOUN COSMETICS est conçu pour accompagner votre peau au quotidien. Cette routine aide à nettoyer la peau, à révéler l''éclat naturel du teint et à l''uniformiser progressivement.
Que vous ayez le teint clair, mat ou foncé, ce duo est adapté à tous les teints.
Prenez soin de votre peau et accordez-lui l''attention qu''elle mérite avec le Duo Éclat.',
    actif = true
where id = 8 or slug in ('duo-eclat', 'duo-eclaircissant-plus');

-- 9. Lotion Anti Quinto (ID 9) - 3.000 F
update public.produits
set nom = 'Lotion Anti Quinto',
    slug = 'lotion-anti-quinto',
    prix = 3000,
    description = 'Si vous avez des problèmes de tâches sur vos doigts, vos pieds et d''autres parties de votre corps, parfois causé par certains produits cosmétiques inadaptés, Cette Lotion est faite pour vous. Elle va redonner à ces parties sombres leur éclat.',
    actif = true
where id = 9 or slug = 'lotion-anti-quinto';

-- Realignement des IDs 10, 11, 12 pour Crème de Visage et les 2 Packs :
update public.produits set id = 111 where slug = 'pack-savon-gommant-premium-creme-visage';
update public.produits set id = 110 where slug = 'pack-savon-antiseptique-creme-visage';

-- 10. Crème de Visage (ID 10) - 2.000 F
insert into public.produits (id, categorie_id, nom, slug, description, benefices, prix, stock, image, actif, ordre)
values (
  10,
  (select id from public.categories where slug = 'visage' limit 1),
  'Crème de Visage',
  'creme-visage',
  'Un visage doux, nourri et éclatant, ça commence par le bon soin !

Notre crème visage aide à nourrir la peau, à préserver sa douceur et à lui redonner un bel éclat naturel en la rendant lisse.
Offrez à votre visage le confort et l’éclat qu’elle mérite avec notre crème visage.',
  'Nourrit et adoucit la peau
Préserve la douceur naturelle
Redonne un éclat lumineux
Texture agréable et non grasse',
  2000,
  50,
  'creme-visage.png',
  true,
  10
)
on conflict (id) do update
set nom = excluded.nom,
    slug = excluded.slug,
    prix = excluded.prix,
    description = excluded.description,
    actif = true;

-- 11. Savon Antiseptique + Crème de Visage (ID 11) - 4.000 F
update public.produits
set id = 11,
    nom = 'Savon Antiseptique + Crème de Visage',
    slug = 'pack-savon-antiseptique-creme-visage',
    prix = 4000,
    description = 'Le Kit Visage IBOUKOUN COSMETICS vous accompagne dans votre routine quotidienne pour prendre soin de votre peau.
Composé d''un savon et d''une crème, il aide à nettoyer la peau en profondeur, à l''hydrater et à réduire l''apparence des boutons et des anciennes taches.
Deux essentiels pour prendre soin de votre visage et lui redonner tout son éclat.',
    actif = true,
    ordre = 11
where id = 110 or slug = 'pack-savon-antiseptique-creme-visage';

-- 12. Savon Gommant + Crème de Visage (ID 12) - 12.000 F
update public.produits
set id = 12,
    nom = 'Savon Gommant + Crème de Visage',
    slug = 'pack-savon-gommant-premium-creme-visage',
    prix = 12000,
    description = 'Votre peau mérite une routine complète pour retrouver douceur et éclat !
Le Duo Savon Gommant Premium + Crème Visage IBOUKOUN COSMETICS associe deux soins complémentaires pour prendre soin de votre visage au quotidien.
Le Savon Gommant Premium aide à exfolier la peau et à éliminer les cellules mortes qui s''accumulent à sa surface. Il contribue à rendre la peau plus douce, plus nette et à révéler son éclat naturel.
La Crème Visage complète cette routine en hydratant la peau et en aidant à réduire l''apparence des boutons et des anciennes taches.
Deux soins pour une peau mieux entretenue, plus douce et lumineuse. Parce qu''une belle peau commence par une bonne routine !
1 Savon Gommant Premium

1 Crème Visage',
    actif = true,
    ordre = 12
where id = 111 or slug = 'pack-savon-gommant-premium-creme-visage';

-- Mettre à jour accueil_sections pour les packs
update public.accueil_sections
set produit_id = 11,
    titre = 'Savon Antiseptique + Crème de Visage',
    description = 'Un soin antiseptique associé à la Crème de Visage Iboukoun.'
where section = 'packs' and ordre = 2;

update public.accueil_sections
set produit_id = 12,
    titre = 'Savon Gommant + Crème de Visage',
    description = 'Le Savon Gommant associé à la Crème de Visage Iboukoun Cosmetics.'
where section = 'packs' and ordre = 3;

-- Synchroniser la séquence ID
select setval('public.produits_id_seq', (select max(id) from public.produits));
