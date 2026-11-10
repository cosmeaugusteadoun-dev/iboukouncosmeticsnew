import * as helpers from "../helpers.mjs";
export function render(ctx) {
var out="";
var {BASE_URL,GSC_VERIFICATION_CODE,UPLOAD_PATH,UPLOAD_URL_EGERIES,UPLOAD_URL_EQUIPE,UPLOAD_URL_PRODUITS,UPLOAD_URL_TEMOIGNAGES,WA_NUMBER,cat_filtre,categories,egeries,equipe,faqs,fondateur,img_principale,nb_clients,nb_produits,nb_revendeurs,note_moy,page,page_active,params,photos,produit,produits,promo_active,promo_nav,promos,screenshots,seo,seo_desc,seo_img,seo_title,seo_url,similaires,temos,temos_texte,total_avi,videos,wa_number}=ctx;
var {e,htmlspecialchars,empty,count,file_exists,rawurlencode,format_prix,format_date,time_ago,couleur_cat,icone_cat,avatar_color,nav_active,date,round,array_filter,array_column,array_sum,array_merge,array_map,mb_substr,mb_strlen,substr,strtoupper,strtolower,strpos,trim,explode,nl2br,addslashes,preg_replace,json_encode,get_youtube_id,js_string,schema_organisation,schema_local_business,schema_faq,schema_produit,schema_breadcrumb}=helpers;
var b,c,i,id,m,meta_desc,notes,page_title,stmt,textes;
var SAVON_GOMMANT = produit["slug"] === "savon-gommant" || produit["id"] == 2;
out += "";
out += "\n\n<!-- BREADCRUMB -->\n<div class=\"fp-breadcrumb\">\n  <div class=\"container\">\n    <a href=\"";
out += (BASE_URL) ?? "";
out += "index.php\">Accueil</a>\n    <i class=\"ri-arrow-right-s-line\"></i>\n    <a href=\"";
out += (BASE_URL) ?? "";
out += "produits.php\">Produits</a>\n    <i class=\"ri-arrow-right-s-line\"></i>\n    <span>";
out += (e(produit["nom"])) ?? "";
out += "</span>\n  </div>\n</div>\n\n<!-- SECTION PRINCIPALE -->\n<section class=\"fp-main\">\n  <div class=\"container\">\n    <div class=\"fp-layout\">\n\n      <!-- GALERIE -->\n      <div class=\"fp-gallery\">\n        ";
if (SAVON_GOMMANT) {
out += "\n        <div class=\"fp-slide-container\" id=\"fpSlideContainer\">\n          <div class=\"fp-slide-item active\" id=\"slide-grand\"><img src=\"/produit/savon-gommant.png\" alt=\"Grand pot Savon Gommant\" class=\"fp-main-img\" width=\"800\" height=\"800\" loading=\"eager\"><span class=\"fp-badge-format-overlay\">Grand pot · 6.000 FCFA</span></div>\n          <div class=\"fp-slide-item\" id=\"slide-petit\"><img src=\"/produit/savon-gommant-petit-pot.png\" alt=\"Petit pot Savon Gommant\" class=\"fp-main-img\" width=\"800\" height=\"800\" loading=\"lazy\"><span class=\"fp-badge-format-overlay\">Petit pot · 3.000 FCFA</span></div>\n          <button type=\"button\" class=\"fp-slide-nav fp-slide-prev\" onclick=\"toggleFormatSlide()\" aria-label=\"Format précédent\"><i class=\"ri-arrow-left-s-line\"></i></button>\n          <button type=\"button\" class=\"fp-slide-nav fp-slide-next\" onclick=\"toggleFormatSlide()\" aria-label=\"Format suivant\"><i class=\"ri-arrow-right-s-line\"></i></button>\n          <div class=\"fp-slide-indicator\"><span class=\"fp-dot active\" id=\"dot-grand\" onclick=\"setFormat('grand')\"></span><span class=\"fp-dot\" id=\"dot-petit\" onclick=\"setFormat('petit')\"></span></div>\n        </div>\n        <div class=\"fp-thumbs-format\">\n          <button type=\"button\" class=\"fp-thumb-card active\" id=\"thumb-grand\" onclick=\"setFormat('grand')\"><img src=\"/produit/savon-gommant.png\" alt=\"Grand pot\"><span><strong>Grand pot</strong><small>6.000 F</small></span></button>\n          <button type=\"button\" class=\"fp-thumb-card\" id=\"thumb-petit\" onclick=\"setFormat('petit')\"><img src=\"/produit/savon-gommant-petit-pot.png\" alt=\"Petit pot\"><span><strong>Petit pot</strong><small>3.000 F</small></span></button>\n        </div>\n        ";
} else {
out += "\n        <div class=\"fp-img-main\" id=\"fpImgMain\">\n          ";
if (img_principale) {
out += "\n          <img src=\"";
out += (img_principale) ?? "";
out += "\"\n     alt=\"";
out += (e(produit["nom"])) ?? "";
out += " — Soin naturel Iboukoun Cosmetics, Bénin\"\n     title=\"";
out += (e(produit["nom"])) ?? "";
out += " | Iboukoun Cosmetics\"\n     id=\"fpMainImg\"\n     class=\"fp-main-img\"\n     width=\"800\"\n     height=\"800\"\n     loading=\"eager\">\n          ";
} else {
out += "\n          <div class=\"fp-img-placeholder\" style=\"background:";
out += (couleur_cat(produit["categorie_slug"])) ?? "";
out += "\"></div>\n          ";
}
out += "\n          ";
if (!empty(produit["promo_pct"])) {
out += "\n          <div class=\"fp-badge-sale\">-";
out += (produit["promo_pct"]) ?? "";
out += "%</div>\n          ";
}
out += "\n        </div>\n        ";
if (count(photos) > 1) {
out += "\n        <div class=\"fp-thumbs\" id=\"fpThumbs\">\n          ";
for (var [i, ph] of (photos).entries()) {
out += "\n          <div class=\"fp-thumb ";
out += (i===0?"active":"") ?? "";
out += "\"\n               onclick=\"switchPhoto('";
out += (js_string(UPLOAD_URL_PRODUITS)) ?? "";
out += "photos/";
out += (e(ph["fichier"])) ?? "";
out += "',this)\">\n            <img src=\"";
out += (UPLOAD_URL_PRODUITS) ?? "";
out += "photos/";
out += (e(ph["fichier"])) ?? "";
out += "\"\n     alt=\"";
out += (e(ph["legende"] || produit["nom"])) ?? "";
out += " — Iboukoun Cosmetics\"\n     title=\"";
out += (e(produit["nom"])) ?? "";
out += " | Iboukoun Cosmetics\"\n     width=\"80\"\n     height=\"80\"\n     loading=\"lazy\">\n            ";
if (ph["legende"]) {
out += "\n            <span class=\"fp-thumb-label\">";
out += (e(ph["legende"])) ?? "";
out += "</span>\n            ";
}
out += "\n          </div>\n          ";
}
out += "\n        </div>\n        ";
}
}
out += "\n      </div>\n\n      <!-- INFOS PRODUIT -->\n      <div class=\"fp-info\">\n        <div class=\"fp-cat-label\">";
out += (e(produit["categorie_nom"])) ?? "";
out += "</div>\n        <h1 class=\"fp-name\">";
out += (e(produit["nom"])) ?? "";
out += "</h1>\n\n        ";
if (!empty(temos)) {
out += "\n        ";
notes = array_filter(array_column(temos, "note"));
          note_moy = count(notes) ? round(array_sum(notes)/count(notes),1) : 0;
out += "\n        <div class=\"fp-rating\">\n          <div class=\"fp-stars\">\n            ";
for (i=1;i<=5;i++) {
out += "\n            <i class=\"";
out += (i<=note_moy?"ri-star-fill":"ri-star-line") ?? "";
out += "\"></i>\n            ";
}
out += "\n          </div>\n          <span class=\"fp-rating-num\">";
out += (note_moy) ?? "";
out += "/5</span>\n          <span class=\"fp-rating-count\">(";
out += (count(temos)) ?? "";
out += " avis)</span>\n          <a href=\"#fp-temos\" class=\"fp-rating-link\">Voir les avis</a>\n        </div>\n        ";
}
out += "\n        ";
if (SAVON_GOMMANT) {
out += `
        <div class="fp-format-selector-box">
          <span class="fp-format-label"><i class="ri-stack-line"></i> Sélectionnez le format :</span>
          <div class="fp-format-buttons">
            <button type="button" class="fp-btn-format active" id="btn-grand" onclick="setFormat('grand')">Grand pot <strong>6.000 F</strong></button>
            <button type="button" class="fp-btn-format" id="btn-petit" onclick="setFormat('petit')">Petit pot <strong>3.000 F</strong></button>
          </div>
        </div>
        `;
}
out += "\n\n        <!-- Prix -->\n        <div class=\"fp-price-wrap\">\n          <span class=\"fp-price\" id=\"fpPriceDisplay\">";
out += (format_prix(produit["prix_final"])) ?? "";
out += "</span>\n          ";
if (SAVON_GOMMANT) {
out += "<span class=\"fp-format-badge-current\" id=\"fpFormatBadgeCurrent\">Grand pot sélectionné</span>";
}
if (!empty(produit["promo_pct"])) {
out += "\n          <span class=\"fp-price-old\">";
out += (format_prix(produit["prix"])) ?? "";
out += "</span>\n          <span class=\"fp-promo-badge\"><i class=\"ri-flashlight-fill\"></i>";
out += (e(produit["promo_titre"])) ?? "";
out += "</span>\n          ";
}
out += "\n        </div>\n\n        <!-- Description -->\n        ";
if (!empty(produit["description"])) {
out += "\n        <div class=\"fp-description\">";
out += (nl2br(e(produit["description"]))) ?? "";
out += "</div>\n        ";
}
out += "\n\n        <!-- Bénéfices -->\n        ";
if (!empty(produit["benefices"])) {
out += "\n        <div class=\"fp-benefits\">\n          ";
for (var b of explode("\n", produit["benefices"])) {
out += "\n          ";
b = trim(b); if(!b) continue;
out += "\n          <div class=\"fp-benefit-item\"><i class=\"ri-check-line\"></i>";
out += (e(b)) ?? "";
out += "</div>\n          ";
}
out += "\n        </div>\n        ";
}
out += "\n\n        <!-- ====== BLOC COMMANDE ====== -->\n        <div class=\"fp-order-box\">\n          <div class=\"fp-order-box-title\">\n            <i class=\"ri-shopping-bag-line\"></i>Passer commande\n          </div>\n\n          <!-- Quantité -->\n          <div class=\"fp-qty-row\">\n            <label class=\"fp-qty-label\">Quantité</label>\n            <div class=\"fp-qty-ctrl\">\n              <button type=\"button\" class=\"fp-qty-btn\" onclick=\"changeQty(-1)\">\n                <i class=\"ri-subtract-line\"></i>\n              </button>\n              <input type=\"number\" id=\"fpQty\" value=\"1\" min=\"1\" max=\"999\"\n                     oninput=\"updateTotal()\" class=\"fp-qty-input\">\n              <button type=\"button\" class=\"fp-qty-btn\" onclick=\"changeQty(1)\">\n                <i class=\"ri-add-line\"></i>\n              </button>\n            </div>\n          </div>\n\n          <!-- Total -->\n          <div class=\"fp-total-row\">\n            <span class=\"fp-total-label\">Total estimé</span>\n            <span class=\"fp-total-val\" id=\"fpTotal\">";
out += (format_prix(produit["prix_final"])) ?? "";
out += "</span>\n          </div>\n\n          <!-- FORMULAIRE DE COMMANDE -->\n          <!-- Note : plus de bouton WhatsApp ici, uniquement le formulaire -->\n          <form id=\"fpOrderForm\" class=\"fp-form\" onsubmit=\"showRecap(event)\">\n            <input type=\"hidden\" name=\"produit_id\"  value=\"";
out += (produit["id"]) ?? "";
out += "\">\n            <input type=\"hidden\" name=\"produit_nom\" id=\"fpFormNom\" value=\"";
out += (e(produit["nom"])) ?? "";
out += "\">\n            <input type=\"hidden\" name=\"quantite\"    id=\"fpFormQty\" value=\"1\">\n            <input type=\"hidden\" name=\"prix_total\"  id=\"fpFormTotal\" value=\"";
out += (produit["prix_final"]) ?? "";
out += "\">\n\n            <div class=\"fp-form-row\">\n              <div class=\"fp-form-group\">\n                <label>Nom complet <span class=\"req\">*</span></label>\n                <div class=\"fp-input-wrap\">\n                  <i class=\"ri-user-line\"></i>\n                  <input type=\"text\" name=\"nom_client\" id=\"fNom\"\n                         placeholder=\"Votre nom\" required>\n                </div>\n              </div>\n              <div class=\"fp-form-group\">\n                <label>Ville <span class=\"req\">*</span></label>\n                <div class=\"fp-input-wrap\">\n                  <i class=\"ri-map-pin-line\"></i>\n                  <input type=\"text\" name=\"ville\" id=\"fVille\"\n                         placeholder=\"Cotonou, Parakou...\" required>\n                </div>\n              </div>\n            </div>\n\n            <!-- Quartier -->\n            <div class=\"fp-form-group\">\n              <label>Quartier <span class=\"req\">*</span></label>\n              <div class=\"fp-input-wrap\">\n                <i class=\"ri-map-2-line\"></i>\n                <input type=\"text\" name=\"quartier\" id=\"fQuartier\"\n                       placeholder=\"Votre quartier\" required>\n              </div>\n            </div>\n\n            <!-- WhatsApp -->\n            <div class=\"fp-form-group\">\n              <label>Numéro WhatsApp <span class=\"req\">*</span></label>\n              <div class=\"fp-input-wrap\">\n                <i class=\"ri-whatsapp-line\"></i>\n                <input type=\"tel\" name=\"telephone\" id=\"fWa\"\n                       placeholder=\"+229 ...\" required>\n              </div>\n            </div>\n\n            <!-- Numéro appel direct -->\n            <div class=\"fp-form-group\">\n              <label>Numéro d'appel direct <span class=\"req\">*</span></label>\n              <div class=\"fp-input-wrap\">\n                <i class=\"ri-phone-line\"></i>\n                <input type=\"tel\" name=\"telephone_appel\" id=\"fTel\"\n                       placeholder=\"+229 ...\" required>\n              </div>\n            </div>\n\n            <!-- Confirmer numéro appel -->\n            <div class=\"fp-form-group\">\n              <label>Confirmer le numéro d'appel <span class=\"req\">*</span></label>\n              <div class=\"fp-input-wrap\">\n                <i class=\"ri-phone-lock-line\"></i>\n                <input type=\"tel\" id=\"fTelConfirm\"\n                       placeholder=\"+229 ...\" required>\n              </div>\n              <div class=\"fp-field-error\" id=\"fTelError\" style=\"display:none;\">\n                <i class=\"ri-error-warning-line\"></i>\n                Les numéros d'appel ne correspondent pas.\n              </div>\n            </div>\n\n            <button type=\"submit\" class=\"fp-submit-btn\">\n              <i class=\"ri-send-plane-line\"></i>\n              Vérifier et confirmer la commande\n            </button>\n          </form>\n          <div id=\"fpOrderMsg\" class=\"fp-form-result\" style=\"display:none;\"></div>\n        </div>\n\n        <!-- Trust -->\n        <div class=\"fp-trust-row\">\n          <div class=\"fp-trust-item\"><i class=\"ri-leaf-line\"></i><span>100% naturel</span></div>\n          <div class=\"fp-trust-item\"><i class=\"ri-truck-line\"></i><span>Livraison Bénin</span></div>\n          <div class=\"fp-trust-item\"><i class=\"ri-shield-check-line\"></i><span>Qualité garantie</span></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n\n<!-- ====================================================\n     MODAL RÉCAPITULATIF DE COMMANDE\n==================================================== -->\n<div class=\"recap-overlay\" id=\"recapOverlay\">\n  <div class=\"recap-modal\">\n    <div class=\"recap-header\">\n      <div class=\"recap-header-icon\"><i class=\"ri-file-list-3-line\"></i></div>\n      <div>\n        <h2 class=\"recap-title\">Récapitulatif de commande</h2>\n        <p class=\"recap-sub\">Vérifiez vos informations avant de valider</p>\n      </div>\n    </div>\n\n    <!-- Produit -->\n    <div class=\"recap-produit-row\">\n      ";
if (img_principale) {
out += "\n      <img src=\"";
out += (img_principale) ?? "";
out += "\"\n     alt=\"";
out += (e(produit["nom"])) ?? "";
out += " — Iboukoun Cosmetics\"\n     class=\"recap-prod-img\"\n     width=\"64\"\n     height=\"64\"\n     loading=\"lazy\">\n      ";
} else {
out += "\n      <div class=\"recap-prod-img-fallback\" style=\"background:";
out += (couleur_cat(produit["categorie_slug"])) ?? "";
out += "\">\n        <i class=\"";
out += (icone_cat(produit["categorie_slug"])) ?? "";
out += "\"></i>\n      </div>\n      ";
}
out += "\n      <div class=\"recap-prod-info\">\n        <div class=\"recap-prod-cat\">";
out += (e(produit["categorie_nom"])) ?? "";
out += "</div>\n        <div class=\"recap-prod-name\">";
out += (e(produit["nom"])) ?? "";
out += "</div>\n        <div class=\"recap-prod-price\">";
out += (format_prix(produit["prix_final"])) ?? "";
out += " / unité</div>\n      </div>\n    </div>\n\n    <!-- Détails -->\n    <div class=\"recap-details\">\n      <div class=\"recap-detail-row\">\n        <span class=\"recap-label\"><i class=\"ri-stack-line\"></i>Quantité</span>\n        <span class=\"recap-val\" id=\"rQty\">—</span>\n      </div>\n      <div class=\"recap-detail-row recap-total-row\">\n        <span class=\"recap-label\"><i class=\"ri-money-dollar-circle-line\"></i>Total</span>\n        <span class=\"recap-val recap-total\" id=\"rTotal\">—</span>\n      </div>\n      <div class=\"recap-sep\"></div>\n      <div class=\"recap-detail-row\">\n        <span class=\"recap-label\"><i class=\"ri-user-line\"></i>Nom</span>\n        <span class=\"recap-val\" id=\"rNom\">—</span>\n      </div>\n      <div class=\"recap-detail-row\">\n        <span class=\"recap-label\"><i class=\"ri-map-pin-line\"></i>Ville</span>\n        <span class=\"recap-val\" id=\"rVille\">—</span>\n      </div>\n      <div class=\"recap-detail-row\">\n        <span class=\"recap-label\"><i class=\"ri-map-2-line\"></i>Quartier</span>\n        <span class=\"recap-val\" id=\"rQuartier\">—</span>\n      </div>\n      <div class=\"recap-detail-row\">\n        <span class=\"recap-label\"><i class=\"ri-whatsapp-line\"></i>WhatsApp</span>\n        <span class=\"recap-val\" id=\"rWa\">—</span>\n      </div>\n      <div class=\"recap-detail-row\">\n        <span class=\"recap-label\"><i class=\"ri-phone-line\"></i>Appel direct</span>\n        <span class=\"recap-val\" id=\"rTel\">—</span>\n      </div>\n    </div>\n\n    <div class=\"recap-actions\">\n      <button class=\"recap-btn-modifier\" onclick=\"closeRecap()\">\n        <i class=\"ri-edit-line\"></i>Modifier\n      </button>\n      <button class=\"recap-btn-valider\" id=\"recapValiderBtn\" onclick=\"submitCommande()\">\n        <i class=\"ri-check-double-line\"></i>Valider la commande\n      </button>\n    </div>\n  </div>\n</div>\n\n<!-- ====================================================\n     PAGE SUCCÈS (cachée, affichée après validation)\n==================================================== -->\n<div class=\"succes-overlay\" id=\"succesOverlay\" style=\"display:none;\">\n  <div class=\"succes-modal\">\n    <div class=\"succes-icon-wrap\">\n      <div class=\"succes-icon\"><i class=\"ri-checkbox-circle-fill\"></i></div>\n    </div>\n    <h2 class=\"succes-title\">Commande validée !</h2>\n    <p class=\"succes-msg\">\n      Merci <strong id=\"succesNom\"></strong> ! Votre commande a été enregistrée avec succès.\n      Notre équipe vous contactera très prochainement sur WhatsApp ou par appel direct\n      pour confirmer la livraison.\n    </p>\n    <div class=\"succes-order-num\">\n      Commande <span id=\"succesNum\"></span>\n    </div>\n    <div class=\"succes-actions\">\n      <a href=\"";
out += (BASE_URL) ?? "";
out += "produits.php\" class=\"succes-btn-produits\">\n        <i class=\"ri-sparkling-line\"></i>Commander un autre produit\n      </a>\n      <a href=\"";
out += (BASE_URL) ?? "";
out += "index.php\" class=\"succes-btn-accueil\">\n        <i class=\"ri-home-line\"></i>Retour à l'accueil\n      </a>\n    </div>\n  </div>\n</div>\n\n<!-- TÉMOIGNAGES DU PRODUIT -->\n";
if (!empty(temos)) {
out += "\n<section class=\"fp-section fp-temos-section\" id=\"fp-temos\">\n  <div class=\"container\">\n    <div class=\"section-header reveal\">\n      <div class=\"section-eyebrow\"><i class=\"ri-star-line\"></i>Avis clients</div>\n      <h2 class=\"section-h2\">Ce qu'ils disent de ce produit</h2>\n      <p class=\"section-sub\">\n        ";
out += (count(temos)) ?? "";
out += " avis · Note moyenne\n        <strong>";
out += (note_moy) ?? "";
out += "/5</strong>\n      </p>\n    </div>\n    ";
screenshots = array_filter(temos, (t)=>t["type"]==="screenshot"&&!empty(t["screenshot"]));
out += "\n    ";
if (!empty(screenshots)) {
out += "\n    <div class=\"fp-temos-ss-grid\">\n      ";
for (var sc of screenshots) {
out += "\n      <div class=\"fp-ss-card reveal\"\n           onclick=\"openLightbox('";
out += (js_string(sc["screenshot_url"])) ?? "";
out += "')\">\n        <img src=\"";
out += (e(sc["screenshot_url"])) ?? "";
out += "\"\n     alt=\"Avis client ";
out += (e(produit["nom"])) ?? "";
out += " — Iboukoun Cosmetics\"\n     width=\"400\"\n     height=\"220\"\n     loading=\"lazy\">\n        <div class=\"fp-ss-overlay\"><i class=\"ri-zoom-in-line\"></i></div>\n      </div>\n      ";
}
out += "\n    </div>\n    ";
}
out += "\n    ";
textes = array_filter(temos, (t)=>t["type"]==="texte");
out += "\n    ";
if (!empty(textes)) {
out += "\n    <div class=\"fp-temos-grid\">\n      ";
for (var t of textes) {
out += "\n      <div class=\"fp-temo-card reveal\">\n        <div class=\"fp-temo-stars\">\n          ";
for (i=1;i<=5;i++) {
out += "\n          <i class=\"";
out += (i<=t["note"]?"ri-star-fill":"ri-star-line") ?? "";
out += "\"></i>\n          ";
}
out += "\n        </div>\n        <blockquote class=\"fp-temo-text\">\"";
out += (e(t["message"])) ?? "";
out += "\"</blockquote>\n        <div class=\"fp-temo-author\">\n          <div class=\"fp-temo-avatar\" style=\"";
out += (avatar_color(t["nom_client"])) ?? "";
out += "\">\n            ";
out += (strtoupper(substr(t["nom_client"],0,2))) ?? "";
out += "\n          </div>\n          <div>\n            <div class=\"fp-temo-name\">";
out += (e(t["nom_client"])) ?? "";
out += "</div>\n            ";
if (!empty(t["ville"])) {
out += "\n            <div class=\"fp-temo-city\"><i class=\"ri-map-pin-line\"></i>";
out += (e(t["ville"])) ?? "";
out += "</div>\n            ";
}
out += "\n          </div>\n        </div>\n      </div>\n      ";
}
out += "\n    </div>\n    ";
}
out += "\n  </div>\n</section>\n<div class=\"lightbox-overlay\" id=\"lightbox\" onclick=\"closeLightbox()\">\n  <button class=\"lb-close\" onclick=\"closeLightbox()\"><i class=\"ri-close-line\"></i></button>\n  <div class=\"lb-img-wrap\" onclick=\"event.stopPropagation()\">\n    <img id=\"lightbox-img\"\n     src=\"\"\n     alt=\"Témoignage client — Iboukoun Cosmetics\"\n     width=\"800\"\n     height=\"600\"\n     loading=\"lazy\">\n  </div>\n</div>\n";
}
out += "\n\n<!-- PRODUITS SIMILAIRES -->\n";
if (!empty(similaires)) {
out += "\n<section class=\"fp-section fp-similaires-section\">\n  <div class=\"container\">\n    <div class=\"section-header reveal\">\n      <div class=\"section-eyebrow\"><i class=\"ri-sparkling-line\"></i>Dans la même gamme</div>\n      <h2 class=\"section-h2\">Vous aimerez aussi</h2>\n    </div>\n    <div class=\"fp-similaires-grid\">\n      ";
for (var s of similaires) {
out += "\n      <a href=\"";
out += (BASE_URL) ?? "";
out += "produit.php?id=";
out += (s["id"]) ?? "";
out += "\" class=\"fp-sim-card reveal\">\n        <div class=\"fp-sim-img\">\n          ";
if (!empty(s["image"])) {
out += "\n          <img src=\"";
out += (e(s["image_url"])) ?? "";
out += "\"\n     alt=\"";
out += (e(s["nom"])) ?? "";
out += " — Soin naturel Iboukoun Cosmetics\"\n     title=\"";
out += (e(s["nom"])) ?? "";
out += " | Iboukoun Cosmetics\"\n     width=\"400\"\n     height=\"400\"\n     loading=\"lazy\">\n          ";
} else {
out += "\n          <div class=\"fp-sim-img-fallback\" style=\"background:";
out += (couleur_cat(s["categorie_slug"]??"")) ?? "";
out += "\">\n            <i class=\"";
out += (icone_cat(s["categorie_slug"]??"")) ?? "";
out += "\"></i>\n          </div>\n          ";
}
out += "\n        </div>\n        <div class=\"fp-sim-info\">\n          <div class=\"fp-sim-name\">";
out += (e(s["nom"])) ?? "";
out += "</div>\n          <div class=\"fp-sim-price\">";
out += (format_prix(s["prix_final"])) ?? "";
out += "</div>\n        </div>\n      </a>\n      ";
}
out += "\n    </div>\n  </div>\n</section>\n";
}
out += "\n\n";
out += ctx.renderFooter({...ctx, faqs: typeof faqs === "undefined" ? [] : faqs});
out += `<style>
.fp-slide-container{position:relative;aspect-ratio:1;border-radius:var(--radius-xl);overflow:hidden;background:var(--cream)}
.fp-slide-item{position:absolute;inset:0;opacity:0;visibility:hidden;transition:.35s}
.fp-slide-item.active{opacity:1;visibility:visible}
.fp-badge-format-overlay{position:absolute;left:16px;bottom:16px;background:rgba(255,255,255,.92);color:var(--navy);padding:8px 14px;border-radius:999px;font-size:12px;font-weight:700}
.fp-slide-nav{position:absolute;top:50%;transform:translateY(-50%);width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.92);cursor:pointer}
.fp-slide-prev{left:12px}.fp-slide-next{right:12px}
.fp-slide-indicator{position:absolute;right:14px;bottom:18px;display:flex;gap:6px}
.fp-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.65);cursor:pointer}.fp-dot.active{background:var(--navy)}
.fp-thumbs-format{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.fp-thumb-card{display:flex;align-items:center;gap:10px;border:2px solid transparent;border-radius:12px;padding:6px;background:var(--cream);cursor:pointer;text-align:left;color:var(--navy)}
.fp-thumb-card.active{border-color:var(--navy)}
.fp-thumb-card img{width:68px;height:68px;object-fit:cover;border-radius:8px}.fp-thumb-card span{display:flex;flex-direction:column}.fp-thumb-card small{color:var(--green);font-weight:700}
.fp-format-selector-box{margin-bottom:18px;padding:14px;background:var(--cream);border-radius:12px}
.fp-format-label{display:block;font-size:13px;font-weight:700;margin-bottom:10px;color:var(--navy)}
.fp-format-buttons{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.fp-btn-format{border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px;background:#fff;cursor:pointer;color:var(--navy)}
.fp-btn-format.active{border-color:var(--navy);box-shadow:0 0 0 1px var(--navy)}
.fp-btn-format strong{display:block;color:var(--green)}
@media(max-width:760px){.fp-thumbs-format,.fp-format-buttons{grid-template-columns:1fr}}
</style>`;
out += "\n\n<style>\n/* ============================================================\n   FICHE PRODUIT\n============================================================ */\n.fp-breadcrumb{background:var(--cream);border-bottom:1px solid rgba(0,0,0,.06);padding:12px 0;}\n.fp-breadcrumb .container{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text3);flex-wrap:wrap;}\n.fp-breadcrumb a{color:var(--text3);transition:.2s;}\n.fp-breadcrumb a:hover{color:var(--navy);}\n.fp-breadcrumb i{font-size:14px;}\n.fp-breadcrumb span{color:var(--navy);font-weight:600;}\n\n.fp-main{background:var(--white);padding:56px 0 72px;}\n.fp-layout{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:start;}\n\n/* Galerie */\n.fp-img-main{position:relative;border-radius:var(--radius-xl);overflow:hidden;background:var(--cream);aspect-ratio:1;}\n.fp-main-img{width:100%;height:100%;object-fit:cover;display:block;transition:opacity .3s;}\n.fp-img-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;}\n.fp-img-placeholder i{font-size:96px;color:rgba(0,0,0,.08);}\n.fp-badge-sale{position:absolute;top:16px;left:16px;background:var(--green);color:#fff;padding:6px 16px;border-radius:999px;font-size:13px;font-weight:700;}\n.fp-thumbs{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;}\n.fp-thumb{position:relative;width:80px;border-radius:var(--radius);overflow:hidden;cursor:pointer;border:2px solid transparent;transition:.2s;background:var(--cream);}\n.fp-thumb.active,.fp-thumb:hover{border-color:var(--navy);}\n.fp-thumb img{width:100%;aspect-ratio:1;object-fit:cover;display:block;}\n.fp-thumb-label{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.6);color:#fff;font-size:8px;font-weight:600;text-align:center;padding:3px 4px;text-transform:uppercase;}\n\n/* Infos */\n.fp-cat-label{font-size:11px;color:var(--green);text-transform:uppercase;letter-spacing:1.8px;font-weight:600;margin-bottom:8px;}\n.fp-name{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,3.5vw,48px);font-weight:700;color:var(--navy);margin-bottom:14px;line-height:1.08;letter-spacing:-.5px;}\n.fp-rating{display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap;}\n.fp-stars{display:flex;gap:2px;}\n.fp-stars i{font-size:15px;color:var(--gold);}\n.fp-rating-num{font-size:14px;font-weight:700;color:var(--navy);}\n.fp-rating-count{font-size:13px;color:var(--text3);}\n.fp-rating-link{font-size:12px;color:var(--green);font-weight:600;text-decoration:underline;}\n.fp-price-wrap{display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap;}\n.fp-price{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;color:var(--navy);}\n.fp-price-old{font-size:18px;color:var(--text3);text-decoration:line-through;}\n.fp-promo-badge{display:inline-flex;align-items:center;gap:5px;background:var(--gold-light);color:var(--gold);border:1px solid rgba(201,146,10,.25);padding:5px 12px;border-radius:999px;font-size:12px;font-weight:700;}\n.fp-description{font-size:15px;color:var(--text2);line-height:1.78;margin-bottom:20px;}\n.fp-benefits{display:flex;flex-direction:column;gap:8px;margin-bottom:24px;}\n.fp-benefit-item{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--text2);}\n.fp-benefit-item i{font-size:16px;color:var(--green);flex-shrink:0;}\n\n/* Bloc commande */\n.fp-order-box{background:var(--cream);border:1px solid rgba(0,0,0,.07);border-radius:var(--radius-xl);padding:28px;margin-bottom:24px;}\n.fp-order-box-title{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--navy);margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(0,0,0,.07);}\n.fp-order-box-title i{font-size:18px;color:var(--green);}\n.fp-qty-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}\n.fp-qty-label{font-size:14px;font-weight:600;color:var(--navy);}\n.fp-qty-ctrl{display:flex;align-items:center;border:1.5px solid rgba(0,0,0,.12);border-radius:999px;overflow:hidden;background:#fff;}\n.fp-qty-btn{width:40px;height:40px;background:transparent;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--navy);transition:background .2s;}\n.fp-qty-btn:hover{background:var(--navy-light);}\n.fp-qty-input{width:52px;text-align:center;border:none;border-left:1px solid rgba(0,0,0,.1);border-right:1px solid rgba(0,0,0,.1);font-size:16px;font-weight:700;color:var(--navy);font-family:'DM Sans',sans-serif;padding:8px 4px;background:#fff;}\n.fp-total-row{display:flex;align-items:center;justify-content:space-between;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:var(--radius);padding:14px 18px;margin-bottom:20px;}\n.fp-total-label{font-size:13px;color:var(--text2);}\n.fp-total-val{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:var(--navy);}\n\n/* Formulaire */\n.fp-form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}\n.fp-form-group{margin-bottom:14px;}\n.fp-form-group label{display:block;font-size:12px;font-weight:600;color:var(--text2);margin-bottom:5px;}\n.req{color:var(--gold);}\n.fp-input-wrap{position:relative;}\n.fp-input-wrap i{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:15px;color:var(--text3);pointer-events:none;}\n.fp-input-wrap input{width:100%;padding:11px 12px 11px 38px;border:1.5px solid rgba(0,0,0,.1);border-radius:var(--radius-sm);font-size:14px;font-family:'DM Sans',sans-serif;color:var(--text);background:#fff;transition:.2s;}\n.fp-input-wrap input:focus{border-color:var(--navy);outline:none;}\n.fp-input-wrap input.input-error{border-color:#FF3B30;}\n.fp-field-error{display:flex;align-items:center;gap:6px;font-size:12px;color:#FF3B30;margin-top:5px;}\n.fp-field-error i{font-size:14px;}\n.fp-submit-btn{width:100%;padding:14px;background:var(--navy);color:#fff;border:none;border-radius:999px;font-size:14px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:4px;}\n.fp-submit-btn:hover{background:var(--green);transform:translateY(-1px);}\n.fp-submit-btn i{font-size:17px;}\n.fp-form-result{padding:12px 14px;border-radius:var(--radius-sm);font-size:13px;font-weight:500;margin-top:10px;}\n.fp-form-result.success{background:var(--green-light);color:var(--green-dark);border:1px solid rgba(45,158,53,.2);}\n.fp-form-result.error{background:#FFEBEE;color:#C62828;border:1px solid #FFCDD2;}\n\n/* Trust */\n.fp-trust-row{display:flex;gap:16px;flex-wrap:wrap;}\n.fp-trust-item{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text3);font-weight:500;}\n.fp-trust-item i{font-size:15px;color:var(--green);}\n\n/* ============================================================\n   MODAL RÉCAPITULATIF\n============================================================ */\n.recap-overlay{\n  display:none;position:fixed;inset:0;z-index:9998;\n  background:rgba(0,0,0,.6);backdrop-filter:blur(6px);\n  align-items:center;justify-content:center;padding:20px;\n}\n.recap-overlay.open{display:flex;}\n.recap-modal{\n  background:#fff;border-radius:var(--radius-xl);\n  padding:36px;max-width:520px;width:100%;\n  max-height:90vh;overflow-y:auto;\n  box-shadow:0 24px 80px rgba(0,0,0,.3);\n  animation:slideUp .35s cubic-bezier(.23,1,.32,1);\n}\n@keyframes slideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}\n.recap-header{display:flex;align-items:center;gap:14px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid rgba(0,0,0,.08);}\n.recap-header-icon{width:48px;height:48px;border-radius:14px;background:var(--navy-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;}\n.recap-header-icon i{font-size:22px;color:var(--navy);}\n.recap-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:var(--navy);}\n.recap-sub{font-size:12px;color:var(--text3);margin-top:3px;}\n/* Produit dans recap */\n.recap-produit-row{display:flex;align-items:center;gap:14px;background:var(--cream);border-radius:var(--radius);padding:14px;margin-bottom:20px;}\n.recap-prod-img{width:64px;height:64px;border-radius:var(--radius-sm);object-fit:cover;flex-shrink:0;}\n.recap-prod-img-fallback{width:64px;height:64px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0;}\n.recap-prod-img-fallback i{font-size:28px;color:rgba(0,0,0,.15);}\n.recap-prod-cat{font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:1.5px;font-weight:600;}\n.recap-prod-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:var(--navy);}\n.recap-prod-price{font-size:13px;color:var(--text2);margin-top:2px;}\n/* Détails recap */\n.recap-details{margin-bottom:24px;}\n.recap-detail-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(0,0,0,.05);}\n.recap-detail-row:last-child{border-bottom:none;}\n.recap-label{display:flex;align-items:center;gap:7px;font-size:13px;color:var(--text3);}\n.recap-label i{font-size:15px;color:var(--green);}\n.recap-val{font-size:14px;font-weight:600;color:var(--navy);}\n.recap-total-row{background:var(--cream);border-radius:var(--radius-sm);padding:12px 14px;margin:4px 0;}\n.recap-total-row .recap-label{font-weight:700;color:var(--navy);}\n.recap-total{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--navy);}\n.recap-sep{height:1px;background:rgba(0,0,0,.07);margin:8px 0;}\n/* Actions recap */\n.recap-actions{display:grid;grid-template-columns:1fr 1.5fr;gap:12px;}\n.recap-btn-modifier{padding:13px;border:1.5px solid rgba(0,0,0,.15);border-radius:999px;background:#fff;font-size:14px;font-weight:600;cursor:pointer;transition:.2s;display:flex;align-items:center;justify-content:center;gap:7px;color:var(--text2);font-family:'DM Sans',sans-serif;}\n.recap-btn-modifier:hover{border-color:var(--navy);color:var(--navy);}\n.recap-btn-modifier i{font-size:16px;}\n.recap-btn-valider{padding:13px;background:linear-gradient(135deg,var(--green),#25a330);color:#fff;border:none;border-radius:999px;font-size:14px;font-weight:700;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:7px;box-shadow:0 6px 20px rgba(45,158,53,.4);font-family:'DM Sans',sans-serif;}\n.recap-btn-valider:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(45,158,53,.5);}\n.recap-btn-valider i{font-size:16px;}\n\n/* ============================================================\n   PAGE SUCCÈS\n============================================================ */\n.succes-overlay{\n  position:fixed;inset:0;z-index:9999;\n  background:#fff;\n  display:flex;align-items:center;justify-content:center;\n  padding:24px;\n}\n.succes-modal{max-width:480px;width:100%;text-align:center;}\n.succes-icon-wrap{margin-bottom:24px;}\n.succes-icon{\n  width:88px;height:88px;border-radius:50%;\n  background:linear-gradient(135deg,var(--green),#25a330);\n  display:flex;align-items:center;justify-content:center;\n  margin:0 auto;\n  box-shadow:0 8px 32px rgba(45,158,53,.35);\n  animation:popIn .5s cubic-bezier(.23,1,.32,1);\n}\n@keyframes popIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}\n.succes-icon i{font-size:44px;color:#fff;}\n.succes-title{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;color:var(--navy);margin-bottom:14px;}\n.succes-msg{font-size:15px;color:var(--text2);line-height:1.75;margin-bottom:20px;}\n.succes-order-num{\n  display:inline-block;\n  background:var(--cream);border:1px solid rgba(0,0,0,.08);\n  border-radius:999px;padding:8px 20px;\n  font-size:13px;color:var(--text3);margin-bottom:32px;font-weight:600;\n}\n.succes-order-num span{color:var(--navy);}\n.succes-actions{display:flex;flex-direction:column;gap:12px;}\n.succes-btn-produits{display:flex;align-items:center;justify-content:center;gap:9px;background:var(--navy);color:#fff;padding:16px;border-radius:999px;font-size:14px;font-weight:700;text-decoration:none;transition:all .25s;box-shadow:0 4px 16px rgba(13,26,94,.25);}\n.succes-btn-produits:hover{background:var(--green);}\n.succes-btn-produits i{font-size:18px;}\n.succes-btn-accueil{display:flex;align-items:center;justify-content:center;gap:9px;background:transparent;color:var(--navy);padding:14px;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;border:1.5px solid rgba(13,26,94,.2);transition:all .25s;}\n.succes-btn-accueil:hover{background:var(--navy);color:#fff;}\n.succes-btn-accueil i{font-size:18px;}\n\n/* ============================================================\n   TÉMOIGNAGES PRODUIT\n============================================================ */\n.fp-section{padding:80px 0;}\n.fp-temos-section{background:var(--cream);}\n.fp-temos-ss-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;margin-bottom:48px;}\n.fp-ss-card{border-radius:var(--radius);overflow:hidden;cursor:pointer;position:relative;border:1px solid rgba(0,0,0,.07);transition:transform .25s,box-shadow .25s;}\n.fp-ss-card:hover{transform:translateY(-3px);box-shadow:var(--shadow);}\n.fp-ss-card img{width:100%;height:220px;object-fit:cover;display:block;}\n.fp-ss-overlay{position:absolute;inset:0;background:rgba(13,26,94,.4);display:flex;align-items:center;justify-content:center;opacity:0;transition:.2s;}\n.fp-ss-card:hover .fp-ss-overlay{opacity:1;}\n.fp-ss-overlay i{font-size:32px;color:#fff;}\n.fp-temos-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;}\n.fp-temo-card{background:#fff;border-radius:var(--radius-xl);padding:26px;border:1px solid rgba(0,0,0,.06);transition:box-shadow .25s;}\n.fp-temo-card:hover{box-shadow:var(--shadow);}\n.fp-temo-stars{display:flex;gap:3px;margin-bottom:12px;}\n.fp-temo-stars i{font-size:14px;color:var(--gold);}\n.fp-temo-text{font-size:14px;color:var(--text2);line-height:1.72;font-style:italic;margin-bottom:16px;}\n.fp-temo-author{display:flex;align-items:center;gap:10px;padding-top:14px;border-top:1px solid rgba(0,0,0,.06);}\n.fp-temo-avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;}\n.fp-temo-name{font-size:13px;font-weight:700;color:var(--navy);}\n.fp-temo-city{font-size:11px;color:var(--text3);display:flex;align-items:center;gap:3px;margin-top:2px;}\n.fp-temo-city i{font-size:11px;}\n/* Lightbox */\n.lightbox-overlay{display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.9);align-items:center;justify-content:center;backdrop-filter:blur(8px);}\n.lightbox-overlay.open{display:flex;}\n.lb-close{position:fixed;top:20px;right:20px;width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10000;transition:.2s;}\n.lb-close:hover{background:rgba(255,255,255,.2);}\n.lb-close i{font-size:22px;color:#fff;}\n.lb-img-wrap{max-width:90vw;max-height:90vh;}\n.lb-img-wrap img{max-width:90vw;max-height:90vh;object-fit:contain;border-radius:var(--radius);}\n\n/* SIMILAIRES */\n.fp-similaires-section{background:var(--white);}\n.fp-similaires-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:24px;}\n.fp-sim-card{text-decoration:none;color:inherit;}\n.fp-sim-img{border-radius:var(--radius-lg);overflow:hidden;background:var(--cream);aspect-ratio:1;margin-bottom:12px;}\n.fp-sim-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}\n.fp-sim-card:hover .fp-sim-img img{transform:scale(1.04);}\n.fp-sim-img-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;}\n.fp-sim-img-fallback i{font-size:48px;color:rgba(0,0,0,.1);}\n.fp-sim-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:var(--navy);margin-bottom:4px;}\n.fp-sim-price{font-size:15px;font-weight:600;color:var(--text2);}\n\n/* ============================================================\n   RESPONSIVE\n============================================================ */\n@media(max-width:1024px){.fp-layout{gap:48px;}}\n@media(max-width:768px){\n  .fp-layout{grid-template-columns:1fr;gap:32px;}\n  .fp-main{padding:32px 0 56px;}\n  .fp-form-row{grid-template-columns:1fr;}\n  .fp-thumbs .fp-thumb{width:64px;}\n  .fp-temos-ss-grid{grid-template-columns:1fr 1fr;}\n  .fp-temos-grid{grid-template-columns:1fr;}\n  .fp-similaires-grid{grid-template-columns:1fr 1fr;}\n  .fp-section{padding:56px 0;}\n  .fp-order-box{padding:22px 18px;}\n  .fp-name{font-size:clamp(26px,8vw,36px);}\n  .fp-price{font-size:28px;}\n  .recap-modal{padding:24px 20px;}\n  .recap-actions{grid-template-columns:1fr;}\n}\n@media(max-width:480px){\n  .fp-main{padding:24px 0 48px;}\n  .fp-temos-ss-grid{grid-template-columns:1fr;}\n  .fp-similaires-grid{grid-template-columns:1fr 1fr;}\n  .fp-name{font-size:clamp(24px,8vw,32px);}\n  .fp-order-box{padding:18px 14px;}\n  .fp-qty-btn{width:36px;height:36px;}\n  .fp-qty-input{width:44px;}\n  .succes-title{font-size:28px;}\n}\n@media(max-width:360px){\n  .fp-similaires-grid{grid-template-columns:1fr;}\n}\n</style>\n\n<script>\nvar FP_PRIX     = ";
out += (js_string(+produit["prix_final"])) ?? "";
out += ";\nvar FP_NOM      = '";
out += (js_string(e(addslashes(produit["nom"])))) ?? "";
out += "';\nvar FP_WA_NUM   = '";
out += (js_string(preg_replace("/\\D/","",WA_NUMBER))) ?? "";
out += "';\nvar SAVON_FORMATS = { grand:{prix:6000,nom:'Savon Gommant (Grand pot)'}, petit:{prix:3000,nom:'Savon Gommant (Petit pot)'} };\nvar currentFormat = 'grand';\nif (document.getElementById('slide-grand')) { FP_PRIX = SAVON_FORMATS.grand.prix; FP_NOM = SAVON_FORMATS.grand.nom; }\nfunction setFormat(fmt){\n  if (!SAVON_FORMATS[fmt] || !document.getElementById('slide-grand')) return;\n  currentFormat = fmt; var format = SAVON_FORMATS[fmt]; FP_PRIX = format.prix; FP_NOM = format.nom;\n  ['grand','petit'].forEach(function(name){\n    ['slide','dot','thumb','btn'].forEach(function(prefix){ var node=document.getElementById(prefix+'-'+name); if(node) node.classList.toggle('active',name===fmt); });\n  });\n  document.getElementById('fpPriceDisplay').textContent=FP_PRIX.toLocaleString('fr-FR')+' FCFA';\n  document.getElementById('fpFormatBadgeCurrent').textContent=format.badge||((fmt==='grand'?'Grand pot':'Petit pot')+' sélectionné');\n  document.getElementById('fpFormNom').value=FP_NOM+' - '+FP_PRIX+' F'; updateTotal();\n}\nfunction toggleFormatSlide(){setFormat(currentFormat==='grand'?'petit':'grand');}\n\n/* ---- Quantité & Total ---- */\nfunction changeQty(delta){\n  var input = document.getElementById('fpQty');\n  var val   = Math.max(1, Math.min(999, parseInt(input.value||1) + delta));\n  input.value = val;\n  updateTotal();\n}\nfunction updateTotal(){\n  var qty   = Math.max(1, parseInt(document.getElementById('fpQty').value)||1);\n  var total = FP_PRIX * qty;\n  document.getElementById('fpTotal').textContent =\n    total.toLocaleString('fr-FR') + ' FCFA';\n  document.getElementById('fpFormQty').value   = qty;\n  document.getElementById('fpFormTotal').value = total;\n}\n\n/* ---- Vérification numéros ---- */\nfunction verifyTel(){\n  var t1  = document.getElementById('fTel').value.trim();\n  var t2  = document.getElementById('fTelConfirm').value.trim();\n  var err = document.getElementById('fTelError');\n  var ok  = (t1 === t2 && t1 !== '');\n  err.style.display = (!ok && t2 !== '') ? 'flex' : 'none';\n  document.getElementById('fTel').classList.toggle('input-error', !ok && t2!=='');\n  document.getElementById('fTelConfirm').classList.toggle('input-error', !ok && t2!=='');\n  return ok;\n}\ndocument.getElementById('fTelConfirm').addEventListener('input', verifyTel);\ndocument.getElementById('fTel').addEventListener('input', verifyTel);\n\n/* ---- Afficher le récapitulatif ---- */\nfunction showRecap(e){\n  e.preventDefault();\n  // Vérification numéros\n  if(!verifyTel()){\n    document.getElementById('fTelError').style.display = 'flex';\n    document.getElementById('fTelConfirm').focus();\n    return;\n  }\n  var qty   = parseInt(document.getElementById('fpFormQty').value);\n  var total = parseInt(document.getElementById('fpFormTotal').value);\n  // Remplir le récap\n  document.getElementById('rNom').textContent     = document.getElementById('fNom').value;\n  document.getElementById('rVille').textContent   = document.getElementById('fVille').value;\n  document.getElementById('rQuartier').textContent= document.getElementById('fQuartier').value;\n  document.getElementById('rWa').textContent      = document.getElementById('fWa').value;\n  document.getElementById('rTel').textContent     = document.getElementById('fTel').value;\n  document.getElementById('rQty').textContent     = qty + ' unité' + (qty>1?'s':'');\n  document.getElementById('rTotal').textContent   = total.toLocaleString('fr-FR') + ' FCFA';\n  // Ouvrir\n  document.getElementById('recapOverlay').classList.add('open');\n  document.body.style.overflow = 'hidden';\n}\nfunction closeRecap(){\n  document.getElementById('recapOverlay').classList.remove('open');\n  document.body.style.overflow = '';\n}\n\n/* ---- Soumettre la commande ---- */\nfunction submitCommande(){\n  var btn = document.getElementById('recapValiderBtn');\n  btn.disabled = true;\n  btn.innerHTML = '<i class=\"ri-loader-4-line\" style=\"animation:spin 1s linear infinite\"></i>Validation...';\n\n  var form = document.getElementById('fpOrderForm');\n  var data = new FormData(form);\n\n  fetch('";
out += (js_string(BASE_URL)) ?? "";
out += "api/commande_submit.php', {method:'POST', body:data})\n  .then(function(r){ return r.json(); })\n  .then(function(res){\n    if(res.success){\n      // Fermer recap\n      closeRecap();\n      // Remplir page succès\n      document.getElementById('succesNom').textContent = document.getElementById('fNom').value;\n      document.getElementById('succesNum').textContent = '#' + res.commande_id;\n      // Afficher succès\n      document.getElementById('succesOverlay').style.display = 'flex';\n      document.body.style.overflow = 'hidden';\n      // Réinitialiser form\n      form.reset();\n      updateTotal();\n    } else {\n      closeRecap();\n      var msg = document.getElementById('fpOrderMsg');\n      msg.style.display = 'block';\n      msg.className = 'fp-form-result error';\n      msg.textContent = res.message;\n    }\n  })\n  .catch(function(){\n    closeRecap();\n    var msg = document.getElementById('fpOrderMsg');\n    msg.style.display = 'block';\n    msg.className = 'fp-form-result error';\n    msg.textContent = 'Erreur réseau. Contactez-nous directement sur WhatsApp.';\n  })\n  .finally(function(){\n    btn.disabled = false;\n    btn.innerHTML = '<i class=\"ri-check-double-line\"></i>Valider la commande';\n  });\n}\n\n/* ---- Photo gallery ---- */\nfunction switchPhoto(src, el){\n  document.getElementById('fpMainImg').src = src;\n  document.querySelectorAll('.fp-thumb').forEach(function(t){t.classList.remove('active');});\n  el.classList.add('active');\n}\n\n/* ---- Lightbox ---- */\nfunction openLightbox(src){\n  document.getElementById('lightbox-img').src = src;\n  document.getElementById('lightbox').classList.add('open');\n  document.body.style.overflow = 'hidden';\n}\nfunction closeLightbox(){\n  document.getElementById('lightbox').classList.remove('open');\n  document.body.style.overflow = '';\n}\ndocument.addEventListener('keydown', function(e){\n  if(e.key==='Escape'){ closeLightbox(); closeRecap(); }\n});\n\n/* ---- Reveal ---- */\n(function(){\n  var obs = new IntersectionObserver(function(entries){\n    entries.forEach(function(en){\n      if(en.isIntersecting){en.target.classList.add('visible');obs.unobserve(en.target);}\n    });\n  },{threshold:.1});\n  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});\n})();\n\nvar s = document.createElement('style');\ns.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';\ndocument.head.appendChild(s);\n\n";

out += "\n</script>\n<script type=\"application/ld+json\">";
out += (schema_produit(produit)) ?? "";
out += "</script>\n<script type=\"application/ld+json\">";
out += (schema_breadcrumb([])) ?? "";
out += "\n</script>";
return out;
}
