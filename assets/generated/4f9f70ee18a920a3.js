
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!els.length)return;
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.1});
  els.forEach(function(el){obs.observe(el);});
})();

function logWA(produit,source){
  fetch('/api/log_whatsapp',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({nom_client:'',produit:produit||'',source:source||'inconnu'})
  }).catch(function(){});
}

function orderWA(produitNom,source){
  logWA(produitNom,source||'fiche_produit');
  var msg='Bonjour, je souhaite commander : *'+produitNom+'* 🌿';
  window.open('https://wa.me/22901695300?text='+encodeURIComponent(msg),'_blank');
}

document.querySelectorAll('.faq-question').forEach(function(btn){
  btn.addEventListener('click',function(){
    var item=btn.closest('.faq-item');
    var isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open');});
    if(!isOpen)item.classList.add('open');
  });
});
