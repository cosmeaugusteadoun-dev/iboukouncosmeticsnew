const fs = require('fs');
const crlf = '\r\n';
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');

console.log('Taille actuelle:', c.length);

// Vérifier si le script inline existe déjà
if (c.includes('SKELETON LOADER (inchangé)')) {
  console.log('Script inline déjà présent');
} else {
  // Trouver la fin du div skeletonloader pour insérer le script après
  let skDivEnd = c.indexOf('</div>', c.indexOf('id="skBody"'));
  if (skDivEnd !== -1) {
    skDivEnd += '</div>'.length;
    // Insérer le script inline après le div skeletonloader
    const inlineScript = `${crlf}/* ============================================================${crlf}   SKELETON LOADER (inchangé)${crlf}============================================================ === */${crlf}(function()${crlf}  var body   = document.getElementById('skBody');${crlf}  var loader = document.getElementById('skeletonLoader');${crlf}  var path   = window.location.pathname;${crlf}  var isHome = path.indexOf('index.html') !== -1 || path.endsWith('/') || path.endsWith('/iboukoun/');${crlf}${crlf}  function skProduct()${crlf}    return '<div class="sk-product-card"><div class="sk-box sk-product-img"></div><div class="sk-product-body"><div class="sk-box sk-product-cat"></div><div class="sk-box sk-product-name"></div><div class="sk-box sk-product-desc1"></div><div class="sk-box sk-product-desc2"></div><div class="sk-product-footer"><div class="sk-box sk-product-price"></div><div class="sk-box sk-product-btn"></div></div></div></div>';${crlf}  }${crlf}${crlf}  function skTemo()${crlf}    return '<div class="sk-temo-card"><div class="sk-temo-stars"><div class="sk-box sk-temo-star"></div><div class="sk-box sk-temo-star"></div><div class="sk-box sk-temo-star"></div><div class="sk-box sk-temo-star"></div><div class="sk-box sk-temo-star"></div></div><div class="sk-box sk-temo-text1"></div><div class="sk-box sk-temo-text2"></div><div class="sk-box sk-temo-text3"></div><div class="sk-temo-author"><div class="sk-box sk-temo-avatar"></div><div class="sk-temo-info"><div class="sk-box sk-temo-name"></div><div class="sk-box sk-temo-city"></div></div></div></div>';${crlf}  }${crlf}${crlf}  function skSectionHeader()${crlf}    return '<div class="sk-section-header"><div class="sk-box sk-section-eyebrow"></div><div class="sk-box sk-section-title"></div><div class="sk-box sk-section-sub"></div></div>';${crlf}  }${crlf}${crlf}  var html = '';${crlf}${crlf}  if(isHome)${crlf}    html += '<div class="sk-hero"><div class="sk-hero-content"><div class="sk-hero-badge"></div><div class="sk-hero-h1-1"></div><div class="sk-hero-h1-2"></div><div class="sk-hero-sub"></div><div class="sk-hero-sub2"></div><div class="sk-hero-btns"><div class="sk-hero-btn1"></div><div class="sk-hero-btn2"></div></div></div></div>';${crlf}    html += '<div class="sk-section">'+skSectionHeader()+'<div class="sk-products">'+skProduct()+skProduct()+skProduct()+skProduct()+'</div></div>';${crlf}    html += '<div class="sk-section" style="background:var(--cream);">'+skSectionHeader()+'<div class="sk-temos">'+skTemo()+skTemo()+skTemo()+'</div></div>';${crlf}  } else ${crlf}    html += '<div class="sk-page-hero"><div class="sk-box sk-page-hero-badge"></div><div class="sk-box sk-page-hero-title"></div><div class="sk-box sk-page-hero-sub"></div></div>';${crlf}    html += '<div class="sk-section">'+skSectionHeader()+'<div class="sk-products">'+skProduct()+skProduct()+skProduct()+skProduct()+'</div></div>';${crlf}    html += '<div class="sk-section" style="background:var(--cream);">'+skSectionHeader()+'<div class="sk-temos">'+skTemo()+skTemo()+'</div></div>';${crlf}  }${crlf}${crlf}  if(body) body.innerHTML = html;${crlf}${crlf}  setTimeout(function(){ if(loader) loader.classList.add('hidden'); }, 10000);${crlf})();${crlf}</script>${crlf}${crlf}`;

    c = c.substring(0, skDivEnd) + inlineScript + c.substring(skDivEnd);
    fs.writeFileSync(p, c, 'utf8');
    console.log('Script inline inséré. Nouvelle taille:', c.length);
  } else {
    console.log('Fin du div skeletonloader non trouvée');
  }
}