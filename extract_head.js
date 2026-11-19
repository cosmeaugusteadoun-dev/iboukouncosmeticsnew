const fs = require('fs');
const crlf = '\r\n';
let idx = fs.readFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\index.html', 'utf8');
let bodyStart = idx.indexOf('<body>');
let head = idx.substring(0, bodyStart);
fs.writeFileSync('c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\_head_section.html', head, 'utf8');
console.log('Head extrait, taille:', head.length);