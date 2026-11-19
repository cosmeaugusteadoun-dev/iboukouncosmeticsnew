const fs = require('fs');
const p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');
const original = c;

// Supprimer les résidus du div skeleton loader (du div orphelin sk-logo-text jusqu'à la fermeture </div> du #skeletonLoader)
// Chercher le pattern qui reste : '<div class="sk-logo-text">...</div>\n      <div class="sk-nav-links">...'
let skeletonDivStart = c.indexOf('<div class="sk-logo-text">');
if (skeletonDivStart !== -1) {
  // Reculer jusqu'au début du div #skeletonLoader (le <div id="skeletonLoader"> pourrait avoir été supprimé)
  // Chercher le premier '<div' avant ce point
  let divStart = c.lastIndexOf('<div', skeletonDivStart);
  // Trouver la fin : le </div> qui ferme le skeleton loader (après skBody)
  let skeletonEnd = c.indexOf('</div>', skeletonDivStart);
  let skBodyEnd = c.indexOf('id="skBody"');
  if (skBodyEnd !== -1) {
    // Trouver le </div> après skBody
    let endDiv = c.indexOf('</div>', skBodyEnd);
    if (endDiv !== -1) {
      endDiv += '</div>'.length;
      c = c.substring(0, divStart) + c.substring(endDiv);
      console.log('Résidus div skeleton supprimés');
    }
  }
}

// Supprimer le script inline SKELETON LOADER
let scriptStart = c.indexOf('/* SKELETON LOADER (inchangé) */');
if (scriptStart !== -1) {
  let scriptEnd = c.indexOf('</script>', scriptStart);
  if (scriptEnd !== -1) {
    scriptEnd += '</script>'.length;
    c = c.substring(0, scriptStart) + c.substring(scriptEnd);
    console.log('Script inline skeleton supprimé');
  }
}

if (c !== original) {
  fs.writeFileSync(p, c, 'utf8');
  console.log('produits.html nettoyé avec succès');
} else {
  console.log('Aucune modification nécessaire');
}