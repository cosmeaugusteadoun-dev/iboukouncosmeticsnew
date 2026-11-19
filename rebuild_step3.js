const fs = require('fs');
const crlf = '\r\n';

// Lire index.html pour extraire le script inline SKELETON LOADER
let idx = fs.readFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\index.html', 'utf8');
let scriptStart = idx.indexOf('/* ============================================================');
if (scriptStart === -1) scriptStart = idx.indexOf('<!-- SKELETON LOADER (inchangé) -->');
let scriptEnd = idx.indexOf('</script>', scriptStart) + '</script>'.length;
let skeletonScript = idx.substring(scriptStart, scriptEnd) + crlf + crlf;
console.log('Script inline extrait, taille:', skeletonScript.length);

// Lire products.html (après étape 2a)
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');

// Insérer le script inline avant le ticker
let tickerIdx = c.indexOf('<!-- TICKER DÉFILANT -->');
if (tickerIdx !== -1) {
  c = c.substring(0, tickerIdx) + skeletonScript + c.substring(tickerIdx);
  console.log('Script inline inséré avant le ticker');
} else {
  console.log('Ticker non trouvé!');
  process.exit(1);
}

fs.writeFileSync(p, c, 'utf8');
console.log('Étape 2b terminée. Nouvelle taille:', c.length);