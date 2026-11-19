const fs = require('fs');
const crlf = '\r\n';
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');

if (c.includes('SKELETON LOADER (inchangé)')) {
  console.log('Script inline déjà présent, rien à faire');
} else {
  // Trouver la fin du div skeletonloader
  let skDivEnd = c.indexOf('</div>', c.indexOf('id="skBody"'));
  if (skDivEnd !== -1) {
    skDivEnd += '</div>'.length;
    
    const inlineScript = `<script>/* ============================================================
   SKELETON LOADER (inchangé)
============================================================ === */(function(){
  var body   = document.getElementById('skBody');
  var loader = document.getElementById('skeletonLoader');
  var path   = window.location.pathname;
  var isHome = path.indexOf('index.html') !== -1 || path.endsWith('/') || path.endsWith('/iboukoun/');

  function skProduct(){
    return '<div class="sk-product-card"><div class="sk-box sk-product-img"></div><div class="sk-product-body"><div class="sk-box sk-product-cat"></div><div class="sk-box sk-product-name"></div><div class="sk-box sk-product-desc1"></div><div class="sk-box sk-product-desc2"></div><div class="sk-product-footer"><div class="sk-box sk-product-price"></div><div class="sk-box sk-product-btn"></div></div></div></div>';
  }

  function skTemo(){
    return '<div class="sk-temo-card"><div class="sk-temo-stars"><div class="sk-box sk-temo-star"></div><div class="sk-box sk-temo-star"></div><div class="sk-box sk-temo-star"></div><div class="sk-box sk-temo-star"></div><div class="sk-box sk-temo-star"></div></div><div class="sk-box sk-temo-text1"></div><div class="sk-box sk-temo-text2"></div><div class="sk-box sk-temo-text3"></div><div class="sk-temo-author"><div class="sk-box sk-temo-avatar"></div><div class="sk-temo-info"><div class="sk-box sk-temo-name"></div><div class="sk-box sk-temo-city"></div></div></div></div>';
  }

  function skSectionHeader(){
    return '<div class="sk-section-header"><div class="sk-box sk-section-eyebrow"></div><div class="sk-box sk-section-title"></div><div class="sk-box sk-section-sub"></div></div>';
  }

  var html = '';

  if(isHome){
    html += '<div class="sk-hero"><div class="sk-hero-content"><div class="sk-hero-badge"></div><div class="sk-hero-h1-1"></div><div class="sk-hero-h1-2"></div><div class="sk-hero-sub"></div><div class="sk-hero-sub2"></div><div class="sk-hero-btns"><div class="sk-hero-btn1"></div><div class="sk-hero-btn2"></div></div></div></div>';
    html += '<div class="sk-section">'+skSectionHeader()+'<div class="sk-products">'+skProduct()+skProduct()+skProduct()+skProduct()+'</div></div>';
    html += '<div class="sk-section" style="background:var(--cream);">'+skSectionHeader()+'<div class="sk-temos">'+skTemo()+skTemo()+skTemo()+'</div></div>';
  } else {
    html += '<div class="sk-page-hero"><div class="sk-box sk-page-hero-badge"></div><div class="sk-box sk-page-hero-title"></div><div class="sk-box sk-page-hero-sub"></div></div>';
    html += '<div class="sk-section">'+skSectionHeader()+'<div class="sk-products">'+skProduct()+skProduct()+skProduct()+skProduct()+'</div></div>';
    html += '<div class="sk-section" style="background:var(--cream);">'+skSectionHeader()+'<div class="sk-temos">'+skTemo()+skTemo()+'</div></div>';
  }

  if(body) body.innerHTML = html;

  setTimeout(function(){ if(loader) loader.classList.add('hidden'); }, 10000);
})();</script>`;

    c = c.substring(0, skDivEnd) + crlf + crlf + inlineScript + crlf + crlf + c.substring(skDivEnd);
    fs.writeFileSync(p, c, 'utf8');
    console.log('Script inline inséré avec succès. Nouvelle taille:', c.length);
  } else {
    console.log('Fin du div skeletonloader non trouvée');
  }
}