
function filterProduits(cat,btn){
  document.querySelectorAll('.idx-filter-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  document.querySelectorAll('.idx-product-card').forEach(function(card){
    card.style.display=(cat==='all'||card.dataset.cat===cat)?'':'none';
  });
}

document.getElementById('revFormAccueil').addEventListener('submit',function(e){
  e.preventDefault();
  var form=this,btn=form.querySelector('.idx-rev-submit');
  var msg=document.getElementById('revFormMsg');
  var data=new FormData(form);
  btn.disabled=true;
  btn.innerHTML='<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i>Envoi...';
  fetch('/api/revendeur_submit',{method:'POST',body:data})
  .then(function(r){return r.json();})
  .then(function(res){
    msg.style.display='block';
    msg.className='form-result '+(res.success?'success':'error');
    msg.textContent=res.message;
    if(res.success)form.reset();
  })
  .catch(function(){
    msg.style.display='block';
    msg.className='form-result error';
    msg.textContent='Erreur réseau. Contactez-nous sur WhatsApp.';
  })
  .finally(function(){
    btn.disabled=false;
    btn.innerHTML='<i class="ri-send-plane-line"></i>Envoyer ma candidature';
  });
});

// Reveal au scroll
(function(){
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}
    });
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
})();


