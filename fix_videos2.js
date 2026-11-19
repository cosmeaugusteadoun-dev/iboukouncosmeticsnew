const fs = require('fs');
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\app\\templates\\videos.mjs';
let c = fs.readFileSync(p, 'utf8');

// Trouver le début de la boucle for
let forStart = c.indexOf('for (var v of videos) {');
console.log('forStart:', forStart);

if (forStart === -1) {
  console.log('ERREUR : boucle for non trouvée');
  process.exit(1);
}

// Trouver la fin de la boucle en comptant les accolades
let depth = 0;
let forEnd = -1;
let inString = false;
let stringChar = null;
for (let i = forStart; i < c.length; i++) {
  let ch = c[i];
  // Gestion des chaînes de caractères (pour ne pas compter les accolades dans les chaînes)
  if (!inString && (ch === '"' || ch === "'" || ch === '`')) {
    inString = true;
    stringChar = ch;
  } else if (inString && ch === stringChar) {
    // Vérifier si c'est échappé
    let backslashes = 0;
    let j = i - 1;
    while (j >= 0 && c[j] === '\\') { backslashes++; j--; }
    if (backslashes % 2 === 0) inString = false;
  }
  if (!inString) {
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        forEnd = i;
        break;
      }
    }
  }
}
console.log('forEnd:', forEnd, 'depth final:', depth);

if (forEnd === -1) {
  console.log('ERREUR : fin de boucle non trouvée');
  process.exit(1);
}

// Inclure le point-virgule après la accolade fermante si présent
let endInclusive = forEnd + 1;
if (c[endInclusive] === ';') endInclusive++;

// Nouvelle boucle avec support YouTube + Facebook
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
                    out += "\\">\\n                    <div class=\\"video-overlay\\"></div>\\n                    <div class=\\"video-facebook-badge\\">\\n                        <i class=\\"ri-facebook-fill\\"></i><span>Facebook</span>\\n                    </div>\\n                </div>\\n                <div class=\\"video-info\\">\\n                    <div class=\\"video-title\\">";
                    out += (e(v["titre"])) ?? "";
                    out += "</div>\\n                    ";
                    if (!empty(v["notes"])) {
                        out += "\\n                    <div class=\\"video-desc\\">";
                        out += (e(v["notes"])) ?? "";
                        out += "</div>\\n                    ";
                    }
                    out += "\\n                </div>\\n            </div>\\n            ";
                } else if (isYoutube) {
                    yt_id = v["youtube_id"] || get_youtube_id(url);
                    thumb = yt_id
                        ? ("https://img.youtube.com/vi/"+yt_id+"/hqdefault.jpg")
                        : null;
                    out += "\\n            <div class=\\"video-card reveal\\">\\n                <div class=\\"video-thumb\\"\\n                     onclick=\\"openVideo('";
                    out += (js_string(e(yt_id ?? ""))) ?? "";
                    out += "', '";
                    out += (e(v["titre"])) ?? "";
                    out += "')\\"\\n                     style=\\"";
                    out += (thumb ? ("background:url('"+thumb+"') center/cover no-repeat,var(--navy)") : "background:linear-gradient(135deg,var(--navy),#162380)") ?? "";
                    out += "\\">\\n                    <div class=\\"video-overlay\\"></div>\\n                    <div class=\\"play-btn\\">\\n                        <i class=\\"ri-play-fill\\"></i>\\n                    </div>\\n                </div>\\n                <div class=\\"video-info\\">\\n                    <div class=\\"video-title\\">";
                    out += (e(v["titre"])) ?? "";
                    out += "</div>\\n                    ";
                    if (!empty(v["date_pub"])) {
                        out += "\\n                    <div class=\\"video-meta\\">\\n                        <i class=\\"ri-calendar-line\\"></i>\\n                        ";
                        out += (format_date(v["date_pub"])) ?? "";
                        out += "\\n                    </div>\\n                    ";
                    }
                    out += "\\n                </div>\\n            </div>\\n            ";
                }
            `;

c = c.substring(0, forStart) + newLoop + c.substring(endInclusive);
fs.writeFileSync(p, c, 'utf8');
console.log('videos.mjs réparé avec succès');