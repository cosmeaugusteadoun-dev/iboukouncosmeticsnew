-- Run after migration_accueil_sections.sql in the Supabase SQL Editor.
begin;

alter table public.temoignages
  alter column nom_client drop not null,
  alter column ville drop not null,
  alter column produit_id drop not null,
  alter column note drop not null,
  alter column message drop not null;

update public.accueil_sections
set image = case section
      when 'packs' then case ordre
        when 1 then 'duo-eclat.png'
        when 2 then 'savon-antiseptique-creme.png'
        when 3 then 'offre-special-gommant-creme.png'
      end
      when 'mission' then case ordre
        when 1 then 'equipe-iboukoun-cosmetics.png'
        when 2 then 'aiselle-chic-application.png'
        when 3 then 'resultat-sérums-clatants.png'
      end
    end
where image is null
  and ((section = 'packs' and item_type = 'pack' and ordre between 1 and 3)
    or (section = 'mission' and item_type = 'image' and ordre between 1 and 3));

update public.accueil_sections
set titre = 'Témoignage visuel ' || ordre,
    image = case
      when ordre = 1 then 'temoignage.webp'
      else 'temoignage' || (ordre - 1) || '.webp'
    end,
    actif = true
where section = 'resultats'
  and item_type = 'image'
  and ordre between 1 and 15;

insert into public.accueil_sections (section, item_type, titre, image, ordre, actif)
select
  'resultats',
  'image',
  'Témoignage visuel ' || slot,
  case when slot = 1 then 'temoignage.webp' else 'temoignage' || (slot - 1) || '.webp' end,
  slot,
  true
from generate_series(1, 15) as slots(slot)
where not exists (
  select 1
  from public.accueil_sections existing
  where existing.section = 'resultats'
    and existing.item_type = 'image'
    and existing.ordre = slot
);

insert into public.temoignages (nom_client, ville, produit_id, note, message, type, screenshot, visible, ordre)
select
  null,
  null,
  null,
  null,
  null,
  'screenshot',
  'temoignage' || slot || '.webp',
  true,
  slot - 1
from generate_series(15, 27) as slots(slot)
where not exists (
  select 1
  from public.temoignages existing
  where existing.type = 'screenshot'
    and existing.screenshot = 'temoignage' || slot || '.webp'
);

commit;
