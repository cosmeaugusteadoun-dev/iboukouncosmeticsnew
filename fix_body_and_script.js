const fs = require('fs');
const crlf = '\r\n';
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');

// 1. Ajouter <body> après </head> s'il manque
let headEnd = c.indexOf('</head>');
if (headEnd !== -1) {
  let afterHead = headEnd + '</head>'.length;
  if (!c.substring(afterHead, afterHead + 7).includes('<body>')) {
    c = c.substring(0, afterHead) + crlf + '<body>' + c.substring(afterHead);
    console.log('<body> ajouté après </head>');
  }
}

// 2. Insérer le script inline après le div skeletonloader
let skDivEnd = c.indexOf('</div>', c.indexOf('id="skBody"'));
if (skDivEnd !== -1) {
  skDivEnd += '</div>'.length;
  
  // Vérifier si le script inline est déjà présent
  if (!c.includes('SKELETON LOADER (inchangé)')) {
    // Extraire le script inline de index.html
    let idx = fs.readFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\index.html', 'utf8');
    // Chercher le script qui contient SKELETON LOADER
    let slIdx = idx.indexOf('SKELETON LOADER');
    if (slIdx !== -1) {
      // Reculer pour trouver <script
      let scriptOpen = idx.lastIndexOf('<script', slIdx);
      if (scriptOpen !== -1) {
        let scriptClose = idx.indexOf('</script>', slIdx) + '</script>'.length;
        let inlineScript = idx.substring(scriptOpen, scriptClose);
        console.log('Script inline extrait, taille:', inlineScript.length);
        c = c.substring(0, skDivEnd) + crlf + crlf + inlineScript + crlf + c.substring(skDivEnd);
        console.log('Script inline inséré');
      } else {
        console.log('Balise <script> non trouvée dans index.html');
      }
    } else {
      console.log('SKELETON LOADER non trouvé dans index.html');
    }
  } else {
    console.log('Script inline déjà présent');
  }
}

fs.writeFileSync(p, c, 'utf8');
console.log('Fichier corrigé. Taille:', c.length);