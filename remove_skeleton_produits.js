const fs = require('fs');
const p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');
const original = c;

// 1. Supprimer le bloc div #skeletonLoader (de <!-- SKELETON LOADER --> à la fermeture </div> du loader)
let start = c.indexOf('<!-- SKELETON LOADER -->');
let end = c.indexOf('</div>', start);
if (start !== -1 && end !== -1) {
  end = end + '</div>'.length;
  c = c.substring(0, start) + c.substring(end);
  console.log('Bloc div skeleton supprimé');
} else {
  console.log('Bloc div skeleton non trouvé');
}

// 2. Supprimer le script inline SKELETON LOADER (de /* SKELETON LOADER (inchangé) */ à </script> qui suit)
start = c.indexOf('/* SKELETON LOADER (inchangé) */');
if (start !== -1) {
  // Trouver le </script> après ce commentaire
  let scriptEnd = c.indexOf('</script>', start);
  if (scriptEnd !== -1) {
    scriptEnd = scriptEnd + '</script>'.length;
    c = c.substring(0, start) + c.substring(scriptEnd);
    console.log('Script inline skeleton supprimé');
  } else {
    console.log('Fin de script non trouvée');
  }
} else {
  console.log('Commentaire SKELETON LOADER non trouvé');
}

if (c !== original) {
  fs.writeFileSync(p, c, 'utf8');
  console.log('produits.html modifié avec succès');
} else {
  console.log('Aucune modification effectuée');
}