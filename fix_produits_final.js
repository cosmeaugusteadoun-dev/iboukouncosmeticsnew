const fs = require('fs');
const crlf = '\r\n';

// Lire index.html comme référence (c'est la page qui fonctionne)
const idx = fs.readFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\index.html', 'utf8');

// Extraire de index.html :
// 1. Le head complet (avant <body>)
let idxBodyStart = idx.indexOf('<body>');
let headSection = idx.substring(0, idxBodyStart);

// 2. Le div skeleton loader
let skDivStart = idx.indexOf('<!-- SKELETON LOADER -->');
let skDivEnd = idx.indexOf('</div>', idx.indexOf('id="skBody"', skDivStart)) + '</div>'.length;
let skeletonDiv = idx.substring(skDivStart, skDivEnd);

// 3. Le script inline SKELETON LOADER
let scriptStart = idx.indexOf('/* ============================================================');
let scriptEnd = idx.indexOf('</script>', scriptStart) + '</script>'.length;
let skeletonScript = idx.substring(scriptStart, scriptEnd);

// Lire le contenu actuel de produits.html
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let prod = fs.readFileSync(p, 'utf8');

// Extraire le body content de produits (tout ce qui est entre <body> et </body>)
let prodBodyStart = prod.indexOf('<body>');
let prodBodyEnd = prod.indexOf('</body>');
let prodBodyContent = prod.substring(prodBodyStart + '<body>'.length, prodBodyEnd);

// Nettoyer le body content : supprimer tout résidu de skeleton loader cassé
// Supprimer les commentaires SKELETON LOADER et script inline cassés
let cleaned = prodBodyContent;

// Supprimer tout bloc commençant par <!-- SKELETON LOADER -->
while (cleaned.includes('<!-- SKELETON LOADER -->')) {
  let s = cleaned.indexOf('<!-- SKELETON LOADER -->');
  // Trouver la fin : le </div> après skBody ou </script>
  let skBodyPos = cleaned.indexOf('id="skBody"', s);
  if (skBodyPos !== -1) {
    let endDiv = cleaned.indexOf('</div>', skBodyPos);
    if (endDiv !== -1) {
      cleaned = cleaned.substring(0, s) + cleaned.substring(endDiv + '</div>'.length);
      continue;
    }
  }
  // Sinon supprimer jusqu'à </script> si présent
  let scEnd = cleaned.indexOf('</script>', s);
  if (scEnd !== -1) {
    cleaned = cleaned.substring(0, s) + cleaned.substring(scEnd + '</script>'.length);
    continue;
  }
  break;
}

// Supprimer tout bloc commençant par /* ============================================================ (script inline cassé)
while (cleaned.includes('/* ============================================================')) {
  let s = cleaned.indexOf('/* ============================================================');
  let scEnd = cleaned.indexOf('</script>', s);
  if (scEnd !== -1) {
    cleaned = cleaned.substring(0, s) + cleaned.substring(scEnd + '</script>'.length);
    continue;
  }
  break;
}

// Nettoyer les lignes vides multiples au début
cleaned = cleaned.replace(/^[\s\n\r]+/, '');

// 4. Reconstituer le fichier complet
let newFile = headSection + crlf + crlf +
  skeletonDiv + crlf + crlf +
  skeletonScript + crlf + crlf +
  cleaned +
  crlf + '</body></html>';

fs.writeFileSync(p, newFile, 'utf8');
console.log('Fichier reconstruit. Taille:', newFile.length);
console.log('Contient skeleton div:', newFile.includes('<div id="skeletonLoader">'));
console.log('Contient skeleton script:', newFile.includes('SKELETON LOADER (inchangé)'));
console.log('Contient ticker:', newFile.includes('TICKER DÉFILANT'));
console.log('Contient forms.js:', newFile.includes('forms.js'));
console.log('Contient public.js:', newFile.includes('public.js'));