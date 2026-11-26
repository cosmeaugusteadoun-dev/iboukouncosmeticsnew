-- ============================================================
-- IBOUKOUN COSMETICS — Mise à jour de l'ordre des produits
-- ============================================================
-- À exécuter dans Supabase : Dashboard -> SQL Editor -> New query -> Run
-- Met à jour la colonne 'ordre' pour tous les produits selon le nouvel ordre défini :
-- 1. Savon Gommant Premium
-- 2. Savon Antiseptique + Crème de Visage
-- 3. Savon Gommant
-- 4. Gel Clarifiant +
-- 5. Savon Gommant + Crème de Visage
-- 6. Duo Éclaircissant+ (Duo éclat)
-- 7. Sérum Anti-taches & Éclat
-- 8. Savon Antiseptique
-- 9. Huile Éclat
-- 10. Lotion Anti Quinto
-- 11. Crème de Visage
-- 12. Aisselles Chic
-- ============================================================

-- 1. Savon Gommant Premium (ID 5)
update public.produits
set ordre = 1
where id = 5 or slug in ('savon-gommant-premium', 'savont-gommant-premium');

-- 2. Savon Antiseptique + Crème de Visage (ID 11)
update public.produits
set ordre = 2
where id = 11 or slug = 'pack-savon-antiseptique-creme-visage';

-- 3. Savon Gommant (ID 2)
update public.produits
set ordre = 3
where id = 2 or slug = 'savon-gommant';

-- 4. Gel Clarifiant + (ID 6)
update public.produits
set ordre = 4
where id = 6 or slug = 'gel-clarifiant-plus';

-- 5. Savon Gommant + Crème de Visage (ID 12)
update public.produits
set ordre = 5
where id = 12 or slug = 'pack-savon-gommant-premium-creme-visage';

-- 6. Duo Éclaircissant+ (ID 8)
update public.produits
set ordre = 6
where id = 8 or slug in ('duo-eclat', 'duo-eclaircissant-plus');

-- 7. Sérum Anti-taches & Éclat (ID 3)
update public.produits
set ordre = 7
where id = 3 or slug in ('serum-anti-tache', 'serum-eclat');

-- 8. Savon Antiseptique (ID 7)
update public.produits
set ordre = 8
where id = 7 or slug = 'savon-antiseptique';

-- 9. Huile Éclat (ID 4)
update public.produits
set ordre = 9
where id = 4 or slug = 'huile-eclat';

-- 10. Lotion Anti Quinto (ID 9)
update public.produits
set ordre = 10
where id = 9 or slug = 'lotion-anti-quinto';

-- 11. Crème de Visage (ID 10)
update public.produits
set ordre = 11
where id = 10 or slug = 'creme-visage';

-- 12. Aisselles Chic (ID 1)
update public.produits
set ordre = 12
where id = 1 or slug = 'aisselles-chic';
