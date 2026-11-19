const fs = require('fs');
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\app\\templates\\videos.mjs';
let c = fs.readFileSync(p, 'utf8');

// Correction 1 : ajouter 'out += ' avant (e(v["titre"])) ?? "" dans la section Facebook
// Le pattern dans le fichier est : <div class=\"video-title\">(e(v[\"titre\"])) ?? "</div>
let old1 = '<div class=\\"video-title\\">(e(v[\\"titre\\"])) ?? \\"</div>';
let new1 = '<div class=\\"video-title\\">\\";\\n                    out += (e(v[\\"titre\\"])) ?? \\"\\";\\n                    out += \\"</div>';
let n1 = (c.split(old1)).length - 1;
console.log('old1 found:', n1);
if (n1 === 1) {
  c = c.replace(old1, new1);
  console.log('Correction 1 appliquée');
} else {
  console.log('Correction 1 : pattern non trouvé exactement, essai alternatif...');
  // Essai avec les séquences d'échappement telles qu'elles apparaissent dans le fichier
  let old1b = '<div class=\\"video-title\\">(e(v[\\"titre\\"])) ?? \\"</div>';
  // Le fichier utilise \\" pour représenter \"
  let old1c = '<div class=\\\\\\"video-title\\\\\\">(e(v[\\\\\\"titre\\\\\\"])) ?? \\\\\\"</div>';
  let n1c = (c.split(old1c)).length - 1;
  console.log('old1c found:', n1c);
}

// Correction 2 : ajouter la fermeture de boucle for
// Chercher la fin exacte : out += "...</div></div>";                }
let old2 = 'out += \"\\\\n                </div>\\\\n            </div>\\\\n            \";                }';
let new2 = 'out += \"\\\\n                </div>\\\\n            </div>\\\\n            \";\\n            }';
let n2 = (c.split(old2)).length - 1;
console.log('old2 found:', n2);
if (n2 === 1) {
  c = c.replace(old2, new2);
  console.log('Correction 2 appliquée');
} else {
  console.log('Correction 2 : pattern non trouvé');
  // Afficher les 200 derniers caractères pour debug
  console.log('Fin du fichier:', JSON.stringify(c.slice(-300)));
}

fs.writeFileSync(p, c, 'utf8');
console.log('Écriture terminée');