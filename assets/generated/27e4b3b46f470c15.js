
// Sujets rapides
function setSujet(btn) {
  document.querySelector('[name="sujet"]').value = btn.textContent;
  document.querySelectorAll('.cqs-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
}

// Formulaire
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var btn  = form.querySelector('.cfc-submit');
  var msg  = document.getElementById('contactMsg');
  var data = new FormData(form);

  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i><span>Envoi en cours...</span>';

  fetch('/api/contact_submit', { method:'POST', body:data })
  .then(function(r){ return r.json(); })
  .then(function(res){
    msg.style.display = 'block';
    msg.className = 'cfc-result ' + (res.success ? 'success' : 'error');
    msg.textContent = res.message;
    if(res.success) form.reset();
  })
  .catch(function(){
    msg.style.display = 'block';
    msg.className = 'cfc-result error';
    msg.textContent = 'Erreur réseau. Contactez-nous directement sur WhatsApp.';
  })
  .finally(function(){
    btn.disabled = false;
    btn.innerHTML = '<i class="ri-send-plane-line"></i><span>Envoyer le message</span>';
  });
});

var s = document.createElement('style');
s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(s);
