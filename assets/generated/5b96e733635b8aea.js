
/* ============================================================
   MENU BURGER — VERSION PRO CORRIGÉE
============================================================ */

// Toggle (ouvre + ferme avec le même bouton)
window.toggleMenu = function(){
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');

  menu.classList.toggle('open');
  burger.classList.toggle('open');

  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
};

// Fermeture forcée
window.menuClose = function(){
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');

  menu.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
};

// Fermer avec ESC
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') menuClose();
});

// Fermer en cliquant à l’extérieur
document.addEventListener('click', function(e){
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');

  if(
    menu.classList.contains('open') &&
    !menu.contains(e.target) &&
    !burger.contains(e.target)
  ){
    menuClose();
  }
});

// Effet scroll nav + fermeture menu
window.addEventListener('scroll', function(){
  const nav = document.getElementById('mainNav');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 20);

  const menu = document.getElementById('mobileMenu');
  if(menu.classList.contains('open')){
    menuClose();
  }
});

/* ============================================================
   SKELETON LOADER (inchangé)
============================================================ */
(function(){
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

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){ if(loader) loader.classList.add('hidden'); }, 600);
  });

  setTimeout(function(){ if(loader) loader.classList.add('hidden'); }, 2000);
})();
