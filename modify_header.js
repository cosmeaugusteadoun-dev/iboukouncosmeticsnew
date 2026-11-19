const fs = require('fs');
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\app\\templates\\header.mjs';
let c = fs.readFileSync(p, 'utf8');
let lines = c.split('\n');

// Trouver la ligne contenant ri-video-line (unique dans ce fichier)
let idx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('ri-video-line')) {
    idx = i;
    break;
  }
}
console.log('Ligne ri-video-line:', idx);

// Trouver le début du bloc (la ligne qui contient "out += \"\\" onclick=")
let blockStart = idx;
while (blockStart > 0 && !lines[blockStart].includes('onclick=\\"menuClose()\\"')) {
  blockStart--;
}
console.log('blockStart:', blockStart);

// Trouver la fin du bloc (ligne contenant mobile-menu-sep)
let blockEnd = idx;
while (blockEnd < lines.length && !lines[blockEnd].includes('mobile-menu-sep')) {
  blockEnd++;
}
console.log('blockEnd:', blockEnd);

if (blockStart !== -1 && blockEnd !== -1) {
  // Insérer "if (!empty(videos)) {" avant blockStart
  lines.splice(blockStart, 0, 'if (!empty(videos)) {');
  
  // Après insertion, blockEnd est décalé de +1
  let newEnd = blockEnd + 1;
  // Insérer "}" après la ligne mobile-menu-sep
  lines.splice(newEnd + 1, 0, '}');
  
  c = lines.join('\n');
  fs.writeFileSync(p, c, 'utf8');
  console.log('header.mjs modifié avec succès');
} else {
  console.log('ÉCHEC : bloc non trouvé');
}