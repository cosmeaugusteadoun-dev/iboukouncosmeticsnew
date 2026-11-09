
document.getElementById('revForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var btn  = form.querySelector('.btn-submit-form');
  var msg  = document.getElementById('revMsg');
  var data = new FormData(form);

  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i>Envoi en cours...';

  fetch('/api/revendeur_submit', { method:'POST', body:data })
  .then(function(r){ return r.json(); })
  .then(function(res){
    msg.style.display = 'block';
    msg.className = 'form-result ' + (res.success ? 'success' : 'error');
    msg.textContent = res.message;
    if(res.success) form.reset();
  })
  .catch(function(){
    msg.style.display = 'block';
    msg.className = 'form-result error';
    msg.textContent = 'Erreur réseau. Contactez-nous directement sur WhatsApp.';
  })
  .finally(function(){
    btn.disabled = false;
    btn.innerHTML = '<i class="ri-send-plane-line"></i>Envoyer ma candidature';
  });
});

var s = document.createElement('style');
s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(s);
