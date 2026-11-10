import { render as header } from './templates/header.mjs';
import { render as footer } from './templates/footer.mjs';
import { render as index } from './templates/index.mjs';
import { render as produitsPage } from './templates/produits.mjs';
import { render as produitPage } from './templates/produit.mjs';
import { render as contact } from './templates/contact.mjs';
import { render as histoire } from './templates/histoire.mjs';
import { render as bio } from './templates/bio.mjs';
import { render as temoignages } from './templates/temoignages.mjs';
import { render as egeries } from './templates/egeries.mjs';
import { render as videos } from './templates/videos.mjs';
import { render as promotions } from './templates/promotions.mjs';
import { render as revendeurs } from './templates/revendeurs.mjs';
import { setContext, e, fixMojibake } from './helpers.mjs';
import { renderHomepageSections } from './home-sections.mjs';

export const pages={index,produits:produitsPage,produit:produitPage,contact,histoire,bio,temoignages,egeries,videos,promotions,revendeurs};
function productImageUrl(image, supabaseUrl) {
  if (!image) return null;
  const value=String(image).trim();
  if (/^(?:https?:)?\/\//i.test(value)) return value;
  const filename=value.split(/[\\/]/).pop();
  if (/^sb_[a-z0-9_.-]+$/i.test(filename)&&supabaseUrl) {
    return supabaseUrl.replace(/\/$/,'')+'/storage/v1/object/public/media/produits/'+encodeURIComponent(filename);
  }
  if (value.startsWith('/')&&!/^\/uploads\/produits\//i.test(value)) return value;
  return '/produit/'+encodeURIComponent(filename);
}
function testimonialImageUrl(image) {
  if (!image) return null;
  const value=String(image).trim();
  if (/^(?:https?:)?\/\//i.test(value)||value.startsWith('/')) return value;
  if (/^assets\/images\/[a-z0-9_.-]+$/i.test(value)) return '/'+value;
  const filename=value.split(/[\\/]/).pop();
  if (/^temoignage\d*\.webp$/i.test(filename)) return '/assets/images/'+encodeURIComponent(filename);
  return '/uploads/temoignages/'+encodeURIComponent(filename);
}
export function prepare(data, config, name, meta, productId) {
  data=sanitizeData(data);
  const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Porto-Novo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const active=x=>x.actif===true||x.actif===1;
  const categories=data.categories||[];
  const canonicalSlugs={
    'savont-gommant-premium':'savon-gommant-premium',
    'serum-eclat':'serum-anti-tache',
    'duo-eclaircissant-plus':'duo-eclat'
  };
  const productImages={
    1:'aiselle-chic.png',
    2:'savon-gommant.png',
    3:'serum-anti-tache.png',
    4:'huile-eclat.png',
    5:'savon-gommant-premium.png',
    6:'gel-clarifiant+.png',
    7:'savon-antiseptique.png',
    8:'duo-eclat.png',
    9:'lotion-anti-quinto.png',
    10:'creme-visage.png'
  };
  const produits=(data.produits||[]).filter(active).map(p=>{
    const canonicalImage=productImages[p.id];
    const suppliedImage=typeof p.image==='string'?p.image.replace(/^.*[\\/]/,''):null;
    return {...p,
      nom:fixMojibake(p.nom),
      slug:canonicalSlugs[p.slug]||p.slug,
      image:suppliedImage&&/\.png$/i.test(suppliedImage)&&suppliedImage!==canonicalImage?suppliedImage:canonicalImage||suppliedImage||null,
      categorie_nom:fixMojibake(categories.find(c=>c.id===p.categorie_id)?.nom||''),
      categorie_slug:categories.find(c=>c.id===p.categorie_id)?.slug||''
    };
  });
  for(const p of produits){
    const source=(data.produits||[]).find(row=>row.id===p.id);
    if(source?.image)p.image=source.image;
    p.image_url=productImageUrl(p.image,config.supabaseUrl);
  }
  const promos=(data.promotions||[]).filter(p=>active(p)&&(!p.date_debut||p.date_debut<=day)&&(!p.date_fin||p.date_fin>=day)).sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at))).flatMap(p=>{
    const product=produits.find(x=>x.id===p.produit_id);
    return product?[{...p,produit_nom:product.nom,produit_prix:product.prix,produit_desc:product.description,produit_image:product.image,produit_image_url:product.image_url,produit_slug:product.slug,cat_nom:product.categorie_nom}]:[];
  });
  // Bulk promotions are shown separately; single-unit prices stay truthful.
  for(const p of produits){ const promo=promos.filter(x=>x.produit_id===p.id&&x.min_unites<=1&&x.prix_promo<p.prix).sort((a,b)=>a.prix_promo-b.prix_promo)[0]; Object.assign(p,{prix_final:promo?.prix_promo??p.prix,prix_promo:promo?.prix_promo,promo_id:promo?.id,promo_titre:promo?.titre,promo_pct:promo&&p.prix>0?Math.round((1-promo.prix_promo/p.prix)*100):null}); }
  const produit=produits.find(p=>p.id===Number(productId));
  const params=Object.fromEntries((data.parametres||[]).map(p=>[p.cle,p.valeur]));
  const wa=String(params.whatsapp_number||'22901695300').replace(/\D/g,'');
  const visible=(data.temoignages||[]).filter(t=>t.visible===true||t.visible===1).map(t=>({...t,produit_nom:produits.find(p=>p.id===t.produit_id)?.nom||'',screenshot_url:testimonialImageUrl(t.screenshot)}));
  const temos_texte=visible.filter(t=>t.type==='texte');
  const photos=(data.produit_photos||[]).filter(p=>p.produit_id===produit?.id).sort((a,b)=>Number(b.is_principale)-Number(a.is_principale)||a.ordre-b.ordre);
  const siteUrl=config.siteUrl.replace(/\/$/,'');
  const path=name==='index'?'/':name==='produit'?'/produit/'+produit?.slug+'/':'/'+name+'.html';
  const title=produit?produit.nom+' — Iboukoun Cosmetics':meta.page_title;
  const description=produit?String(produit.description||'').slice(0,155):meta.meta_desc;
  const equipe=(data.equipe||[]).filter(active).sort((a,b)=>a.ordre-b.ordre);
  const ctx={...data,siteUrl,BASE_URL:'/',WA_NUMBER:wa,UPLOAD_PATH:'/',UPLOAD_URL_PRODUITS:'/produit/',UPLOAD_URL_EQUIPE:'/uploads/equipe/',UPLOAD_URL_EGERIES:'/uploads/egeries/',UPLOAD_URL_TEMOIGNAGES:'/uploads/temoignages/',GSC_VERIFICATION_CODE:e(config.googleSiteVerification||''),seo_title:title,seo_desc:description,seo_img:siteUrl+'/assets/images/hero.jpg',seo_url:siteUrl+path,seo:{keywords:'',og_type:produit?'product':'website'},page_active:meta.page_active||name,params,wa_number:wa,produits,categories,cat_filtre:'all',promos,promo_nav:promos[0]||null,promo_active:promos[0]||null,temos_texte,screenshots:visible.filter(t=>t.type==='screenshot'),total_avi:visible.length,note_moy:temos_texte.length?Math.round(temos_texte.reduce((n,t)=>n+t.note,0)/temos_texte.length*10)/10:0,egeries:(data.egeries||[]).filter(active).sort((a,b)=>a.ordre-b.ordre),equipe,fondateur:equipe[0]||{nom:'Fidèle BARRA',photo:'fondateur.jpg'},nb_clients:500,nb_produits:produits.length,videos:(data.videos||[]).filter(active),accueil_sections:data.accueil_sections||[],produit,photos,img_principale:photos[0]?'/uploads/produits/photos/'+photos[0].fichier:produit?.image?(String(produit.image).startsWith('/')?produit.image:'/produit/'+produit.image):null,temos:visible.filter(t=>t.produit_id===produit?.id),similaires:produits.filter(p=>p.categorie_id===produit?.categorie_id&&p.id!==produit?.id).concat(produits.filter(p=>p.categorie_id!==produit?.categorie_id)).slice(0,4),faqs:[],page:null,renderFooter:footer};
  if(name==='produit'){
    ctx.img_principale=photos[0]?'/uploads/produits/photos/'+photos[0].fichier:produit?.image_url||null;
    ctx.similaires=produits.filter(p=>p.id!==produit?.id);
  }
  setContext(ctx);
  return ctx;
}

