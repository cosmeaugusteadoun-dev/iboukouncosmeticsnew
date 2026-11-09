begin;

alter table public.temoignages
  alter column ville drop not null,
  alter column produit_id drop not null;

delete from public.temoignages
where (nom_client = 'Aminata K.' and message = 'Aisselles Chic vraiment efficace ! En moins de 2 semaines j''ai vu la différence.')
   or (nom_client = 'Fatima D.' and message = 'Le savon gommant est incroyable ! Ma peau est tellement lisse.')
   or (nom_client = 'Rose S.' and message = 'Le Sérum Éclat a changé ma routine ! Teint uniforme et lumineux.')
   or (nom_client = 'Leonardo ALLAVO' and message = 'IBOUKOUN COSMÉTICS m''a été recommandé par une amie à moi et aujourd''hui je peux vous dire que c''était la meilleure recommandation qu''on m''a faites jusqu''à là. Non seulement ils ont d''excellents produits mais aussi ils sont professionnels !!! Je recommande vraiment')
   or (nom_client = 'Grace Nyg' and message = 'La référence qu''il vous faut pour tout ce qui concerne votre peau 🥰🥰🥰')
   or (nom_client = 'Kora Dafia' and message = 'Les produits IBOUKOUN COSMETICS sont une adaptés à tous types de peau et de teint . Moi j''en utilise et je peux vous assurer que je suis satisfait des résultats jusqu''à présent.')
   or (nom_client = 'Reno Samani' and message = 'Accueil chaleureux, accompagnement adéquat, produit de qualité. La référence en terme dd produit cosmétique au Bénin')
   or (nom_client = 'Mélodie Yokossi' and message = 'Iboukoun cosmétiques c''est la meilleure recommandation que je puisse faire à mon entourage pour finir avec les imperfections corporelles 😍 😍 et aujourd''hui j''ai un joli teint sans aucune imperfections 🥰 😍 😘 c''est la référence aufaite ❤️ ❤️')
   or (nom_client = 'Juliana ADELOUI' and message = 'Ces produits sont les meilleurs que j''ai eu à utiliser sans être déçu et je recommande vivement surtout le savon gommant 😍 ❤️')
   or (nom_client = 'Juste Honorat Zannou' and message = 'Tout simplement les meilleurs dans leur domaine 🎊🚀')
   or (nom_client = 'Saja Gnon Chimène GUEGOU BATA' and message = 'En matière de cosmétiques naturels corporelle, Iboukoun est la meilleure 🥰 ❤️')
   or (nom_client = 'Fleur Dagui' and message = 'Je recommande Iboukoun Cosmétiques pour vos soins naturels cosmétiques : l''une des meilleures. 🥰')
   or (nom_client = 'Grâce' and message = 'J’ai testé les produits IBOUKOUN et j’ai vraiment aimé le résultat sur ma peau. Mon teint est plus propre, plus doux et lumineux. C’est tout simplement waoh❤️')
   or (nom_client = 'Linus Anagonou' and message = 'Le leader de la cosmétique dans le septentrion.')
   or (nom_client = 'Jude Avognon' and message = 'Iboukoun cosmétiques fait les meilleurs produits de soins de visage et corporel que j''ai eu à utiliser. Je recommande vivement')
   or (nom_client = 'Diane Sasse' and message = 'IBOUKOUN COSMÉTICS c’est la meilleure marque . Je l’utilise depuis quelques années et je vous la recommande vivement 🥰');

select setval(
  pg_get_serial_sequence('public.temoignages', 'id'),
  coalesce((select max(id) from public.temoignages), 0) + 1,
  false
);

insert into public.temoignages
  (nom_client, ville, produit_id, note, message, type, screenshot, visible, ordre, created_at)
values
  ('Leonardo ALLAVO', null, null, 4, 'IBOUKOUN COSMÉTICS m''a été recommandé par une amie à moi et aujourd''hui je peux vous dire que c''était la meilleure recommandation qu''on m''a faites jusqu''à là. Non seulement ils ont d''excellents produits mais aussi ils sont professionnels !!! Je recommande vraiment', 'texte', null, true, 1, now() - interval '28 weeks'),
  ('Grace Nyg', null, null, 5, 'La référence qu''il vous faut pour tout ce qui concerne votre peau 🥰🥰🥰', 'texte', null, true, 2, now() - interval '28 weeks'),
  ('Kora Dafia', null, null, 5, 'Les produits IBOUKOUN COSMETICS sont une adaptés à tous types de peau et de teint . Moi j''en utilise et je peux vous assurer que je suis satisfait des résultats jusqu''à présent.', 'texte', null, true, 3, now() - interval '28 weeks'),
  ('Reno Samani', null, null, 5, 'Accueil chaleureux, accompagnement adéquat, produit de qualité. La référence en terme dd produit cosmétique au Bénin', 'texte', null, true, 4, now() - interval '28 weeks'),
  ('Mélodie Yokossi', null, null, 1, 'Iboukoun cosmétiques c''est la meilleure recommandation que je puisse faire à mon entourage pour finir avec les imperfections corporelles 😍 😍 et aujourd''hui j''ai un joli teint sans aucune imperfections 🥰 😍 😘 c''est la référence aufaite ❤️ ❤️', 'texte', null, true, 5, now() - interval '28 weeks'),
  ('Juliana ADELOUI', null, null, 5, 'Ces produits sont les meilleurs que j''ai eu à utiliser sans être déçu et je recommande vivement surtout le savon gommant 😍 ❤️', 'texte', null, true, 6, now() - interval '28 weeks'),
  ('Juste Honorat Zannou', null, null, 5, 'Tout simplement les meilleurs dans leur domaine 🎊🚀', 'texte', null, true, 7, now() - interval '28 weeks'),
  ('Saja Gnon Chimène GUEGOU BATA', null, null, 5, 'En matière de cosmétiques naturels corporelle, Iboukoun est la meilleure 🥰 ❤️', 'texte', null, true, 8, now() - interval '28 weeks'),
  ('Fleur Dagui', null, null, 5, 'Je recommande Iboukoun Cosmétiques pour vos soins naturels cosmétiques : l''une des meilleures. 🥰', 'texte', null, true, 9, now() - interval '28 weeks'),
  ('Grâce', null, null, 5, 'J’ai testé les produits IBOUKOUN et j’ai vraiment aimé le résultat sur ma peau. Mon teint est plus propre, plus doux et lumineux. C’est tout simplement waoh❤️', 'texte', null, true, 10, now() - interval '28 weeks'),
  ('Linus Anagonou', null, null, 5, 'Le leader de la cosmétique dans le septentrion.', 'texte', null, true, 11, now() - interval '28 weeks'),
  ('Jude Avognon', null, null, 5, 'Iboukoun cosmétiques fait les meilleurs produits de soins de visage et corporel que j''ai eu à utiliser. Je recommande vivement', 'texte', null, true, 12, now() - interval '28 weeks'),
  ('Diane Sasse', null, null, 5, 'IBOUKOUN COSMÉTICS c’est la meilleure marque . Je l’utilise depuis quelques années et je vous la recommande vivement 🥰', 'texte', null, true, 13, now() - interval '28 weeks');

commit;
