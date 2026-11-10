const $=s=>document.querySelector(s);
const config=await fetch('/site-config.json').then(r=>r.json());
let session=null,table='',page=0,total=0,rows=[],editing=null,refreshing=null;
const adminMenuToggle=$('#admin-menu-toggle');
const adminNavigation=$('#navigation');
const themeToggle=$('#theme-toggle');
function setAdminMenuOpen(open){
 adminMenuToggle.setAttribute('aria-expanded',String(open));
 adminNavigation.classList.toggle('is-open',open);
}
adminMenuToggle.addEventListener('click',()=>setAdminMenuOpen(adminMenuToggle.getAttribute('aria-expanded')!=='true'));
adminNavigation.addEventListener('click',event=>{
 if(event.target.closest('a'))setAdminMenuOpen(false);
});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&adminMenuToggle.getAttribute('aria-expanded')==='true'){
  setAdminMenuOpen(false);
  adminMenuToggle.focus();
 }
});
function applyAdminTheme(theme,persist=false){
 const dark=theme==='dark';
 document.documentElement.dataset.theme=dark?'dark':'light';
 themeToggle.setAttribute('aria-pressed',String(dark));
 themeToggle.setAttribute('aria-label',dark?'Activer le mode clair':'Activer le mode sombre');
 if(persist){
  try{localStorage.setItem('iboukoun-admin-theme',dark?'dark':'light');}
  catch{notify('Le thème est appliqué, mais ce navigateur ne permet pas de mémoriser ce choix.',true);}
 }
}
themeToggle.addEventListener('click',()=>applyAdminTheme(themeToggle.getAttribute('aria-pressed')==='true'?'light':'dark',true));
try{applyAdminTheme(localStorage.getItem('iboukoun-admin-theme')==='dark'?'dark':'light');}
catch{applyAdminTheme('light');}
const passwordInput=$('#admin-password');
$('.password-toggle').addEventListener('click',event=>{
 const button=event.currentTarget;
 const reveal=passwordInput.type==='password';
 passwordInput.type=reveal?'text':'password';
 button.setAttribute('aria-pressed',String(reveal));
 button.setAttribute('aria-label',reveal?'Masquer le mot de passe':'Afficher le mot de passe');
});
try{session=JSON.parse(sessionStorage.getItem('iboukoun-admin')||'null');}catch{}
const labels={nom:'Nom',slug:'Identifiant URL',categorie_id:'Catégorie',description:'Description',benefices:'Bénéfices (un par ligne)',prix:'Prix (FCFA)',stock:'Stock',actif:'Actif',image:'Image',photo:'Photo',fichier:'Photo de galerie',screenshot:'Capture d’avis',produit_id:'Fiche produit liée',titre:'Titre',prix_promo:'Prix promotionnel',min_unites:'Quantité minimum',date_debut:'Début',date_fin:'Fin',nom_client:'Nom du client',ville:'Ville',note:'Note',message:'Message',type:'Type',visible:'Visible',role:'Rôle',bio:'Biographie',ordre:'Ordre',is_principale:'Photo principale',legende:'Légende',youtube_url:'URL YouTube',youtube_id:'Identifiant YouTube',date_pub:'Date de publication',statut:'Statut',notes:'Notes internes',lu:'Lu',cle:'Paramètre',valeur:'Valeur',contenu:'Contenu',email:'Email',telephone:'WhatsApp',telephone_appel:'Téléphone d’appel',quartier:'Quartier',quantite:'Quantité',prix_unitaire:'Prix unitaire',prix_total:'Total',source:'Source',produit:'Produit',created_at:'Date',page:'Page',section:'Section',item_type:'Type de contenu',surtitre:'Petit titre',texte_final:'Phrase de conclusion'};
const specs={
 produits:{title:'Produits',fields:['categorie_id','nom','slug','description','benefices','prix','stock','image','actif'],list:['nom','categorie_id','prix','stock','actif']},
 categories:{title:'Catégories',fields:['nom','slug'],list:['nom','slug']},
 produit_photos:{title:'Galeries produits',fields:['produit_id','fichier','legende','ordre','is_principale'],list:['produit_id','fichier','legende','ordre','is_principale']},
 promotions:{title:'Promotions',fields:['produit_id','titre','description','prix_promo','min_unites','date_debut','date_fin','actif'],list:['titre','prix_promo','min_unites','date_fin','actif']},
 commandes_formulaire:{title:'Commandes',fields:['statut','notes'],list:['nom_client','telephone','telephone_appel','ville','quartier','produit_id','quantite','prix_unitaire','prix_total','statut','created_at'],noCreate:true},
 commandes_whatsapp:{title:'Clics WhatsApp',fields:['statut','notes'],list:['nom_client','produit','source','statut','created_at'],noCreate:true},
 revendeurs:{title:'Revendeurs',fields:['statut','notes'],list:['nom','ville','telephone','statut','created_at'],noCreate:true},
 messages:{title:'Messages',fields:['lu'],list:['nom','email','telephone','sujet','message','lu','created_at'],noCreate:true},
 temoignages:{title:'Témoignages',fields:['nom_client','ville','produit_id','note','message','screenshot','type','visible','ordre'],list:['nom_client','produit_id','message','screenshot','type','visible','ordre']},
 egeries:{title:'Égéries',fields:['nom','role','photo','ordre','actif'],list:['nom','role','photo','ordre','actif']},
 equipe:{title:'Équipe',fields:['nom','role','bio','photo','ordre','actif'],list:['nom','role','photo','ordre','actif']},
 videos:{title:'Vidéos',fields:['titre','youtube_url','date_pub','actif'],list:['titre','youtube_url','date_pub','actif']},
 pages_contenu:{title:'Contenus',fields:['slug','titre','contenu'],list:['slug','titre']},
 accueil_sections:{title:'Accueil — Packs et images',fields:['section','item_type','titre','description','surtitre','texte_final','image','produit_id','ordre','actif'],list:['section','item_type','titre','image','produit_id','ordre','actif']},
 parametres:{title:'Paramètres du site',fields:['cle','valeur'],list:['cle','valeur']},
 visites:{title:'Visites',fields:[],list:['page','created_at'],noCreate:true,readOnly:true}
};
specs.produits.fields.push('ordre','seo_title','seo_description');
specs.produits.list.push('image');
Object.assign(labels,{seo_title:'Titre SEO',seo_description:'Description SEO'});
const booleanFields=['actif','visible','is_principale','lu'];
const numberFields=['prix','stock','prix_promo','min_unites','ordre','note'];
const imageFields=['image','photo','fichier','screenshot'];
const mediaFolder=t=>t==='produit_photos'?'produits/photos':t==='temoignages'?'temoignages':t==='equipe'?'equipe':t==='egeries'?'egeries':t==='accueil_sections'?'accueil':'produits';
async function deleteMedia(t,record){
 const files=imageFields.map(key=>record?.[key]).filter(name=>typeof name==='string'&&/^sb_[a-z0-9_.-]+$/i.test(name));
 if(files.length)await api('/storage/v1/object/media',{method:'DELETE',body:JSON.stringify({prefixes:files.map(name=>mediaFolder(t)+'/'+name)})});
}
const textareas=['description','benefices','message','bio','notes','contenu'];
const statuses={commandes_formulaire:['nouveau','vu','contacte','termine'],commandes_whatsapp:['nouveau','en_cours','livre','annule'],revendeurs:['nouveau','contacte','actif','inactif']};
const pk=t=>t==='parametres'?'cle':t==='pages_contenu'?'slug':'id';
function notify(message,error=false){$('#notice').textContent=message;$('#notice').classList.toggle('error',error);}
function mediaUrl(key,value){
 if(typeof value!=='string'||!value.trim())return '';
 const path=value.trim();
 if(/^https?:\/\//i.test(path))return path;
 if(path.startsWith('/'))return path;
 if(/^assets\/images\/[a-z0-9_.-]+$/i.test(path))return '/'+path;
 const filename=path.split(/[\\/]/).pop();
 const siteImages=['equipe-iboukoun-cosmetics.png','aiselle-chic-application.png','resultat-sérums-clatants.png','duo-eclat.png','savon-antiseptique-creme.png','offre-special-gommant-creme.png'];
 if((/^temoignage\d*\.webp$/i.test(filename)||siteImages.includes(filename))&&['image','screenshot'].includes(key))return '/assets/images/'+encodeURIComponent(filename);
 if(/^sb_[a-z0-9_.-]+$/i.test(filename)){
  if(!config.supabaseUrl)return '';
  return config.supabaseUrl.replace(/\/$/,'')+'/storage/v1/object/public/media/'+mediaFolder(table)+'/'+encodeURIComponent(filename);
 }
 if(key==='image'&&table==='produits')return '/produit/'+encodeURIComponent(filename);
 const folders={produit_photos:'produits/photos',temoignages:'temoignages',equipe:'equipe',egeries:'egeries',accueil_sections:'accueil'};
 return '/uploads/'+(folders[table]||'produits')+'/'+filename.split('/').map(encodeURIComponent).join('/');
}
function imagePreview(key,value,alt){
 const src=mediaUrl(key,value);
 if(!src)return null;
 const image=element('img');image.className='admin-image-preview';image.src=src;image.alt=alt||labels[key]||'Image';image.loading='lazy';
 return image;
}
function saveSession(value){session=value;if(value)sessionStorage.setItem('iboukoun-admin',JSON.stringify(value));else sessionStorage.removeItem('iboukoun-admin');}
async function refresh(){
 if(!session)return;
 if(refreshing)return refreshing;
 refreshing=(async()=>{
  const r=await fetch(config.supabaseUrl+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:config.supabasePublicKey,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:session.refresh_token})});
  if(!r.ok){saveSession(null);throw new Error('Session expirée. Reconnectez-vous.');}const value=await r.json();saveSession({...value,expires_at:Date.now()+value.expires_in*1000});
 })();try{await refreshing;}finally{refreshing=null;}
}
async function api(path,options={}){
 if(!config.supabaseUrl||!config.supabasePublicKey)throw new Error('Renseignez site.config.json puis exécutez npm run build.');
 if(session&&session.expires_at<Date.now()+60000)await refresh();
 const headers={apikey:config.supabasePublicKey,Authorization:'Bearer '+session?.access_token,...options.headers};
 if(options.body&&!headers['Content-Type'])headers['Content-Type']='application/json';
 const r=await fetch(config.supabaseUrl+path,{...options,headers,signal:AbortSignal.timeout(20000)});
 if(!r.ok){if(r.status===401){saveSession(null);$('#workspace').hidden=true;$('#login').hidden=false;}throw new Error('Opération refusée ('+r.status+'). Vérifiez les droits, les valeurs et les relations entre les données.');}return r;
}
function element(tag,text){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;}
function button(label,fn,kind='secondary'){const n=element('button',label);n.type='button';n.className=kind;n.addEventListener('click',()=>Promise.resolve().then(fn).catch(e=>notify(e.message,true)));return n;}
async function authorize(){
 const allowed=await (await api('/rest/v1/rpc/is_admin',{method:'POST',body:'{}'})).json();
 if(!allowed){await logout();throw new Error('Ce compte n’est pas autorisé à administrer le site.');}
 $('#login').hidden=true;$('#workspace').hidden=false;$('#logout').hidden=false;
 const nav=$('#navigation');nav.replaceChildren();setAdminMenuOpen(false);
 for(const [id,title] of [['dashboard','Tableau de bord'],...Object.entries(specs).map(([id,s])=>[id,s.title]),['account','Mon compte']]){const a=element('a',title);a.href='#'+id;nav.append(a);}
 await navigate();
}
async function logout(){
 try{if(session)await api('/auth/v1/logout',{method:'POST'});}finally{saveSession(null);$('#login').hidden=false;$('#workspace').hidden=true;$('#logout').hidden=true;$('#content').replaceChildren();$('#fields').replaceChildren();if($('#editor').open)$('#editor').close();}
}
$('#logout').addEventListener('click',()=>logout().catch(e=>notify(e.message,true)));
const loginAttemptsKey='iboukoun-admin-login-attempts';
function loginAttempts(){
 const raw=localStorage.getItem(loginAttemptsKey);
 if(!raw)return {failures:0,lockedUntil:0};
 const state=JSON.parse(raw);
 if(!Number.isInteger(state.failures)||!Number.isFinite(state.lockedUntil))throw new Error('La protection des connexions est indisponible dans ce navigateur.');
 if(state.lockedUntil&&state.lockedUntil<=Date.now()){localStorage.removeItem(loginAttemptsKey);return {failures:0,lockedUntil:0};}
 return state;
}
function recordLoginFailure(){
 const state=loginAttempts();
 const failures=state.failures+1;
 const lockedUntil=failures>=5?Date.now()+15*60*1000:0;
 localStorage.setItem(loginAttemptsKey,JSON.stringify({failures,lockedUntil}));
 return {failures,lockedUntil};
}
$('#login-form').addEventListener('submit',async ev=>{
 ev.preventDefault();const btn=ev.target.querySelector('button');btn.disabled=true;
 try{
  const state=loginAttempts();
  if(state.lockedUntil>Date.now())throw new Error('Trop de tentatives. Réessayez dans '+Math.ceil((state.lockedUntil-Date.now())/60000)+' minute(s).');
  if(!config.supabaseUrl||!config.supabasePublicKey)throw new Error('La connexion à l’espace administrateur est momentanément indisponible.');
  const fields=Object.fromEntries(new FormData(ev.target));
  const r=await fetch(config.supabaseUrl+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:config.supabasePublicKey,'Content-Type':'application/json'},body:JSON.stringify(fields),signal:AbortSignal.timeout(20000)});
  if(!r.ok){
   const attempt=recordLoginFailure();
   if(attempt.lockedUntil>Date.now())throw new Error('Trop de tentatives. Réessayez dans 15 minutes.');
   throw new Error(r.status===429?'Trop de tentatives. Réessayez plus tard.':'Connexion refusée. Vérifiez votre email et votre mot de passe.');
  }
  localStorage.removeItem(loginAttemptsKey);
  const value=await r.json();saveSession({...value,expires_at:Date.now()+value.expires_in*1000});ev.target.reset();await authorize();notify('Connecté.');
 }catch(e){notify(e.message,true);}finally{btn.disabled=false;}
});
const svgNode=(tag,attrs={})=>{const node=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));return node;};
const localDay=value=>new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Porto-Novo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));
async function tableCount(table,filter=''){
 const response=await api('/rest/v1/'+table+'?select=id'+filter,{method:'HEAD',headers:{Prefer:'count=exact',Range:'0-0'}});
 return Number(response.headers.get('content-range')?.split('/')[1]||0);
}
async function dashboard(){
 const content=$('#content');content.replaceChildren();
 content.classList.add('dashboard-content');
 const todayKey=localDay(Date.now());
 const today=new Date(todayKey+'T00:00:00Z');
 const start=new Date(today);start.setUTCDate(start.getUTCDate()-29);
 const visitParams=new URLSearchParams({select:'page,created_at',created_at:'gte.'+start.toISOString(),order:'created_at.asc'});
 const visitsPromise=(async()=>{
  const all=[];
  for(let offset=0;;offset+=1000){
   const batch=await(await api('/rest/v1/visites?'+visitParams,{headers:{Range:`${offset}-${offset+999}`}})).json();
   all.push(...batch);
   if(batch.length<1000)break;
  }
  return all;
 })();
 const [visits,orders,products]=await Promise.all([
  visitsPromise,
  tableCount('commandes_formulaire','&statut=eq.nouveau'),
  tableCount('produits','&actif=eq.true')
 ]);
 const weekStart=new Date(today);weekStart.setUTCDate(weekStart.getUTCDate()-((weekStart.getUTCDay()+6)%7));
 const weekStartKey=weekStart.toISOString().slice(0,10);
 const dayCounts=new Map();
 const pages=new Map();
 let todayCount=0,weekCount=0;
 for(const visit of visits){
  const key=localDay(visit.created_at);
  if(key===todayKey)todayCount++;
  if(key>=weekStartKey&&key<=todayKey)weekCount++;
  dayCounts.set(key,(dayCounts.get(key)||0)+1);
  const path=visit.page||'/';
  pages.set(path,(pages.get(path)||0)+1);
 }
 const lastSeven=Array.from({length:7},(_,index)=>{
  const date=new Date(today);date.setUTCDate(date.getUTCDate()-6+index);
  const key=date.toISOString().slice(0,10);
  const label=new Intl.DateTimeFormat('fr-FR',{weekday:'short',timeZone:'UTC'}).format(date).replace('.','');
  return {key,label,value:dayCounts.get(key)||0};
 });
 const stats=element('div');stats.className='dashboard-stats';
 for(const [label,value,detail,accent] of [
  ['Visites aujourd’hui',todayCount,'Pages consultées', 'green'],
  ['Visites cette semaine',weekCount,'Depuis lundi', 'blue'],
  ['Commandes à traiter',orders,'Nouvelles commandes', 'orange'],
  ['Produits en ligne',products,'Catalogue actif', 'violet']
 ]){
  const card=element('article');card.className='dashboard-stat '+accent;
  card.append(element('span',label),element('strong',value.toLocaleString('fr-FR')),element('small',detail));
  stats.append(card);
 }
 const charts=element('div');charts.className='dashboard-charts';
 const dailyPanel=element('section');dailyPanel.className='dashboard-panel';
 const dailyTitle=element('h2','Visites par jour');
 dailyPanel.append(dailyTitle,element('p','Évolution des sept derniers jours'));
 const bar=svgNode('svg',{viewBox:'0 0 720 240',role:'img','aria-label':'Visites enregistrées chaque jour sur les sept derniers jours'});
 const max=Math.max(1,...lastSeven.map(item=>item.value));
 const chartTop=22,chartBottom=182,chartHeight=chartBottom-chartTop,chartLeft=48,slot=94,barWidth=38;
 for(let row=0;row<4;row++){
  const y=chartTop+chartHeight*row/3;
  bar.append(svgNode('line',{x1:chartLeft,y1:y,x2:700,y2:y,class:'chart-grid-line'}));
  const scaleLabel=Math.round(max*(1-row/3));
  const text=svgNode('text',{x:chartLeft-10,y:y+4,'text-anchor':'end',class:'chart-axis-label'});
  text.textContent=String(scaleLabel);bar.append(text);
 }
 lastSeven.forEach((item,index)=>{
  const height=item.value?Math.max(3,chartHeight*item.value/max):0;
  const x=chartLeft+15+index*slot;
  const rect=svgNode('rect',{x,y:chartBottom-height,width:barWidth,height,rx:9,class:'chart-bar'});
  const tip=svgNode('title');tip.textContent=`${item.label} : ${item.value} visite(s)`;rect.append(tip);bar.append(rect);
  const value=svgNode('text',{x:x+barWidth/2,y:Math.max(chartTop-2,chartBottom-height-8),'text-anchor':'middle',class:'chart-value'});
  value.textContent=String(item.value);bar.append(value);
  const label=svgNode('text',{x:x+barWidth/2,y:chartBottom+26,'text-anchor':'middle',class:'chart-axis-label'});
  label.textContent=item.label;bar.append(label);
 });
 dailyPanel.append(bar);
 const pagePanel=element('section');pagePanel.className='dashboard-panel';
 pagePanel.append(element('h2','Pages les plus consultées'),element('p','Répartition du trafic sur les 30 derniers jours'));
 const ranked=[...pages.entries()].sort((a,b)=>b[1]-a[1]);
 const topPages=ranked.slice(0,5).map(([path,value])=>({path,value}));
 if(ranked.length>5)topPages.push({path:'Autres pages',value:ranked.slice(5).reduce((sum,item)=>sum+item[1],0)});
 const total=topPages.reduce((sum,item)=>sum+item.value,0);
 const donut=svgNode('svg',{viewBox:'0 0 120 120',role:'img','aria-label':'Répartition des visites par page'});
 const palette=['#26a269','#4285f4','#f39b38','#9167d9','#e65a7a','#9ba6b7'];
 const circumference=2*Math.PI*39;
 let offset=0;
 if(total){
  topPages.forEach((item,index)=>{
   const length=item.value/total*circumference;
   donut.append(svgNode('circle',{cx:60,cy:60,r:39,fill:'none',stroke:palette[index%palette.length],'stroke-width':17,'stroke-dasharray':`${length} ${circumference-length}`,'stroke-dashoffset':-offset,transform:'rotate(-90 60 60)'}));
   offset+=length;
  });
 }else donut.append(svgNode('circle',{cx:60,cy:60,r:39,fill:'none',stroke:'#e9edf3','stroke-width':17}));
 const donutCenter=svgNode('text',{x:60,y:57,'text-anchor':'middle',class:'donut-total'});donutCenter.textContent=String(total);donut.append(donutCenter);
 const donutCaption=svgNode('text',{x:60,y:72,'text-anchor':'middle',class:'donut-caption'});donutCaption.textContent='visites';donut.append(donutCaption);
 const breakdown=element('div');breakdown.className='dashboard-breakdown';
 const legend=element('div');legend.className='dashboard-legend';
 topPages.forEach((item,index)=>{
  const row=element('div');row.className='dashboard-legend-row';
  const swatch=element('span');swatch.className='legend-swatch';swatch.style.backgroundColor=palette[index%palette.length];
  const pageName=element('span',item.path==='/'?'Accueil':item.path);
  const count=element('strong',item.value.toLocaleString('fr-FR'));
  row.append(swatch,pageName,count);legend.append(row);
 });
 breakdown.append(donut,legend);pagePanel.append(breakdown);
 charts.append(dailyPanel,pagePanel);
 const empty=element('p','Aucune visite enregistrée sur cette période. Les graphiques se rempliront dès les prochaines consultations du site.');
 empty.className='dashboard-empty';
 content.append(stats,charts);
 if(!visits.length)content.append(empty);
}
let searchTimer;
$('#search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{page=0;load().catch(e=>notify(e.message,true));},300);});
function query(){
 const params=new URLSearchParams({select:'*',order:pk(table)==='id'?'id.desc':pk(table)+'.asc'});
 const q=$('#search').value.replace(/[^\p{L}\p{N}\s@+_-]/gu,'').trim();
 if(q){const fields=specs[table].list.filter(f=>['nom','nom_client','ville','telephone','titre','message','sujet','slug','cle','page'].includes(f));if(fields.length)params.set('or','('+fields.map(f=>f+'.ilike.*'+q+'*').join(',')+')');}
 return params.toString();
}
async function load(){
 $('#content').classList.remove('dashboard-content');
 const current=table;
 const r=await api('/rest/v1/'+table+'?'+query(),{headers:{Prefer:'count=exact',Range:`${page*25}-${page*25+24}`}});
 const data=await r.json();if(current!==table)return;rows=data;total=Number(r.headers.get('content-range')?.split('/')[1]||rows.length);
 const referenceNames=new Map();
 if(table==='produits'){
  const categories=await(await api('/rest/v1/categories?select=id,nom&order=nom')).json();
  for(const category of categories)referenceNames.set(String(category.id),category.nom);
 }else if(table==='temoignages'){
  const products=await(await api('/rest/v1/produits?select=id,nom&order=nom')).json();
  for(const product of products)referenceNames.set(String(product.id),product.nom);
 }
 if(current!==table)return;
 const grid=element('table'),head=element('tr');for(const key of specs[table].list)head.append(element('th',labels[key]||key));if(!specs[table].readOnly)head.append(element('th','Actions'));const thead=element('thead');thead.append(head);grid.append(thead);const tbody=element('tbody');grid.append(tbody);
 for(const row of rows){const tr=element('tr');for(const key of specs[table].list){const val=row[key],cell=element('td');if(imageFields.includes(key)&&val){cell.classList.add('media-cell');const preview=imagePreview(key,val,labels[key]||key);if(preview)cell.append(preview);cell.append(element('span',val));}else if(['categorie_id','produit_id'].includes(key)&&referenceNames.has(String(val)))cell.textContent=referenceNames.get(String(val));else cell.textContent=typeof val==='boolean'?(val?'Oui':'Non'):val??'—';tr.append(cell);}
  if(!specs[table].readOnly){const cell=element('td');cell.append(button('Modifier',()=>edit(row)));cell.append(button('Supprimer',async()=>{
   if(!confirm('Supprimer cet enregistrement ?'))return;
   let gallery=[];
   if(table==='produits')gallery=await(await api('/rest/v1/produit_photos?select=fichier&produit_id=eq.'+row.id)).json();
   await api('/rest/v1/'+table+'?'+pk(table)+'=eq.'+encodeURIComponent(row[pk(table)]),{method:'DELETE'});
   try{await deleteMedia(table,row);for(const photo of gallery)await deleteMedia('produit_photos',photo);}
   catch{await load();notify('Enregistrement supprimé. La suppression de certaines images Storage a échoué ; vérifiez le bucket media.',true);return;}
   await load();notify('Enregistrement supprimé.');
  },'danger'));tr.append(cell);}tbody.append(tr);
 }
 $('#content').replaceChildren(rows.length?grid:element('p','Aucun enregistrement.'));
 $('#pagination').replaceChildren();const previous=button('Précédent',async()=>{page--;await load();});previous.disabled=page===0;const next=button('Suivant',async()=>{page++;await load();});next.disabled=(page+1)*25>=total;$('#pagination').append(previous,element('span',`${total} résultat(s) · Page ${page+1}`),next);
}
async function navigate(){
 table=location.hash.slice(1)||'dashboard';if(!specs[table]&&!['dashboard','account'].includes(table))table='dashboard';page=0;
 $('#title').textContent=specs[table]?.title||(table==='account'?'Mon compte':'Tableau de bord');$('#toolbar').hidden=!specs[table];$('#pagination').replaceChildren();$('#search').value='';
 $('#create').hidden=specs[table]?.noCreate||false;
 document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+table));
 if(table==='dashboard')await dashboard();else if(table==='account')account();else await load();
}
window.addEventListener('hashchange',()=>{if(session)navigate().catch(e=>notify(e.message,true));});
$('#create').addEventListener('click',()=>edit(null).catch(e=>notify(e.message,true)));
$('#cancel').addEventListener('click',()=>$('#editor').close());
async function edit(row){
 editing=row;$('#editor-title').textContent=(row?'Modifier — ':'Ajouter — ')+specs[table].title;$('#fields').replaceChildren();
 let products=[],categories=[];
 if(specs[table].fields.includes('produit_id'))products=await (await api('/rest/v1/produits?select=id,nom&order=nom')).json();
 if(specs[table].fields.includes('categorie_id'))categories=await (await api('/rest/v1/categories?select=id,nom&order=nom')).json();
 const fieldLabels=new Map();
 for(const key of specs[table].fields){
  const label=element('label',labels[key]||key);let input;
  const choices=key==='statut'?statuses[table]:key==='type'?['texte','screenshot']:key==='section'&&table==='accueil_sections'?['packs','mission','resultats']:key==='item_type'&&table==='accueil_sections'?['pack','texte','image']:key==='cle'?['whatsapp_number','facebook_url','instagram_url','tiktok_url','adresse','email_contact','horaires','site_nom','site_slogan']:null;
  if(choices||['produit_id','categorie_id'].includes(key)){
   input=element('select');if(key==='produit_id'&&['temoignages','accueil_sections'].includes(table)){const empty=element('option',table==='temoignages'?'Tous les produits':'Aucune fiche liée');empty.value='';input.append(empty);}
   for(const item of choices||(key==='produit_id'?products:categories)){const option=element('option',typeof item==='string'?item:item.nom);option.value=typeof item==='string'?item:item.id;input.append(option);}
  }else if(textareas.includes(key))input=element('textarea');
  else{input=element('input');input.type=booleanFields.includes(key)?'checkbox':numberFields.includes(key)?'number':key.startsWith('date_')?'date':key==='youtube_url'?'url':'text';if(numberFields.includes(key)){input.min=['prix_promo','min_unites','note'].includes(key)?'1':'0';if(key==='note')input.max='5';}}
  input.name=key;
  if(input.type==='checkbox')input.checked=row?Boolean(row[key]):['actif','visible'].includes(key);
  else input.value=row?.[key]??({stock:0,ordre:0,note:5,min_unites:10}[key]??input.value??'');
  if(row&&key===pk(table))input.disabled=true;
  if(['nom','slug','titre','nom_client','categorie_id','prix','prix_promo','min_unites'].includes(key))input.required=!(table==='temoignages'&&key==='nom_client'&&(row?.type==='screenshot'));
  label.append(input);
  if(imageFields.includes(key)){
   const current=imagePreview(key,row?.[key],labels[key]||key);
   if(current){
    const preview=element('div');preview.className='admin-image-current';preview.append(current,element('span',row[key]));
    const remove=button('Retirer du site',()=>{
     const value=label.querySelector(`input[name="${key}"]`);
     if(value)value.value='';
     upload.value='';
     preview.hidden=true;
    },'danger');
    remove.setAttribute('aria-label','Retirer cette image du site');
    preview.append(remove);label.append(preview);
   }
   const upload=element('input');upload.type='file';upload.accept='image/jpeg,image/png,image/webp';upload.dataset.for=key;
   upload.addEventListener('change',()=>{if(upload.files[0])input.value=upload.files[0].name;});
   label.append(upload);
   label.append(element('small','JPG, PNG ou WebP, 5 Mo maximum.'));
  }
  fieldLabels.set(key,label);
  $('#fields').append(label);
 }
 if(table==='temoignages'){
  const type=$('#fields [name="type"]');
  const updateFields=()=>{
   const screenshot=type.value==='screenshot';
   for(const key of ['nom_client','ville','note','message']){
    const label=fieldLabels.get(key),input=label?.querySelector(`[name="${key}"]`);
    if(label)label.hidden=screenshot;
    if(input){input.required=!screenshot;if(screenshot)input.value='';}
   }
   const screenshotInput=fieldLabels.get('screenshot')?.querySelector('[name="screenshot"]');
   if(screenshotInput)screenshotInput.required=screenshot;
  };
  type.addEventListener('change',updateFields);
  updateFields();
 }
 $('#editor').showModal();
}
async function upload(file,key){
 if(file.size>5242880||!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Image invalide : JPG, PNG ou WebP, maximum 5 Mo.');
 const bitmap=await createImageBitmap(file);if(bitmap.width>12000||bitmap.height>12000){bitmap.close();throw new Error('Dimensions d’image trop grandes.');}bitmap.close();
 const folder=mediaFolder(table);
 const filename='sb_'+crypto.randomUUID()+'.'+({'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[file.type]);
 await api('/storage/v1/object/media/'+folder+'/'+filename,{method:'POST',headers:{'Content-Type':file.type,'x-upsert':'false'},body:file});
 return filename;
}
$('#edit-form').addEventListener('submit',async ev=>{
 ev.preventDefault();const btn=ev.target.querySelector('[type="submit"]');btn.disabled=true;
 const uploaded=[];let saved=false;
 try{
  const values=Object.fromEntries(new FormData(ev.target));
  if(table==='temoignages'&&values.type==='screenshot'){
   if(!values.screenshot)throw new Error('Choisissez une capture d’écran pour ce témoignage.');
   for(const key of ['nom_client','ville','message'])values[key]=null;
   values.note=null;
  }
  for(const key of booleanFields)if(specs[table].fields.includes(key))values[key]=ev.target.elements[key].checked;
  for(const key of [...numberFields,'produit_id','categorie_id'])if(key in values)values[key]=values[key]===null||values[key]===''?null:Number(values[key]);
  for(const key of ['date_debut','date_fin','date_pub'])if(values[key]==='')values[key]=null;
  if(table==='videos'){const id=values.youtube_url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)?.[1];if(!id)throw new Error('URL YouTube invalide.');values.youtube_id=id;}
  if(table==='parametres'&&/_url$/.test(values.cle||editing?.cle)&&values.valeur&&!/^https:\/\//.test(values.valeur))throw new Error('Utilisez une URL HTTPS.');
  for(const input of ev.target.querySelectorAll('input[type="file"]'))if(input.files[0]){values[input.dataset.for]=await upload(input.files[0],input.dataset.for);uploaded.push({[input.dataset.for]:values[input.dataset.for]});}
  const update=editing?'?'+pk(table)+'=eq.'+encodeURIComponent(editing[pk(table)]):'';
  if(table==='produit_photos'&&values.is_principale){
   await api('/rest/v1/rpc/save_product_photo',{method:'POST',body:JSON.stringify({photo_id:editing?.id??null,payload:values})});
  }else await api('/rest/v1/'+table+update,{method:editing?'PATCH':'POST',body:JSON.stringify(values),headers:{Prefer:'return=minimal'}});
  saved=true;
  if(editing)for(const key of imageFields)if(key in values&&editing[key]&&editing[key]!==values[key])try{await deleteMedia(table,{[key]:editing[key]});}catch{notify('Enregistré, mais l’ancienne image doit être retirée manuellement du bucket media.',true);$('#editor').close();await load();return;}
  $('#editor').close();await load();notify('Enregistré. Le site affiche les changements au prochain chargement. Relancez la génération et publiez dist/ pour actualiser le HTML indexable et les nouvelles URL.');
 }catch(e){if(!saved)for(const record of uploaded)try{await deleteMedia(table,record);}catch{}notify(e.message,true);}finally{btn.disabled=false;}
});
$('#export').addEventListener('click',async()=>{
 try{
  const all=[];for(let offset=0;;offset+=1000){const batch=await(await api('/rest/v1/'+table+'?'+query(),{headers:{Range:`${offset}-${offset+999}`}})).json();all.push(...batch);if(batch.length<1000)break;}
  const keys=all[0]?Object.keys(all[0]):specs[table].list;
  const cell=x=>{let s=String(x??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};
  const csv='\uFEFF'+[keys,...all.map(r=>keys.map(k=>r[k]))].map(row=>row.map(cell).join(';')).join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=element('a');a.href=url;a.download=table+'-'+new Date().toISOString().slice(0,10)+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Export téléchargé.');
 }catch(e){notify(e.message,true);}
});
function account(){
 const form=element('form');form.append(element('p','Changer le mot de passe de votre compte administrateur.'));
 const current=element('input');current.type='password';current.autocomplete='current-password';current.placeholder='Mot de passe actuel';current.required=true;
 const next=element('input');next.type='password';next.minLength=8;next.autocomplete='new-password';next.placeholder='Nouveau mot de passe (8 caractères minimum)';next.required=true;
 const submit=element('button','Changer le mot de passe');submit.type='submit';form.append(current,next,submit);
 form.addEventListener('submit',async ev=>{ev.preventDefault();submit.disabled=true;try{
  const user=await(await api('/auth/v1/user')).json();
  const r=await fetch(config.supabaseUrl+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:config.supabasePublicKey,'Content-Type':'application/json'},body:JSON.stringify({email:user.email,password:current.value})});
  if(!r.ok)throw new Error('Mot de passe actuel incorrect.');
  const fresh=await r.json();saveSession({...fresh,expires_at:Date.now()+fresh.expires_in*1000});
  await api('/auth/v1/user',{method:'PUT',body:JSON.stringify({password:next.value})});form.reset();notify('Mot de passe modifié.');
 }catch(e){notify(e.message,true);}finally{submit.disabled=false;}});
 $('#content').replaceChildren(form);
}
if(session)try{await authorize();}catch(e){notify(e.message,true);}
