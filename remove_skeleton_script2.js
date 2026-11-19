const fs = require('fs');
const p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');
const original = c;

// Chercher n'importe quelle occurrence de SKELETON LOADER dans le script
let start = c.indexOf('SKELETON LOADER');
if (start !== -1) {
  // Reculer jusqu'au début du commentaire /*
  let commentStart = c.lastIndexOf('/*', start);
  if (commentStart === -1) commentStart = start;
  
  let end = c.indexOf('</script>', start);
  if (end !== -1) {
    end += '</script>'.length;
    c = c.substring(0, commentStart) + c.substring(end);
    console.log('Script inline skeleton supprimé');
  } else {
    console.log('Fin de script non trouvée');
  }
} else {
  console.log('SKELETON LOADER non trouvé - peut-être déjà supprimé');
  // Vérifier s'il reste du code skProduct
  if (c.includes('skProduct')) {
    console.log('skProduct trouvé dans le fichier');
  }
}

if (c !== original) {
  fs.writeFileSync(p, c, 'utf8');
  console.log('produits.html nettoyé avec succès');
} else {
  console.log('Aucune modification');
}