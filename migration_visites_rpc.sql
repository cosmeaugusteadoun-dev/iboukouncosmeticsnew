-- Remplace l'enregistrement des visites via l'Edge Function public-submit.
-- À exécuter une seule fois dans l'éditeur SQL Supabase du projet.

create or replace function public.record_public_visit(page_path text)
returns void
language plpgsql
security definer
set search_path = pg_catalog
as $$
begin
  if page_path is null
     or length(page_path) > 500
     or left(page_path, 1) <> '/'
     or left(page_path, 2) = '//'
     or page_path ~ '[[:cntrl:]]' then
    raise exception using errcode = '22023', message = 'Invalid page path';
  end if;

  insert into public.visites (page) values (page_path);
end;
$$;

revoke all on function public.record_public_visit(text) from public;
grant execute on function public.record_public_visit(text) to anon;
