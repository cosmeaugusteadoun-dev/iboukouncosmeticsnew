const fs = require('fs');
const crlf = '\r\n';
let prod = fs.readFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html', 'utf8');

// Trouver le body content (entre <body> et </body>)
let bodyStart = prod.indexOf('<body>');
let bodyEnd = prod.indexOf('</body>');
let bodyContent = prod.substring(bodyStart + '<body>'.length, bodyEnd);

// Supprimer tout résidu de skeleton loader
let cleaned = bodyContent;
while (cleaned.includes('<!-- SKELETON LOADER -->')) {
  let s = cleaned.indexOf('<!-- SKELETON LOADER -->');
  let skBodyPos = cleaned.indexOf('id="skBody"', s);
  if (skBodyPos !== -1) {
    let endDiv = cleaned.indexOf('</div>', skBodyPos);
    if (endDiv !== -1) {
      cleaned = cleaned.substring(0, s) + cleaned.substring(endDiv + '</div>'.length);
      continue;
    }
  }
  let scEnd = cleaned.indexOf('</script>', s);
  if (scEnd !== -1) {
    cleaned = cleaned.substring(0, s) + cleaned.substring(scEnd + '</script>'.length);
    continue;
  }
  break;
}
while (cleaned.includes('/* ============================================================')) {
  let s = cleaned.indexOf('/* ============================================================');
  let scEnd = cleaned.indexOf('</script>', s);
  if (scEnd !== -1) {
    cleaned = cleaned.substring(0, s) + cleaned.substring(scEnd + '</script>'.length);
    continue;
  }
  break;
}

// Nettoyer lignes vides au début
cleaned = cleaned.replace(/^[\s\n\r]+/, '');

fs.writeFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\_prod_content.html', cleaned, 'utf8');
console.log('Contenu produits extrait, taille:', cleaned.length);