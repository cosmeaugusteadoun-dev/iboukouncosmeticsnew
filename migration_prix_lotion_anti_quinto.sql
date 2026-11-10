-- Run in the Supabase SQL Editor to apply the new price.
update public.produits
set prix = 3000
where id = 9
  and slug = 'lotion-anti-quinto';
