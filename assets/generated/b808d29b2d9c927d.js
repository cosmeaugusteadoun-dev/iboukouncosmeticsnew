
// Compte à rebours
document.querySelectorAll('.pv-timer').forEach(function(el) {
  var id      = el.id.replace('timer-', '');
  var endStr  = el.dataset.end + ' 23:59:59';
  var endTime = new Date(endStr).getTime();

  function tick() {
    var diff = Math.max(0, endTime - Date.now());
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    var pad = function(n){ return String(n).padStart(2,'0'); };
    var td = document.getElementById('td-' + id);
    var th = document.getElementById('th-' + id);
    var tm = document.getElementById('tm-' + id);
    var ts = document.getElementById('ts-' + id);
    if(td) td.textContent = pad(d);
    if(th) th.textContent = pad(h);
    if(tm) tm.textContent = pad(m);
    if(ts) ts.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
});
