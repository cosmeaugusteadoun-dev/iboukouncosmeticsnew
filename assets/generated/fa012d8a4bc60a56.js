
// Lightbox avec navigation
var lbImages = [];
var lbCurrent = 0;

function openLightbox(src, idx) {
  lbCurrent = idx;
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
  updateLbCounter();
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
  document.getElementById('lightbox-img').src = lbImages[lbCurrent];
  updateLbCounter();
}
function updateLbCounter(){
  var el = document.getElementById('lb-counter');
  if(el) el.textContent = (lbCurrent + 1) + ' / ' + lbImages.length;
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape')    closeLightbox();
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});
