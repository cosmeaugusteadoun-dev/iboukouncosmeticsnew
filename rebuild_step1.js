const fs = require('fs');
const p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');
const crlf = '\r\n';
console.log('Taille:', c.length);

// Extraire head (avant <body>)
let bodyIdx = c.indexOf('<body>');
let head = c.substring(0, bodyIdx + '<body>'.length);

// Extraire body content (après <body>, avant </body>)
let bodyEndIdx = c.indexOf('</body>');
let bodyContent = c.substring(bodyIdx + '<body>'.length, bodyEndIdx);
console.log('Body content:', bodyContent.length);

// Supprimer div skeletonloader cassé
let skDivStart = bodyContent.indexOf('<!-- SKELETON LOADER -->');
if (skDivStart !== -1) {
  let skBodyIdx = bodyContent.indexOf('id="skBody"', skDivStart);
  if (skBodyIdx !== -1) {
    let divEnd = bodyContent.indexOf('</div>', skBodyIdx);
    if (divEnd !== -1) {
      divEnd += '</div>'.length;
      let afterDiv = bodyContent.indexOf(crlf + crlf, divEnd);
      if (afterDiv !== -1) {
        bodyContent = bodyContent.substring(0, skDivStart) + bodyContent.substring(afterDiv + crlf.length + crlf.length);
      } else {
        bodyContent = bodyContent.substring(0, skDivStart) + bodyContent.substring(divEnd);
      }
      console.log('Div skeletonloader supprimé');
    }
  }
}

// Supprimer script inline cassé
let scriptStart = bodyContent.indexOf('/* ============================================================');
if (scriptStart === -1) scriptStart = bodyContent.indexOf('<!-- SKELETON LOADER (inchangé) -->');
if (scriptStart !== -1) {
  let scriptEnd = bodyContent.indexOf('</script>', scriptStart);
  if (scriptEnd !== -1) {
    scriptEnd += '</script>'.length;
    let afterScript = bodyContent.indexOf(crlf + crlf, scriptEnd);
    if (afterScript !== -1) {
      bodyContent = bodyContent.substring(0, scriptStart) + bodyContent.substring(afterScript + crlf.length + crlf.length);
    } else {
      bodyContent = bodyContent.substring(0, scriptStart) + bodyContent.substring(scriptEnd);
    }
    console.log('Script inline cassé supprimé');
  }
}

// Nettoyer lignes vides au début
bodyContent = bodyContent.replace(/^[\s\n\r]+/, '');

// Sauvegarder pour étape 2
fs.writeFileSync(p, head + crlf + crlf + bodyContent + crlf + '</body></html>', 'utf8');
console.log('Étape 1 terminée. Nouvelle taille:', (head.length + bodyContent.length + 50));