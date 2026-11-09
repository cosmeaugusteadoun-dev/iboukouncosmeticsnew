
var FP_PRIX     = 5000;
var FP_NOM      = 'Sérum Éclat';
var FP_WA_NUM   = '22901695300';

/* ---- Quantité & Total ---- */
function changeQty(delta){
  var input = document.getElementById('fpQty');
  var val   = Math.max(1, Math.min(999, parseInt(input.value||1) + delta));
  input.value = val;
  updateTotal();
}
function updateTotal(){
  var qty   = Math.max(1, parseInt(document.getElementById('fpQty').value)||1);
  var unit = [].filter(function(p){return p.min<=qty}).reduce(function(price,p){return Math.min(price,p.price)},FP_PRIX);
  var total = unit * qty;
  document.getElementById('fpTotal').textContent =
    total.toLocaleString('fr-FR') + ' FCFA';
  document.getElementById('fpFormQty').value   = qty;
  document.getElementById('fpFormTotal').value = total;
}

/* ---- Vérification numéros ---- */
function verifyTel(){
  var t1  = document.getElementById('fTel').value.trim();
  var t2  = document.getElementById('fTelConfirm').value.trim();
  var err = document.getElementById('fTelError');
  var ok  = (t1 === t2 && t1 !== '');
  err.style.display = (!ok && t2 !== '') ? 'flex' : 'none';
  document.getElementById('fTel').classList.toggle('input-error', !ok && t2!=='');
  document.getElementById('fTelConfirm').classList.toggle('input-error', !ok && t2!=='');
  return ok;
}
document.getElementById('fTelConfirm').addEventListener('input', verifyTel);
document.getElementById('fTel').addEventListener('input', verifyTel);

/* ---- Afficher le récapitulatif ---- */
function showRecap(e){
  e.preventDefault();
  // Vérification numéros
  if(!verifyTel()){
    document.getElementById('fTelError').style.display = 'flex';
    document.getElementById('fTelConfirm').focus();
    return;
  }
  var qty   = parseInt(document.getElementById('fpFormQty').value);
  var total = parseInt(document.getElementById('fpFormTotal').value);
  // Remplir le récap
  document.getElementById('rNom').textContent     = document.getElementById('fNom').value;
  document.getElementById('rVille').textContent   = document.getElementById('fVille').value;
  document.getElementById('rQuartier').textContent= document.getElementById('fQuartier').value;
  document.getElementById('rWa').textContent      = document.getElementById('fWa').value;
  document.getElementById('rTel').textContent     = document.getElementById('fTel').value;
  document.getElementById('rQty').textContent     = qty + ' unité' + (qty>1?'s':'');
  document.getElementById('rTotal').textContent   = total.toLocaleString('fr-FR') + ' FCFA';
  // Ouvrir
  document.getElementById('recapOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeRecap(){
  document.getElementById('recapOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Soumettre la commande ---- */
function submitCommande(){
  var btn = document.getElementById('recapValiderBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i>Validation...';

  var form = document.getElementById('fpOrderForm');
  var data = new FormData(form);

  fetch('/api/commande_submit', {method:'POST', body:data})
  .then(function(r){ return r.json(); })
  .then(function(res){
    if(res.success){
      // Fermer recap
      closeRecap();
      // Remplir page succès
      document.getElementById('succesNom').textContent = document.getElementById('fNom').value;
      document.getElementById('succesNum').textContent = '#' + res.commande_id;
      // Afficher succès
      document.getElementById('succesOverlay').style.display = 'flex';
      document.body.style.overflow = 'hidden';
      // Réinitialiser form
      form.reset();
      updateTotal();
    } else {
      closeRecap();
      var msg = document.getElementById('fpOrderMsg');
      msg.style.display = 'block';
      msg.className = 'fp-form-result error';
      msg.textContent = res.message;
    }
  })
  .catch(function(){
    closeRecap();
    var msg = document.getElementById('fpOrderMsg');
    msg.style.display = 'block';
    msg.className = 'fp-form-result error';
    msg.textContent = 'Erreur réseau. Contactez-nous directement sur WhatsApp.';
  })
  .finally(function(){
    btn.disabled = false;
    btn.innerHTML = '<i class="ri-check-double-line"></i>Valider la commande';
  });
}

/* ---- Photo gallery ---- */
function switchPhoto(src, el){
  document.getElementById('fpMainImg').src = src;
  document.querySelectorAll('.fp-thumb').forEach(function(t){t.classList.remove('active');});
  el.classList.add('active');
}

/* ---- Lightbox ---- */
function openLightbox(src){
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e){
  if(e.key==='Escape'){ closeLightbox(); closeRecap(); }
});

/* ---- Reveal ---- */
(function(){
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('visible');obs.unobserve(en.target);}
    });
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
})();

var s = document.createElement('style');
s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(s);


