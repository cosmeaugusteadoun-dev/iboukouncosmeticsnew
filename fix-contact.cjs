const fs = require('fs');
const p = 'app/templates/contact.mjs';
let s = fs.readFileSync(p, 'utf8');
fs.writeFileSync(p + '.bak', s);

function swap(i, token, offset) {            // remplace le " du token par un backtick
  const q = i + offset;
  if (s[q] !== '"') throw new Error('guillemet introuvable pour ' + token);
  s = s.slice(0, q) + '`' + s.slice(q + 1);
}

// Chaîne 1 : du bouton WA jusqu'au CTA, qui contient le bloc carte
const open1 = String.raw`out += "\"\n           class=\"contact-wa-btn\"`;
const i1 = s.indexOf(open1);
if (i1 < 0) throw new Error('debut chaine 1 introuvable');
const map = s.indexOf('<section class="section contact-map-section">', i1);
if (map < 0) throw new Error('bloc carte introuvable');
const end1 = String.raw`wa.me/";`;
const j1 = s.indexOf(end1, map);
if (j1 < 0) throw new Error('fin chaine 1 introuvable');
swap(i1, 'open1', 'out += '.length);
swap(j1, 'end1', end1.length - 2);

// Chaîne 2 : le bloc <style>, qui contient le CSS de la carte
const open2 = String.raw`out += "\n\n<style>`;
const i2 = s.indexOf(open2);
if (i2 < 0) throw new Error('debut chaine 2 introuvable');
const end2 = String.raw`fetch('";`;
const j2 = s.indexOf(end2, i2);
if (j2 < 0) throw new Error('fin chaine 2 introuvable');
swap(i2, 'open2', 'out += '.length);
swap(j2, 'end2', end2.length - 2);

fs.writeFileSync(p, s);
console.log('OK, sauvegarde : ' + p + '.bak');