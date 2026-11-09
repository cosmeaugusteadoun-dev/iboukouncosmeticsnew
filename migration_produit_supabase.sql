-- Migration complémentaire de la fiche produit
-- À exécuter dans Supabase SQL Editor après iboukoun_schema.sql

alter table public.produits
  add column if not exists promo_id bigint;

create index if not exists idx_produits_promo on public.produits (promo_id);

create or replace function public.sync_product_promo(p_produit_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.produits p
  set promo_id = (
    select pr.id
    from public.promotions pr
    where pr.produit_id = p.id
      and pr.actif = true
      and (pr.date_debut is null or pr.date_debut <= current_date)
      and (pr.date_fin is null or pr.date_fin >= current_date)
      and pr.min_unites <= 1
      and pr.prix_promo < p.prix
    order by pr.prix_promo asc, pr.id asc
    limit 1
  )
  where p.id = p_produit_id;
end;
$$;

create or replace function public.sync_product_promo_from_promotion()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    perform public.sync_product_promo(old.produit_id);
    return old;
  end if;
  if tg_op = 'UPDATE' and old.produit_id is distinct from new.produit_id then
    perform public.sync_product_promo(old.produit_id);
  end if;
  perform public.sync_product_promo(new.produit_id);
  return new;
end;
$$;

drop trigger if exists trg_sync_product_promo on public.promotions;
create trigger trg_sync_product_promo
after insert or update or delete on public.promotions
for each row execute function public.sync_product_promo_from_promotion();

do $$
declare p record;
begin
  for p in select id from public.produits loop
    perform public.sync_product_promo(p.id);
  end loop;
end;
$$;