export function renderPage(data,config,name,meta,productId){
  const ctx=prepare(data,config,name,meta,productId);
  if(name==='promotions'&&!ctx.promos.length){
    return '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><meta http-equiv="refresh" content="0;url=/produits.html"><title>Redirection - Iboukoun Cosmetics</title><script>location.replace("/produits.html")</script></head><body><a href="/produits.html">Aucune promotion en cours. Voir nos produits.</a></body></html>';
  }
  if(name==='produit'&&!ctx.produit) throw new Error('Produit introuvable');
  let html=header(ctx)+pages[name](ctx);
  if(name==='contact'){
    const map='<section class="section contact-map-section"><div class="container"><div class="contact-map-heading"><h2 class="ci-title">Retrouvez notre boutique</h2><a href="https://maps.app.goo.gl/U6HrWiozppZBKasj6" target="_blank" rel="noopener noreferrer">Ouvrir dans Google Maps <i class="ri-arrow-right-up-line"></i></a></div><iframe src="https://www.google.com/maps/embed?origin=mfe&amp;pb=!1m3!2m1!1s9.3706875,2.6266875!6i17" title="Localisation de la boutique Iboukoun Cosmetics à Parakou" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></section>';
    html=html.replace('<!-- CTA WHATSAPP -->',map+'\n<!-- CTA WHATSAPP -->');
  }
  if(name==='index'){
    const sections=renderHomepageSections(ctx);
    const testimonialStart='<section class="section idx-temos"';
    const nextHomeSection='<!-- ÉGÉRIES -->';
    const results=sections.match(/<section class="home-results[\s\S]*?<\/section>/)?.[0]||'';
    const beforeReviews=sections.replace(results,'');
    if(beforeReviews){
      if(html.includes(testimonialStart))html=html.replace(testimonialStart,beforeReviews+'\n'+testimonialStart);
      else if(html.includes(nextHomeSection))html=html.replace(nextHomeSection,beforeReviews+'\n'+nextHomeSection);
    }
    if(results&&html.includes(nextHomeSection))html=html.replace(nextHomeSection,results+'\n'+nextHomeSection);
  }
  if(name==='produit'){
    html=html.replace('Vous aimerez aussi','Les autres produits').replace('Dans la même gamme','Notre gamme complète');
    if(!ctx.temos.length)html=html.replace('<!-- PRODUITS SIMILAIRES -->','<section class="fp-section fp-temos-section" id="fp-temos"><div class="container"><div class="section-header reveal"><div class="section-eyebrow"><i class="ri-star-line"></i>Avis clients</div><h2 class="section-h2">Ce qu’ils disent de ce produit</h2><p class="section-sub">Aucun témoignage pour le moment.</p></div></div></section>\n<!-- PRODUITS SIMILAIRES -->');
    if(!ctx.similaires.length)html=html.replace('<footer','<section class="fp-section fp-similaires-section"><div class="container"><div class="section-header reveal"><div class="section-eyebrow"><i class="ri-sparkling-line"></i>Notre gamme complète</div><h2 class="section-h2">Les autres produits</h2><p class="section-sub">Aucun autre produit disponible pour le moment.</p></div></div></section>\n<footer');
  }
  const editable=(data.pages_contenu||[]).find(p=>p.slug===(name==='bio'?'bio_pdg':name));
  if(['bio','histoire'].includes(name)&&editable?.contenu){
    html=html.replace('<footer',`<section class="section"><div class="container"><h2>${e(editable.titre||'')}</h2><p>${e(editable.contenu).replace(/\n/g,'<br>')}</p></div></section><footer`);
  }
  if(name==='produit'){
    const rules=ctx.promos.filter(p=>p.produit_id===ctx.produit.id).map(p=>({min:Number(p.min_unites),price:Number(p.prix_promo)}));
    html=html.replace('var total = FP_PRIX * qty;',`var unit = ${JSON.stringify(rules)}.filter(function(p){return p.min<=qty}).reduce(function(price,p){return Math.min(price,p.price)},FP_PRIX);\n  var total = unit * qty;`);
  }
  html=html.replace(/<\/body>\s*<\/body>/g,'</body>');
  // Original pages placed their scripts after the footer's closing document tags.
  html=html.replace(/<\/body>|<\/html>/g,'')+'\n</body></html>';
  html=html.replace(/\b(index|produits|contact|histoire|bio|temoignages|egeries|videos|promotions|revendeurs)\.php/g,'$1.html');
  html=html.replace(/produit\.php\?id=(\d+)/g,(_,id)=>'/produit/'+(ctx.produits.find(p=>p.id===Number(id))?.slug||'introuvable')+'/');
  html=html.replace(/\/\/produit\//g,'/produit/');
  html=html.replace(/assets\/images\/(favicon\.png|apple-touch-icon\.png|og-[\w-]+\.jpg)/g,'assets/images/logo.jpg');
  html=html.replace(/type="image\/png"/g,'type="image/jpeg"');
  html=html.replace(/api\/(contact_submit|commande_submit|revendeur_submit|log_whatsapp)\.php/g,'api/$1');
  if(config.supabaseUrl)html=html.replace(/\/uploads\/([a-z/]+)\/(sb_[a-z0-9_.-]+)/gi,config.supabaseUrl+'/storage/v1/object/public/media/$1/$2');
  html=html.replace(/target="_blank"(?!\s+rel=)/g,'target="_blank" rel="noopener noreferrer"');
  let headings=0;
  html=html.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/g,(whole,attrs,text)=>++headings===1?whole:'<p'+attrs+'>'+text+'</p>');
  html=html.replace(/href="\/contact.html">Mentions légales/g,'href="/mentions-legales.html">Mentions légales').replace(/href="\/contact.html">Confidentialité/g,'href="/confidentialite.html">Confidentialité');
  html=html.replace('</head>','<link rel="stylesheet" href="/assets/accessibility.css"><noscript><style>#skeletonLoader{display:none!important}.reveal{opacity:1!important;transform:none!important}</style></noscript><script src="/assets/forms.js" defer></script><script type="module" src="/assets/public.js"></script></head>');
  return fixMojibake(html);
}

export function sanitizeData(input){
 const data=structuredClone(input);
 const safeFile=v=>!v||/^(?:[a-zA-Z0-9_.-]+\/)*[a-zA-Z0-9_.-]+$/.test(v)&&!v.includes('..');
 for(const rows of Object.values(data))if(Array.isArray(rows))for(const row of rows){
  for(const key of ['image','photo','screenshot','fichier'])if(key in row&&!safeFile(row[key]))row[key]=null;
  if('youtube_id' in row&&!/^[a-zA-Z0-9_-]{11}$/.test(row.youtube_id||''))row.youtube_id=null;
 }
 for(const setting of data.parametres||[]){
  if(/_url$/.test(setting.cle)&&setting.valeur&&!/^https:\/\/[a-z0-9.-]+(?:[/:?#]|$)/i.test(setting.valeur))setting.valeur='';
  if(setting.cle==='email_contact'&&!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(setting.valeur||''))setting.valeur='';
 }
 return data;
}
