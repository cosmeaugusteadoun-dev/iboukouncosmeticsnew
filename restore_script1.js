const fs = require('fs');
const p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');
const original = c;
const crlf = '\r\n';

// Trouver le début du contenu PAGE HERO
let pageHeroIdx = c.indexOf('<!-- PAGE HERO -->');
if (pageHeroIdx === -1) pageHeroIdx = c.indexOf('<section class="page-hero">');

console.log('PAGE HERO index:', pageHeroIdx);

// Partie 1 du script : début
const part1 = `/* ============================================================
   SKELETON LOADER (inchangé)
============================================================ */(function(){
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

  var html = ''`;

if (pageHeroIdx !== -1) {
  c = c.substring(0, pageHeroIdx) + part1 + c.substring(pageHeroIdx);
  console.log('Partie 1 insérée');
} else {
  console.log('PAGE HERO non trouvé');
}

fs.writeFileSync(p, c, 'utf8');
console.log('Partie 1 du script écrite');