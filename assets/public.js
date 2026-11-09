import { renderPage } from '/app/render.mjs';
function revealProductSections(root=document){
 root.querySelectorAll('.fp-main .reveal').forEach(element=>element.classList.remove('reveal'));
 root.querySelectorAll('.fp-temos-section .reveal,.fp-similaires-section .reveal').forEach(element=>element.classList.add('visible'));
}
if(!window.iboukounPublic){
 window.iboukounPublic=true;
 if(location.pathname.startsWith('/produit/')||location.pathname==='/produit.html'){
  for(const href of ['/assets/generated/9e0cbfad22e357cd.css','/assets/generated/b96b5aff735be415.css']){
   if(document.querySelector(`link[href="${href}"]`))continue;
   const stylesheet=document.createElement('link');
   stylesheet.rel='stylesheet';
   stylesheet.href=href;
   document.head.append(stylesheet);
  }
 }
 try{
  const [config,routes,metadata,snapshot]=await Promise.all(['/site-config.json','/routes.json','/app/metadata.json','/public-data.json'].map(p=>fetch(p).then(r=>r.json())));
  const path=location.pathname.replace(/\/+$/,'')||'/';
  const slugRoute=routes.find(r=>r.name==='produit'&&('/'+r.file.replace(/\/index\.html$/,'')).replace(/\/+$/,'')===path);
  const dynamic=location.pathname===' /produit.html'.trim()||path.startsWith('/produit.html')||path.startsWith('/produit/');
  const searchParams=new URLSearchParams(location.search);
  const requestedProductSlug=path.startsWith('/produit.html')?searchParams.get('slug'):null;
  const legacyProductId=path.startsWith('/produit.html')&&!requestedProductSlug?Number(searchParams.get('id')):0;
  const legacySlug=legacyProductId?snapshot.produits.find(p=>p.id===legacyProductId)?.slug:null;
  if(legacySlug)location.replace('/produit/'+legacySlug+'/');
  let route=slugRoute||routes.find(r=>{
   const routePath='/'+r.file.replace(/\/index\.html$/,'');
   return routePath.replace(/\/+$/,'')===path||(path==='/'&&r.name==='index');
  });
  if(dynamic)route=slugRoute||{name:'produit',id:requestedProductSlug?snapshot.produits.find(p=>p.slug===requestedProductSlug)?.id:Number(searchParams.get('id'))};
  if(slugRoute){
   const product=renderPage(snapshot,config,'produit',metadata.produit,slugRoute.id);
   const productDoc=new DOMParser().parseFromString(product,'text/html');
   const renderedFooter=productDoc.querySelector('footer');
   if(!renderedFooter)throw new Error('Le pied de page du modèle produit est introuvable.');
   const review=productDoc.querySelector('.fp-temos-section')?.cloneNode(true)||document.createElement('section');
   if(!review.classList.contains('fp-temos-section')){
    review.className='fp-section fp-temos-section';
    review.innerHTML='<div class="container"><div class="section-header reveal"><div class="section-eyebrow"><i class="ri-star-line"></i>Avis clients</div><h2 class="section-h2">Ce qu’ils disent de ce produit</h2><p class="section-sub">Aucun témoignage pour le moment.</p></div></div>';
   }
   const recommendations=productDoc.querySelector('.fp-similaires-section')?.cloneNode(true)||document.createElement('section');
   if(!recommendations.classList.contains('fp-similaires-section')){
    recommendations.className='fp-section fp-similaires-section';
    recommendations.innerHTML='<div class="container"><div class="section-header reveal"><div class="section-eyebrow"><i class="ri-sparkling-line"></i>Notre gamme complète</div><h2 class="section-h2">Les autres produits</h2><p class="section-sub">Aucun autre produit disponible pour le moment.</p></div></div>';
   }
   document.querySelectorAll('.fp-temos-section,.fp-similaires-section').forEach(section=>section.remove());
   const existingFooter=document.querySelector('footer');
   const anchor=existingFooter||document.querySelector('body > style, body > script');
   document.body.insertBefore(review,anchor);
   document.body.insertBefore(recommendations,anchor);
   if(!existingFooter)document.body.insertBefore(renderedFooter.cloneNode(true),anchor);
   revealProductSections();
  }
  if(dynamic&&!slugRoute){
   const id=route.id;
   if(!id&&path.startsWith('/produit/')){
    const slug=decodeURIComponent(path.split('/').filter(Boolean).pop()||'');
    route={...route,id:snapshot.produits.find(p=>p.slug===slug)?.id};
   }
   if(route.name==='produit'&&route.id&&snapshot.produits.some(p=>p.id===route.id)){
    const html=renderPage(snapshot,config,'produit',metadata.produit,route.id);
    const doc=new DOMParser().parseFromString(html,'text/html');
    document.title=doc.title;
    document.body.replaceWith(doc.body);
    const scripts=[...doc.querySelectorAll('script:not([src]):not([type="application/ld+json"])')].map(s=>s.textContent);
    doc.querySelectorAll('script:not([type="application/ld+json"])').forEach(s=>s.remove());
    for(const css of doc.head.querySelectorAll('style'))document.head.append(css);
    for(const source of scripts){const script=document.createElement('script');script.textContent=source;document.body.append(script);}
  }
  }
  if(config.supabaseUrl&&config.supabasePublicKey&&route){
   const tables=['categories','produits','promotions','temoignages','egeries','equipe','pages_contenu','videos','parametres','produit_photos','accueil_sections'];
   const entries=await Promise.all(tables.map(async table=>{
    const rows=[];let offset=0;
    while(true){const response=await fetch(config.supabaseUrl+'/rest/v1/'+table+'?select=*&order='+(table==='parametres'?'cle':table==='pages_contenu'?'slug':'id'),{headers:{apikey:config.supabasePublicKey,Range:`${offset}-${offset+999}`},signal:AbortSignal.timeout(15000)});if(!response.ok){if(table==='accueil_sections')return [table,snapshot.accueil_sections||[]];throw new Error('Données indisponibles');}const batch=await response.json();rows.push(...batch);if(batch.length<1000)break;offset+=1000;}
    return [table,rows];
   }));
   const live=Object.fromEntries(entries);
   if(route.name==='produit'&&!route.id&&(requestedProductSlug||path.startsWith('/produit/'))){
    const productSlug=requestedProductSlug||decodeURIComponent(path.split('/').filter(Boolean).pop()||'');
    route={...route,id:live.produits.find(p=>p.slug===productSlug)?.id};
   }
   const needsRender=(dynamic&&!slugRoute)||(!dynamic&&(route.name==='index'||route.name==='temoignages'||JSON.stringify(live)!==JSON.stringify(snapshot)));
   if(needsRender){
    const id=route.id;
    if(route.name==='produit'&&!live.produits.some(p=>p.id===id)){
     const loader=document.getElementById('productLoader');
     if(dynamic&&loader){
      loader.setAttribute('aria-busy','false');
      loader.innerHTML='<div><h1>Produit indisponible</h1><p><a href="/produits.html">Retour aux produits</a></p></div>';
     }else{
      const alert=document.createElement('p');alert.className='site-notice';alert.textContent='Ce produit est actuellement indisponible.';document.body.prepend(alert);
      if(dynamic){const heading=document.querySelector('h1');if(heading)heading.textContent='Produit indisponible';}
     }
     document.querySelectorAll('form button[type="submit"]').forEach(b=>b.disabled=true);
    }else{
     let html=renderPage(live,config,route.name,metadata[route.name],id);
     for(const product of live.produits){
      const productPath='/produit/'+encodeURIComponent(product.slug);
      const hasSlugRoute=routes.some(r=>r.name==='produit'&&('/'+r.file.replace(/\/index\.html$/,'')).replace(/\/+$/,'')===productPath);
      if(!hasSlugRoute)html=html.split(productPath+'/').join('/produit.html?slug='+encodeURIComponent(product.slug));
     }
     const doc=new DOMParser().parseFromString(html,'text/html');
     document.title=doc.title;
     for(const sel of ['meta[name="description"]','link[rel="canonical"]','meta[property^="og:"]','meta[name^="twitter:"]']){
      document.head.querySelectorAll(sel).forEach(n=>n.remove());doc.head.querySelectorAll(sel).forEach(n=>document.head.append(n.cloneNode(true)));
     }
     // Preserve global adapters; rerun only the trusted presentation scripts.
     const scripts=[...doc.querySelectorAll('script:not([src]):not([type="application/ld+json"])')].map(s=>s.textContent);
     doc.querySelectorAll('script:not([type="application/ld+json"])').forEach(s=>s.remove());
     for(const css of doc.head.querySelectorAll('style'))document.head.append(css);
     document.body.replaceWith(doc.body);
     revealProductSections();
     const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href='/assets/accessibility.css';document.head.append(stylesheet);
     for(const source of scripts){const script=document.createElement('script');script.textContent=source;document.body.append(script);}
     window.mountIboukounForms?.();
    }
   }
   const visitKey='iboukoun-visit:'+location.pathname;
   try{const last=Number(sessionStorage.getItem(visitKey)||0);if(Date.now()-last>3600000){
    const response=await fetch(config.supabaseUrl+'/rest/v1/rpc/record_public_visit',{method:'POST',headers:{'Content-Type':'application/json',apikey:config.supabasePublicKey},body:JSON.stringify({page_path:location.pathname}),signal:AbortSignal.timeout(10000)});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    sessionStorage.setItem(visitKey,String(Date.now()));
   }}catch(error){console.warn('Impossible d’enregistrer la visite de cette page.',error);}
    const hasActivePromo=(live.promotions||[]).some(p=>p.actif===true||p.actif===1);
    if(!hasActivePromo)document.querySelectorAll('a[href*="promotions"]').forEach(a=>{a.style.display='none';});

  }
  // Category filters work without relying on server-side query parameters.
  const selected=new URLSearchParams(location.search).get('cat')||'all';
  function filter(cat){document.querySelectorAll('.product-card-page[data-cat]').forEach(card=>card.hidden=cat!=='all'&&card.dataset.cat!==cat);document.querySelectorAll('.filter-btn').forEach(a=>a.classList.toggle('active',new URL(a.href).searchParams.get('cat')===cat));}
  filter(selected);
  document.querySelectorAll('.filter-btn').forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();const cat=new URL(a.href).searchParams.get('cat')||'all';history.replaceState(null,'',a.href);filter(cat);}));
 }catch(error){
  console.error('Erreur lors du chargement des éléments publics du site.',error);
  const loader=document.getElementById('productLoader');
  if(loader){
   loader.setAttribute('aria-busy','false');
   loader.innerHTML='<p>La fiche produit n’a pas pu être chargée. <a href="/produits.html">Retour aux produits</a></p>';
  }
 }
}
