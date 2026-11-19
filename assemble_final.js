const fs = require('fs');
const crlf = '\r\n';
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';

// Lire les parties
let head = fs.readFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\_head_section.html', 'utf8');
let prodContent = fs.readFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\_prod_content.html', 'utf8');

// Extraire le div skeletonloader et le script inline de index.html
let idx = fs.readFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\index.html', 'utf8');

let skDivStart = idx.indexOf('<!-- SKELETON LOADER -->');
let skDivEnd = idx.indexOf('</div>', idx.indexOf('id="skBody"', skDivStart)) + '</div>'.length;
let skeletonDiv = idx.substring(skDivStart, skDivEnd);

// Trouver le script inline : chercher <script> avant SKELETON LOADER
let scriptTagStart = idx.lastIndexOf('<script', idx.indexOf('/* ============================================================'));
if (scriptTagStart === -1) scriptTagStart = idx.lastIndexOf('<script', idx.indexOf('SKELETON LOADER'));
let scriptTagEnd = idx.indexOf('>', scriptTagStart) + 1;
let scriptContentStart = scriptTagEnd;
let scriptContentEnd = idx.indexOf('</script>', scriptContentStart) + '</script>'.length;
let fullScriptBlock = idx.substring(scriptTagStart, scriptContentEnd);

console.log('Head:', head.length);
console.log('Skeleton div:', skeletonDiv.length);
console.log('Full script block:', fullScriptBlock.length);
console.log('Prod content:', prodContent.length);

// Construire le fichier
let newFile = head + crlf + crlf +
  skeletonDiv + crlf + crlf +
  fullScriptBlock + crlf + crlf +
  prodContent +
  crlf + '</body></html>';

fs.writeFileSync(p, newFile, 'utf8');
console.log('Fichier assemblé. Taille:', newFile.length);
console.log('Contient </style> avant head fin:', head.includes('</style>') ? 'OUI' : 'NON');
console.log('Contient <script>:', newFile.includes('<script'));
console.log('Contient </script>:', newFile.includes('</script>'));