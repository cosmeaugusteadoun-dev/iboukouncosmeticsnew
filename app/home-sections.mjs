import { e } from './helpers.mjs';

function imageUrl(image, supabaseUrl) {
  if (!image) return '';
  if (/^https:\/\//i.test(image)) return image;
  if (image.startsWith('/')) return image;
  const siteImage = ['equipe-iboukoun-cosmetics.png', 'aiselle-chic-application.png', 'resultat-sérums-clatants.png'];
  if (siteImage.includes(image)) return '/assets/images/' + encodeURIComponent(image);
  if (/^sb_[a-z0-9_.-]+$/i.test(image)) {
    return supabaseUrl.replace(/\/$/, '') + '/storage/v1/object/public/media/accueil/' + encodeURIComponent(image);
  }
  if (['duo-eclat.png', 'savon-antiseptique-creme.png', 'offre-special-gommant-creme.png'].includes(image)) {
    return '/produit/' + encodeURIComponent(image);
  }
  return '/uploads/accueil/' + encodeURIComponent(image);
}

function photo(item, supabaseUrl, alt, className = '') {
  const src = imageUrl(item.image, supabaseUrl);
  return src
    ? `<img class="${className}" src="${e(src)}" alt="${e(alt)}" loading="lazy">`
    : `<div class="${className} home-section-placeholder" aria-label="Image à ajouter depuis l’espace administrateur"><i class="ri-image-add-line" aria-hidden="true"></i><span>Image à ajouter</span></div>`;
}

export function renderHomepageSections(ctx) {
  const rows = (ctx.accueil_sections || []).filter(row => row.actif === true || row.actif === 1);
  if (!rows.length) {
    rows.push(
      {section:'packs',item_type:'pack',titre:'Duo Éclaircissant+',description:'Découvrez le duo de soins éclaircissants Iboukoun.',produit_id:8,ordre:1,actif:true},
      {section:'packs',item_type:'pack',titre:'Savon Antiseptique + Crème de Visage',description:'Deux soins réunis dans un même pack. Contactez-nous pour connaître le prix.',ordre:2,actif:true},
      {section:'packs',item_type:'pack',titre:'Savon Gommant + Crème de Visage',description:'Une association de soins pour le corps et le visage. Contactez-nous pour connaître le prix.',ordre:3,actif:true},
      {section:'mission',item_type:'texte',titre:'Notre mission',description:'Chez Iboukoun Cosmetics, nous croyons qu’une belle peau commence par des soins adaptés, nourrissants et inspirés par la nature. Nos formules sont pensées pour accompagner chaque peau dans sa routine beauté.',surtitre:'Nous avons à cœur',texte_final:'Iboukoun Cosmetics, prendre soin de votre peau naturellement.',ordre:1,actif:true},
      ...Array.from({length:3},(_,index)=>({section:'mission',item_type:'image',titre:`Image de mission ${index+1}`,ordre:index+1,actif:true})),
      {section:'resultats',item_type:'texte',titre:'Nos résultats parlent d’eux-mêmes',description:'Chaque image témoigne de la confiance de notre communauté et de son expérience avec nos soins.',ordre:1,actif:true},
      ...Array.from({length:6},(_,index)=>({section:'resultats',item_type:'image',titre:`Image de résultat ${index+1}`,ordre:index+1,actif:true}))
    );
  }
  const defaultPackImages = {
    1:'duo-eclat.png',
    2:'savon-antiseptique-creme.png',
    3:'offre-special-gommant-creme.png'
  };
  const defaultMissionImages = {
    1:'equipe-iboukoun-cosmetics.png',
    2:'aiselle-chic-application.png',
    3:'resultat-sérums-clatants.png'
  };
  const packs = rows.filter(row => row.section === 'packs' && row.item_type === 'pack').sort((a, b) => a.ordre - b.ordre);
  const mission = rows.find(row => row.section === 'mission' && row.item_type === 'texte');
  const missionPhotos = rows.filter(row => row.section === 'mission' && row.item_type === 'image').sort((a, b) => a.ordre - b.ordre);
  const resultCopy = rows.find(row => row.section === 'resultats' && row.item_type === 'texte');
  const resultPhotos = rows.filter(row => row.section === 'resultats' && row.item_type === 'image').sort((a, b) => a.ordre - b.ordre);
  const esc = e;
  let html = '';

  if (packs.length) {
    html += `<section class="home-packs section" id="nos-packs">
  <div class="container">
    <header class="section-header reveal">
      <div class="section-eyebrow">Des routines complètes</div>
      <h2 class="section-h2">Nos packs</h2>
      <p class="section-sub">Des associations de soins pensées pour accompagner votre routine.</p>
    </header>
    <div class="home-packs-grid">`;
    for (const pack of packs) {
      const product = ctx.produits.find(item => item.id === pack.produit_id);
      const target = product ? '/produit/' + encodeURIComponent(product.slug) + '/' : 'https://wa.me/' + encodeURIComponent(ctx.WA_NUMBER) + '?text=' + encodeURIComponent('Bonjour, je souhaite en savoir plus sur le pack ' + pack.titre + '.');
      const price = product ? `<span class="home-pack-price">${esc(product.prix_final ?? product.prix).toLocaleString('fr-FR').replace(/\s/g, '.')} F</span>` : '<span class="home-pack-price">Prix à définir</span>';
      html += `<article class="home-pack-card reveal">
        <a class="home-pack-image" href="${esc(target)}" ${product ? '' : 'target="_blank" rel="noopener noreferrer"'}>
          ${photo({...pack,image:pack.image||defaultPackImages[pack.ordre]}, ctx.supabaseUrl, pack.titre, 'home-pack-photo')}
          <span class="home-pack-image-shade"></span>
          <span class="home-pack-image-title">${esc(pack.titre)}</span>
          <span class="home-pack-discover">Découvrir <i class="ri-arrow-right-line" aria-hidden="true"></i></span>
        </a>
        <div class="home-pack-copy">
          <p>${esc(pack.description || '')}</p>
          <div class="home-pack-action">${price}<a href="${esc(target)}" ${product ? '' : 'target="_blank" rel="noopener noreferrer"'}>${product ? 'Voir la fiche et commander' : 'Nous contacter'} <i class="ri-arrow-right-line" aria-hidden="true"></i></a></div>
        </div>
      </article>`;
    }
    html += `</div>
  </div>
</section>`;
  }

  if (mission) {
    const pictures = missionPhotos.slice(0, 3);
    html += `<section class="home-mission section" id="notre-mission">
  <div class="container home-mission-layout">
    <div class="home-mission-gallery reveal" aria-label="Images de la mission Iboukoun Cosmetics">`;
    for (let index = 0; index < 3; index++) {
      const item = pictures[index] || {};
      html += `<div class="home-mission-photo home-mission-photo-${index + 1}">${photo({...item,image:item.image||defaultMissionImages[index+1]}, ctx.supabaseUrl, item.titre || 'Notre mission Iboukoun Cosmetics')}</div>`;
    }
    html += `</div>
    <div class="home-mission-copy reveal">
      <div class="section-eyebrow">${esc(mission.surtitre || 'Nous avons à cœur')}</div>
      <h2>${esc(mission.titre || 'Notre mission')}</h2>
      <p>${esc(mission.description || '').replace(/\n/g, '<br>')}</p>
      <strong>${esc(mission.texte_final || 'Iboukoun Cosmetics — le soin naturel, au quotidien.')}</strong>
    </div>
  </div>
</section>`;
  }

  if (resultCopy && resultPhotos.length) {
    const columns = [resultPhotos.filter((_, index) => index % 2 === 0), resultPhotos.filter((_, index) => index % 2 === 1)];
    html += `<section class="home-results section" id="nos-resultats">
  <div class="container home-results-layout">
    <div class="home-results-copy reveal">
      <div class="section-eyebrow">La communauté Iboukoun</div>
      <h2>${esc(resultCopy.titre || 'Nos résultats parlent d’eux-mêmes')}</h2>
      <p>${esc(resultCopy.description || '')}</p>
      <a class="home-results-cta" href="/temoignages.html">Découvrir les témoignages <i class="ri-arrow-right-line" aria-hidden="true"></i></a>
    </div>
    <div class="home-results-gallery" aria-label="Photos partagées par nos clients">`;
    columns.forEach((column, index) => {
      if (!column.length) return;
      const loop = [...column, ...column];
      html += `<div class="home-results-track home-results-track-${index + 1}">`;
      for (const item of loop) html += `<figure class="home-results-photo">${photo(item, ctx.supabaseUrl, item.titre || 'Résultat partagé par une cliente')}</figure>`;
      html += '</div>';
    });
    html += `</div>
  </div>
</section>`;
  }

  if (html) html += `<style>
.home-packs{padding-block:76px;background:#fff}.home-packs-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px}
.home-pack-card{min-width:0;border:1px solid rgba(16,32,93,.1);border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 12px 34px rgba(18,30,72,.07)}
.home-pack-image{height:340px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#eef5f8;color:#101010}
.home-pack-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .55s ease}
.home-pack-card:hover .home-pack-photo{transform:scale(1.035)}.home-pack-image-shade{position:absolute;inset:42% 0 0;background:linear-gradient(transparent,rgba(0,0,0,.4))}
.home-pack-image-title{position:absolute;left:8%;right:8%;top:38%;padding:12px 10px;background:rgba(255,255,255,.72);font-family:var(--font-heading,"Cormorant Garamond",serif);font-size:clamp(22px,2.4vw,36px);font-weight:700;line-height:1.12;text-align:center}
.home-pack-discover{position:absolute;left:9%;right:9%;bottom:18px;display:flex;justify-content:space-between;align-items:center;color:#fff;font-size:15px}
.home-pack-copy{padding:18px 20px 20px}.home-pack-copy p{min-height:48px;margin:0 0 16px;color:var(--text2,#454b5c);line-height:1.55}.home-pack-action{display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid rgba(16,32,93,.1);padding-top:14px}
.home-pack-price{color:var(--navy,#10205d);font-weight:700;white-space:nowrap}.home-pack-action a{color:var(--navy,#10205d);font-weight:700;font-size:13px;text-align:right}
.home-section-placeholder{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;color:#62708a;background:linear-gradient(135deg,#edf4f6,#dce8ed);font-size:13px}
.home-section-placeholder i{font-size:27px}.home-mission{padding-block:90px;background:#fff}.home-mission-layout{display:grid;grid-template-columns:1fr 1.12fr;gap:9%;align-items:center}
.home-mission-gallery{height:510px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:16px;align-items:center}
.home-mission-photo{position:relative;min-width:0;height:100%;overflow:hidden;border-radius:12px;box-shadow:0 12px 28px rgba(0,0,0,.12)}
.home-mission-photo img,.home-mission-photo .home-section-placeholder{width:100%;height:100%;object-fit:cover}
.home-mission-photo-1{transform:rotate(-4deg);height:90%}.home-mission-photo-2{transform:rotate(-2deg);height:90%}.home-mission-photo-3{grid-column:2;grid-row:1 / 3;height:100%;transform:rotate(1deg)}
.home-mission-copy .section-eyebrow{font-weight:700;color:var(--navy,#10205d);text-transform:uppercase}.home-mission-copy h2,.home-results-copy h2{margin:14px 0 20px;color:var(--navy,#10205d);font-family:var(--font-heading,"Cormorant Garamond",serif);font-size:clamp(36px,4vw,54px);line-height:1.08}
.home-mission-copy p,.home-results-copy p{color:var(--text2,#353b49);font-size:18px;line-height:1.65;white-space:normal}.home-mission-copy strong{display:block;margin-top:30px;color:var(--navy,#10205d);font-size:17px}
.home-results{padding-block:90px;overflow:hidden;background:#fff}.home-results-layout{display:grid;grid-template-columns:1.15fr .85fr;gap:8%;align-items:center;min-height:570px}
.home-results-copy h2{font-size:clamp(40px,5vw,62px)}.home-results-cta{display:inline-flex;align-items:center;justify-content:space-between;gap:30px;margin-top:34px;padding:17px 22px;background:#101010;color:#fff;font-weight:700}
.home-results-gallery{height:590px;display:grid;grid-template-columns:1fr 1fr;gap:12px;overflow:hidden}.home-results-track{display:flex;flex-direction:column;gap:12px;animation:home-results-scroll 32s linear infinite}
.home-results-track-2{animation-duration:38s;animation-direction:reverse}.home-results-gallery:hover .home-results-track{animation-play-state:paused}
.home-results-photo{height:210px;min-height:210px;margin:0;overflow:hidden;border-radius:5px;background:#edf2f2}.home-results-photo img,.home-results-photo .home-section-placeholder{width:100%;height:100%;object-fit:cover}
@keyframes home-results-scroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}
@media(max-width:850px){.home-packs-grid{gap:14px}.home-pack-image{height:270px}.home-pack-copy{padding:15px}.home-pack-action{align-items:flex-start;flex-direction:column}.home-pack-action a{text-align:left}.home-mission-layout{gap:5%}.home-mission-gallery{height:420px}.home-results-layout{gap:5%;grid-template-columns:1fr 1fr}}
@media(max-width:620px){.home-packs,.home-mission,.home-results{padding-block:54px}.home-packs-grid{grid-template-columns:1fr;gap:20px}.home-pack-image{height:300px}.home-pack-copy p{min-height:0}.home-mission-layout,.home-results-layout{grid-template-columns:1fr;gap:36px}.home-mission-gallery{height:390px}.home-mission-copy p,.home-results-copy p{font-size:16px}.home-results-gallery{height:440px}.home-results-photo{height:170px;min-height:170px}}
@media(prefers-reduced-motion:reduce){.home-pack-photo,.home-results-track{animation:none;transition:none}}
</style>`;
  return html;
}
