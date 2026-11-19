const fs = require('fs');
const p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');

// Supprimer la partie incomplète si présente
let marker = `/* ============================================================
   SKELETON LOADER (inchangé)
============================================================ === */(function(){`;
let idx = c.indexOf(marker);
if (idx !== -1) {
  let endMarker = `  var html = ''`;
  let endIdx = c.indexOf(endMarker, idx) + endMarker.length;
  c = c.substring(0, idx) + c.substring(endIdx);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Partie incomplète supprimée');
} else {
  console.log('Aucune partie incomplète trouvée');
}