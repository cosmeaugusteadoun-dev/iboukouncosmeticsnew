const fs = require('fs');
const p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\produits.html';
let c = fs.readFileSync(p, 'utf8');
const original = c;
const crlf = '\r\n';

// Insérer le div #skeletonLoader juste après <body>\r\n\r\n
let bodyIdx = c.indexOf('<body>');
let nlIdx = c.indexOf(crlf + crlf, bodyIdx);
let insertPos = nlIdx + crlf.length + crlf.length;

const skeletonDiv = `<!-- SKELETON LOADER -->${crlf}<div id="skeletonLoader">${crlf}  <div class="sk-nav">${crlf}    <div class="sk-nav-inner">${crlf}      <div class="sk-logo">${crlf}        <div class="sk-box sk-logo-img"></div>${crlf}        <div class="sk-logo-text">${crlf}          <div class="sk-box sk-line" style="width:140px;height:14px;"></div>${crlf}          <div class="sk-box sk-line" style="width:80px;height:9px;margin-top:4px;"></div>${crlf}        </div>${crlf}      </div>${crlf}      <div class="sk-nav-links">${crlf}        <div class="sk-box sk-line" style="width:56px;height:12px;"></div>${crlf}        <div class="sk-box sk-line" style="width:56px;height:12px;"></div>${crlf}        <div class="sk-box sk-line" style="width:80px;height:12px;"></div>${crlf}        <div class="sk-box sk-line" style="width:72px;height:12px;"></div>${crlf}        <div class="sk-box sk-line" style="width:56px;height:12px;"></div>${crlf}      </div>${crlf}      <div class="sk-box sk-btn-nav"></div>${crlf}    </div>${crlf}  </div>${crlf}  <div class="sk-body" id="skBody"></div>${crlf}</div>${crlf}${crlf}`;

c = c.substring(0, insertPos) + skeletonDiv + c.substring(insertPos);

fs.writeFileSync(p, c, 'utf8');
console.log('Div skeleton restauré avec succès');