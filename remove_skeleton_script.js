const fs = require('fs');
const p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');
const original = c;

let start = c.indexOf('/* SKELETON LOADER (inchangé) */');
if (start !== -1) {
  let end = c.indexOf('</script>', start);
  if (end !== -1) {
    end += '</script>'.length;
    c = c.substring(0, start) + c.substring(end);
    console.log('Script inline skeleton supprimé');
  } else {
    console.log('Fin de script non trouvée');
  }
} else {
  console.log('Commentaire SKELETON LOADER non trouvé');
}

if (c !== original) {
  fs.writeFileSync(p, c, 'utf8');
  console.log('produits.html nettoyé avec succès');
} else {
  console.log('Aucune modification');
}