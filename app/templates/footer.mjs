import * as helpers from "../helpers.mjs";
export function render(ctx) {
var out="";
var {BASE_URL,GSC_VERIFICATION_CODE,UPLOAD_PATH,UPLOAD_URL_EGERIES,UPLOAD_URL_EQUIPE,UPLOAD_URL_PRODUITS,UPLOAD_URL_TEMOIGNAGES,WA_NUMBER,cat_filtre,categories,egeries,equipe,faqs,fondateur,img_principale,nb_clients,nb_produits,nb_revendeurs,note_moy,page,page_active,params,photos,produit,produits,promo_active,promo_nav,promos,screenshots,seo,seo_desc,seo_img,seo_title,seo_url,similaires,temos,temos_texte,total_avi,videos,wa_number}=ctx;
var {e,htmlspecialchars,empty,count,file_exists,rawurlencode,format_prix,format_date,time_ago,couleur_cat,icone_cat,avatar_color,nav_active,date,round,array_filter,array_column,array_sum,array_merge,array_map,mb_substr,mb_strlen,substr,strtoupper,strtolower,strpos,trim,explode,nl2br,addslashes,preg_replace,json_encode,get_youtube_id,js_string,schema_organisation,schema_local_business,schema_faq,schema_produit,schema_breadcrumb}=helpers;

out += "";

out += "\n\n<footer class=\"main-footer\">\n  <div class=\"footer-top\">\n    <div class=\"container\">\n      <div class=\"footer-grid\">\n\n        <div class=\"footer-brand\">\n          <a href=\"";
out += (BASE_URL) ?? "";
out += "index.php\" class=\"footer-logo\">\n            <img src=\"";
out += (BASE_URL) ?? "";
out += "assets/images/logo.jpg\" alt=\"Iboukoun Cosmetics\">\n            <div class=\"footer-logo-text\">\n              <span class=\"footer-brand-name\">Iboukoun Cosmetics</span>\n              <span class=\"footer-brand-tag\">Naturellement vous</span>\n            </div>\n          </a>\n          <p class=\"footer-tagline\">\n            Des soins conçus pour révéler votre beauté naturelle — formulés avec soin à Parakou, au cœur du Bénin.\n          </p>\n          <div class=\"social-row\">\n            ";
if (!empty(params["facebook_url"])) {
out += "\n            <a class=\"social-icon\" href=\"";
out += (e(params["facebook_url"])) ?? "";
out += "\" target=\"_blank\" aria-label=\"Facebook\">\n              <i class=\"ri-facebook-fill\"></i>\n            </a>\n            ";
}
out += "\n            <a class=\"social-icon\" href=\"https://wa.me/";
out += (e(wa_number)) ?? "";
out += "\" target=\"_blank\" aria-label=\"WhatsApp\">\n              <i class=\"ri-whatsapp-line\"></i>\n            </a>\n            ";
if (!empty(params["instagram_url"])) {
out += "\n            <a class=\"social-icon\" href=\"";
out += (e(params["instagram_url"])) ?? "";
out += "\" target=\"_blank\" aria-label=\"Instagram\">\n              <i class=\"ri-instagram-line\"></i>\n            </a>\n            ";
}
out += "\n            ";
if (!empty(params["tiktok_url"])) {
out += "\n            <a class=\"social-icon\" href=\"";
out += (e(params["tiktok_url"])) ?? "";
out += "\" target=\"_blank\" aria-label=\"TikTok\">\n              <i class=\"ri-tiktok-line\"></i>\n            </a>\n            ";
}
out += "\n          </div>\n        </div>\n\n        <div class=\"footer-col\">\n  <h4>Explorer</h4>\n  <ul>\n    <li><a href=\"";
out += (BASE_URL) ?? "";
out += "produits.php\" title=\"Voir tous les soins naturels Iboukoun Cosmetics\">\n      <i class=\"ri-arrow-right-s-line\"></i>Nos produits</a></li>\n    <li><a href=\"";
out += (BASE_URL) ?? "";
out += "produits.php?cat=deodorant\" title=\"Déodorant naturel sans aluminium Bénin\">\n      <i class=\"ri-arrow-right-s-line\"></i>Déodorant naturel</a></li>\n    <li><a href=\"";
out += (BASE_URL) ?? "";
out += "produits.php?cat=corps\" title=\"Savon gommant peau africaine Bénin\">\n      <i class=\"ri-arrow-right-s-line\"></i>Savon gommant</a></li>\n    <li><a href=\"";
out += (BASE_URL) ?? "";
out += "produits.php?cat=visage\" title=\"Sérum anti-tache visage naturel Bénin\">\n      <i class=\"ri-arrow-right-s-line\"></i>Sérum visage</a></li>\n    <li><a href=\"";
out += (BASE_URL) ?? "";
out += "promotions.php\" title=\"Promotions et offres spéciales Iboukoun Cosmetics\">\n      <i class=\"ri-arrow-right-s-line\"></i>Promotions</a></li>\n    <li><a href=\"";
out += (BASE_URL) ?? "";
out += "temoignages.php\" title=\"Avis clients Iboukoun Cosmetics Bénin\">\n      <i class=\"ri-arrow-right-s-line\"></i>Témoignages</a></li>\n    <li><a href=\"";
out += (BASE_URL) ?? "";
out += "egeries.php\" title=\"Ambassadeurs Iboukoun Cosmetics\">\n      <i class=\"ri-arrow-right-s-line\"></i>Nos égéries</a></li>\n      <li><a href=\"";
out += (BASE_URL) ?? "";
out += "produits.php\" \n          title=\"Soins naturels Parakou Bénin\">\n          <i class=\"ri-arrow-right-s-line\"></i>Soins à Parakou</a></li>\n      <li><a href=\"";
out += (BASE_URL) ?? "";
out += "produits.php\" \n       title=\"Cosmétiques naturels Cotonou livraison\">\n      <i class=\"ri-arrow-right-s-line\"></i>Livraison à Cotonou</a></li>\n  </ul>\n</div>\n\n        <div class=\"footer-col\">\n          <h4>Informations</h4>\n          <ul>\n            <li><a href=\"";
out += (BASE_URL) ?? "";
out += "revendeurs.php\"><i class=\"ri-arrow-right-s-line\"></i>Devenir revendeur</a></li>\n            <li><a href=\"";
out += (BASE_URL) ?? "";
out += "contact.php\"><i class=\"ri-arrow-right-s-line\"></i>Contactez-nous</a></li>\n          </ul>\n        </div>\n\n        <div class=\"footer-col\">\n          <h4>Contact</h4>\n          <div class=\"footer-contact-items\">\n            <div class=\"footer-contact-item\">\n              <i class=\"ri-whatsapp-line\"></i>\n              <a href=\"https://wa.me/";
out += (e(wa_number)) ?? "";
out += "\" target=\"_blank\">+";
out += (e(wa_number)) ?? "";
out += "</a>\n            </div>\n            ";
if (!empty(params["adresse"])) {
out += "\n            <div class=\"footer-contact-item\">\n              <i class=\"ri-map-pin-2-line\"></i>\n              <span>";
out += (e(params["adresse"])) ?? "";
out += "</span>\n            </div>\n            <div class=\"footer-contact-item\">\n              <i class=\"ri-map-pin-line\"></i>\n              <span>Livraison à Cotonou, Porto-Novo, Calavi et partout au Bénin</span>\n            </div>\n            ";
}
out += "\n            ";
if (!empty(params["email_contact"])) {
out += "\n            <div class=\"footer-contact-item\">\n              <i class=\"ri-mail-line\"></i>\n              <a href=\"mailto:";
out += (e(params["email_contact"])) ?? "";
out += "\">";
out += (e(params["email_contact"])) ?? "";
out += "</a>\n            </div>\n            ";
}
out += "\n            ";
if (!empty(params["horaires"])) {
out += "\n            <div class=\"footer-contact-item\">\n              <i class=\"ri-time-line\"></i>\n              <span>";
out += (e(params["horaires"])) ?? "";
out += "</span>\n            </div>\n            ";
}
out += "\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n  <div class=\"footer-bottom\">\n    <div class=\"container\">\n      <div class=\"footer-bottom-inner\">\n        <p>© ";
out += (date("Y")) ?? "";
out += " Iboukoun Cosmetics — Tous droits réservés</p>\n        <div class=\"footer-legal\">\n          <a href=\"";
out += (BASE_URL) ?? "";
out += "contact.php\">Mentions légales</a>\n          <a href=\"";
out += (BASE_URL) ?? "";
out += "contact.php\">Confidentialité</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</footer>\n\n<!-- WA Flottant -->\n<div class=\"wa-float\">\n  <div class=\"wa-float-label\">Commander sur WhatsApp</div>\n  <a class=\"wa-float-btn\"\n     href=\"https://wa.me/";
out += (e(wa_number)) ?? "";
out += "?text=";
out += (rawurlencode("Bonjour, je veux commander !")) ?? "";
out += "\"\n     target=\"_blank\" rel=\"noopener\"\n     onclick=\"logWA('','bouton_flottant')\">\n    <i class=\"ri-whatsapp-line\"></i>\n    <div class=\"wa-pulse\"></div>\n  </a>\n</div>\n\n<script>\n(function(){\n  var els=document.querySelectorAll('.reveal');\n  if(!els.length)return;\n  var obs=new IntersectionObserver(function(entries){\n    entries.forEach(function(e){\n      if(e.isIntersecting){\n        e.target.classList.add('visible');\n        obs.unobserve(e.target);\n      }\n    });\n  },{threshold:0.1});\n  els.forEach(function(el){obs.observe(el);});\n})();\n\nfunction logWA(produit,source){\n  fetch('";
out += (js_string(BASE_URL)) ?? "";
out += "api/log_whatsapp.php',{\n    method:'POST',\n    headers:{'Content-Type':'application/json'},\n    body:JSON.stringify({nom_client:'',produit:produit||'',source:source||'inconnu'})\n  }).catch(function(){});\n}\n\nfunction orderWA(produitNom,source){\n  logWA(produitNom,source||'fiche_produit');\n  var msg='Bonjour, je souhaite commander : *'+produitNom+'* 🌿';\n  window.open('https://wa.me/";
out += (js_string(e(wa_number))) ?? "";
out += "?text='+encodeURIComponent(msg),'_blank');\n}\n\ndocument.querySelectorAll('.faq-question').forEach(function(btn){\n  btn.addEventListener('click',function(){\n    var item=btn.closest('.faq-item');\n    var isOpen=item.classList.contains('open');\n    document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open');});\n    if(!isOpen)item.classList.add('open');\n  });\n});\n</script>\n\n<style>\nfooter.main-footer{background:var(--navy-dark);}\n.footer-top{padding:72px 0 56px;}\n.footer-grid{\n  display:grid;grid-template-columns:2fr 1fr 1fr 1.4fr;\n  gap:56px;\n}\n.footer-logo{display:flex;align-items:center;gap:12px;margin-bottom:18px;text-decoration:none;}\n.footer-logo img{height:46px;width:auto;object-fit:contain;border-radius:8px;}\n.footer-logo-text{display:flex;flex-direction:column;line-height:1.2;}\n.footer-brand-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#fff;}\n.footer-brand-tag{font-size:9px;color:rgba(255,255,255,.4);letter-spacing:1.8px;text-transform:uppercase;}\n.footer-tagline{font-size:13px;color:rgba(255,255,255,.5);line-height:1.7;margin-bottom:24px;max-width:260px;}\n.social-row{display:flex;gap:10px;}\n.social-icon{\n  width:40px;height:40px;border-radius:50%;\n  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);\n  display:flex;align-items:center;justify-content:center;\n  transition:all .2s;\n}\n.social-icon:hover{background:var(--green);border-color:var(--green);transform:translateY(-2px);}\n.social-icon i{font-size:17px;color:#fff;}\n.footer-col h4{\n  font-size:11px;font-weight:600;letter-spacing:1.2px;\n  text-transform:uppercase;color:rgba(255,255,255,.5);\n  margin-bottom:20px;\n}\n.footer-col ul{display:flex;flex-direction:column;gap:11px;}\n.footer-col ul li a{\n  font-size:14px;color:rgba(255,255,255,.6);\n  display:flex;align-items:center;gap:5px;transition:color .2s;\n}\n.footer-col ul li a i{font-size:13px;transition:transform .2s;}\n.footer-col ul li a:hover{color:var(--green-mid);}\n.footer-col ul li a:hover i{transform:translateX(3px);}\n.footer-contact-items{display:flex;flex-direction:column;gap:12px;}\n.footer-contact-item{\n  display:flex;align-items:flex-start;gap:10px;\n  font-size:13px;color:rgba(255,255,255,.6);\n}\n.footer-contact-item i{font-size:16px;color:var(--green-mid);flex-shrink:0;margin-top:1px;}\n.footer-contact-item a{color:rgba(255,255,255,.6);transition:color .2s;}\n.footer-contact-item a:hover{color:var(--green-mid);}\n.footer-bottom{\n  border-top:1px solid rgba(255,255,255,.07);\n  padding:22px 0;\n}\n.footer-bottom-inner{\n  display:flex;align-items:center;justify-content:space-between;\n  flex-wrap:wrap;gap:12px;\n}\n.footer-bottom-inner p{font-size:12px;color:rgba(255,255,255,.3);}\n.footer-legal{display:flex;gap:24px;}\n.footer-legal a{font-size:12px;color:rgba(255,255,255,.3);transition:color .2s;}\n.footer-legal a:hover{color:rgba(255,255,255,.7);}\n@media(max-width:1024px){.footer-grid{grid-template-columns:1fr 1fr;gap:40px;}}\n@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr;gap:28px;}}\n@media(max-width:480px){.footer-grid{grid-template-columns:1fr;gap:24px;}.footer-tagline{max-width:100%;}}\n</style>\n\n";

out += "\n<script type=\"application/ld+json\">";
out += (schema_organisation()) ?? "";
out += "</script>\n<script type=\"application/ld+json\">";
out += (schema_local_business()) ?? "";
out += "</script>\n";
if (!empty(faqs)) {
out += "\n<script type=\"application/ld+json\">";
out += (schema_faq(faqs)) ?? "";
out += "</script>\n";
}
out += "\n</body>\n</body>\n</html>";
return out;
}
