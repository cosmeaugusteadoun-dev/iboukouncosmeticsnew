const fs = require('fs');
const base = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\app\\templates\\';

// ===== 1. header.mjs : masquer le lien Vidéos quand pas de vidéos =====
let p1 = base + 'header.mjs';
let c1 = fs.readFileSync(p1, 'utf8');

let lines = c1.split('\n');

// Trouver la ligne qui commence le bloc vidéo mobile
let videoStart = -1;
let videoEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('videos.php" class="mobile-nav-item')) {
    videoStart = i;
  }
  if (videoStart !== -1 && lines[i].includes('mobile-menu-sep')) {
    videoEnd = i;
    break;
  }
}
console.log('header.mjs: videoStart=' + videoStart + ', videoEnd=' + videoEnd);

if (videoStart !== -1 && videoEnd !== -1) {
  // Insérer "if (!empty(videos)) {" avant la ligne du lien vidéos
  // Mais le lien commence à videoStart-1 (la ligne out += "\" onclick=...)
  // Cherchons le début réel du bloc
  let blockStart = videoStart;
  while (blockStart > 0 && !lines[blockStart].includes('out += "\\" onclick=')) {
    blockStart--;
  }
  
  // Insérer la condition avant blockStart
  lines.splice(blockStart, 0, 'if (!empty(videos)) {');
  
  // Après insertion, videoEnd est décalé de +1
  let newVideoEnd = videoEnd + 1;
  // Insérer la fermeture après la ligne mobile-menu-sep
  lines.splice(newVideoEnd + 1, 0, '}');
  
  c1 = lines.join('\n');
  fs.writeFileSync(p1, c1, 'utf8');
  console.log('header.mjs modifié avec succès');
} else {
  console.log('ÉCHEC header.mjs : bloc vidéo non trouvé');
}

// ===== 2. videos.mjs : support YouTube + Facebook =====
let p2 = base + 'videos.mjs';
let c2 = fs.readFileSync(p2, 'utf8');

let oldLoopStart = 'for (var v of videos) {';
let oldLoopEndMarker = 'out += "\\n        </div>\\n        ";';
let loopStart = c2.indexOf(oldLoopStart);
let loopEnd = c2.indexOf(oldLoopEndMarker, loopStart);
if (loopStart !== -1 && loopEnd !== -1) {
  loopEnd += oldLoopEndMarker.length;
  
  let newLoop = `for (var v of videos) {
                var url = String(v["youtube_url"] || "");
                var isFacebook = /facebook\\.com|fb\\.watch/i.test(url);
                var isYoutube = !isFacebook && (/youtube\\.com|youtu\\.be/i.test(url) || v["youtube_id"]);
                if (isFacebook) {
                    var fbImg = v["youtube_id"] ? v["youtube_id"] : "/assets/images/video-placeholder.jpg";
                    out += "\\n            <div class=\\"video-card reveal video-facebook\\" onclick=\\"window.location.href='";
                    out += (js_string(e(url))) ?? "";
                    out += "\\'\\">\\n                <div class=\\"video-thumb\\" style=\\"";
                    out += ("background:url('"+e(fbImg)+"') center/cover no-repeat,var(--navy)") ?? "";
                    out += "\\">\\n                    <div class=\\"video-overlay\\"></div>\\n                    <div class=\\"video-facebook-badge\\">\\n                        <i class=\\"ri-facebook-fill\\"></i><span>Facebook</span>\\n                    </div>\\n                </div>\\n                <div class=\\"video-info\\">\\n                    <div class=\\"video-title\\">`;
    newLoop += `(e(v["titre"])) ?? "`;
    newLoop += `</div>\\n                    `;
    newLoop += `                    if (!empty(v["notes"])) {
                        out += "\\n                    <div class=\\"video-desc\\">";
                        out += (e(v["notes"])) ?? "";
                        out += "</div>\\n                    ";
                    }
                    out += "\\n                </div>\\n            </div>\\n            ";
                } else if (isYoutube) {
`;
  
  // Garder la partie YouTube existante (à partir de "yt_id = ...")
  let youtubePartStart = c2.indexOf('                yt_id = v["youtube_id"]', loopStart);
  let youtubePart = c2.substring(youtubePartStart, loopEnd);
  newLoop += youtubePart;
  newLoop += `                }
            `;
  
  c2 = c2.substring(0, loopStart) + newLoop + c2.substring(loopEnd);
  
  // ===== 3. Ajouter CSS pour Facebook dans videos.mjs =====
  let cssEnd = c2.indexOf('\\n\\}</style>');
  if (cssEnd !== -1) {
    let fbCss = `
.video-facebook .video-thumb { cursor:pointer; }
.video-facebook-badge { position:absolute; top:12px; left:12px; z-index:2; display:flex; align-items:center; gap:8px; background:rgba(0,0,0,.55); color:#fff; padding:6px 10px; border-radius:20px; font-size:13px; font-weight:600; backdrop-filter:blur(4px); }
.video-facebook-badge i { font-size:16px; color:#1877f2; }
.video-desc { color:var(--text2,#4A4F6A); font-size:14px; line-height:1.5; margin-top:6px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
@media(max-width:620px){ .video-facebook .video-thumb { height:170px; } }
`;
    c2 = c2.substring(0, cssEnd) + fbCss + c2.substring(cssEnd);
  }
  
  fs.writeFileSync(p2, c2, 'utf8');
  console.log('videos.mjs modifié avec succès');
} else {
  console.log('ÉCHEC videos.mjs : boucle non trouvée. loopStart=' + loopStart + ', loopEnd=' + loopEnd);
}