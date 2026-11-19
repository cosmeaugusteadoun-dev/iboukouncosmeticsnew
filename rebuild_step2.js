const fs = require('fs');
const crlf = '\r\n';

// Lire index.html pour extraire le div skeletonloader
let idx = fs.readFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\index.html', 'utf8');
let skStart = idx.indexOf('<!-- SKELETON LOADER -->');
let skBodyIdx = idx.indexOf('id="skBody"', skStart);
let skDivEnd = idx.indexOf('</div>', skBodyIdx) + '</div>'.length;
let skeletonDiv = idx.substring(skStart, skDivEnd) + crlf + crlf;
console.log('Div skeletonloader extrait, taille:', skeletonDiv.length);

// Lire products.html (après étape 1)
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');

// Insérer le div skeletonloader après <body>\r\n\r\n
let bodyIdx = c.indexOf('<body>');
let nlIdx = c.indexOf(crlf + crlf, bodyIdx);
let insertPos = nlIdx + crlf.length + crlf.length;
c = c.substring(0, insertPos) + skeletonDiv + c.substring(insertPos);

fs.writeFileSync(p, c, 'utf8');
console.log('Étape 2a terminée. Nouvelle taille:', c.length);