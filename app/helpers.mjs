export const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const windows1252 = '€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ';
export const fixMojibake = value => {
  const text = String(value ?? '');
  if (!/[ÃÂâ][\u0080-\uFFFF]/.test(text)) return text;
  const byteChars = '[\\u0080-\\u00ff\\u0192\\u02c6\\u02dc\\u20ac\\u2018-\\u201a\\u201c-\\u201e\\u2020-\\u2022\\u2030\\u2122]';
  const pattern = new RegExp(`(?:[ÃÂ]${byteChars}|â${byteChars}{1,2})`, 'g');
  const repair = source => source.replace(pattern, match => {
    const bytes = [];
    for (const char of match) {
      const code = char.codePointAt(0);
      if (code <= 0xff) bytes.push(code);
      else {
        const index = windows1252.indexOf(char);
        if (index < 0) return match;
        bytes.push(index + 0x80);
      }
    }
    try {
      return new TextDecoder('utf-8', {fatal:true}).decode(new Uint8Array(bytes));
    } catch {
      return match;
    }
  });
  return repair(repair(text));
};
export const htmlspecialchars = e;
export const empty = x => x == null || x === false || x === '' || x === 0 || (Array.isArray(x) && !x.length);
export const count = x => x?.length ?? 0;
export const rawurlencode = encodeURIComponent;
export const file_exists = path => Boolean(path) && !String(path).includes('..');
export const format_prix = value => Number(value || 0).toLocaleString('fr-FR').replace(/\s/g, '.') + ' f';
export const format_date = value => value ? new Date(value).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric',timeZone:'Africa/Porto-Novo'}) : '—';
export const time_ago = format_date;
export const couleur_cat = s => ({corps:'linear-gradient(160deg,#E8F5E9,#C8E6C9)',visage:'linear-gradient(160deg,#E8EAF6,#C5CAE9)',deodorant:'linear-gradient(160deg,#FFF8E1,#FFE082)'}[s] ?? 'linear-gradient(160deg,#F5F0E8,#EDE8DF)');
export const icone_cat = s => ({corps:'ri-drop-line',visage:'ri-magic-line',deodorant:'ri-flask-line'}[s] ?? 'ri-leaf-line');
export const avatar_color = n => ['background:#E8F5E9;color:#1B5E20;','background:#E8EAF6;color:#1A237E;','background:#FFF8E1;color:#7A4A00;','background:#FCE4EC;color:#880E4F;','background:#E0F2F1;color:#00695C;'][(String(n).codePointAt(0)||0)%5];
export const nav_active = (a,b) => a===b ? 'active' : '';
export const date = () => String(new Date().getFullYear());
export const round = (x,n=0) => Math.round(x*10**n)/10**n;
export const array_filter = (a,fn=Boolean) => (a||[]).filter(fn);
export const array_column = (a,key) => (a||[]).map(x=>x[key]);
export const array_sum = a => a.reduce((s,x)=>s+Number(x),0);
export const array_merge = (...a) => a.flat();
export const array_map = (fn,a) => a.map(fn);
export const mb_substr = (s,start,length) => Array.from(String(s??'')).slice(start,length===undefined?undefined:start+length).join('');
export const substr = mb_substr;
export const mb_strlen = s => Array.from(String(s??'')).length;
export const strtoupper = s => String(s).toLocaleUpperCase('fr');
export const strtolower = s => String(s).toLocaleLowerCase('fr');
export const strpos = (s,q) => String(s).includes(q) ? String(s).indexOf(q) : false;
export const trim = s => String(s??'').trim();
export const explode = (sep,s) => String(s).split(sep);
export const nl2br = s => String(s).replace(/\n/g,'<br>');
export const addslashes = s => s;
export const preg_replace = (_,replacement,s) => String(s).replace(/\D/g,replacement);
export const json_encode = value => JSON.stringify(value).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
// Escape a value inserted inside an existing JavaScript string in an attribute/script.
export const js_string = value => String(value??'').replace(/&(?:quot|#0?39|amp|lt|gt);/g,c=>({'&quot;':'"','&#039;':"'",'&#39;':"'",'&amp;':'&','&lt;':'<','&gt;':'>'}[c])).replace(/[\\'"<>&\n\r\u2028\u2029]/g,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'));
export const get_youtube_id = url => String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)?.[1] ?? null;
let context = {};
export const setContext = ctx => {context=ctx;};
const schema = obj => json_encode({'@context':'https://schema.org',...obj});
export const schema_organisation = () => schema({'@type':'Organization',name:'Iboukoun Cosmetics',url:context.siteUrl,logo:context.siteUrl+'/assets/images/logo.jpg',contactPoint:{'@type':'ContactPoint',telephone:'+'+context.WA_NUMBER,contactType:'customer service',availableLanguage:'French'}});
export const schema_local_business = () => schema({'@type':'HealthAndBeautyBusiness',name:'Iboukoun Cosmetics',url:context.siteUrl,image:context.siteUrl+'/assets/images/hero.jpg',telephone:'+'+context.WA_NUMBER,address:{'@type':'PostalAddress',addressLocality:'Parakou',addressCountry:'BJ'}});
export const schema_faq = faqs => schema({'@type':'FAQPage',mainEntity:faqs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))});
export const schema_produit = p => schema({'@type':'Product',name:p.nom,description:p.description||'',image:p.image_url?(p.image_url.startsWith('/')?context.siteUrl+p.image_url:p.image_url):context.seo_img,brand:{'@type':'Brand',name:'Iboukoun Cosmetics'},offers:{'@type':'Offer',url:context.seo_url,price:p.prix_final??p.prix,priceCurrency:'XOF',availability:'https://schema.org/'+(p.stock>0?'InStock':'OutOfStock')}});
export const schema_breadcrumb = () => schema({'@type':'BreadcrumbList',itemListElement:[{name:'Accueil',url:context.siteUrl+'/'},{name:'Produits',url:context.siteUrl+'/produits.html'},{name:context.produit?.nom,url:context.seo_url}].map((x,i)=>({'@type':'ListItem',position:i+1,name:x.name,item:x.url}))});
