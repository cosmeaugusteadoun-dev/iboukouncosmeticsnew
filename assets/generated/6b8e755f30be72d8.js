
function openVideo(ytId, titre) {
    if (!ytId) return;
    document.getElementById('videoIframe').src =
        'https://www.youtube.com/embed/' + ytId + '?autoplay=1&rel=0';
    document.getElementById('videoModalTitle').textContent = titre;
    document.getElementById('videoModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeVideoBtn() {
    document.getElementById('videoIframe').src = '';
    document.getElementById('videoModal').classList.remove('open');
    document.body.style.overflow = '';
}
function closeVideo(e) {
    if (e.target === document.getElementById('videoModal')) closeVideoBtn();
}
document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeVideoBtn();
});
