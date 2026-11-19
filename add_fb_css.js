const fs = require('fs');
let p = 'c:\\Users\\hp\\Desktop\\iboukoun_refonte - Copie\\app\\templates\\videos.mjs';
let c = fs.readFileSync(p, 'utf8');

let oldEnd = '"}</style>\\n\\n<script>';
let newEnd = '"    .video-facebook .video-thumb { cursor:pointer; }\\n" +\n"    .video-facebook-badge { position:absolute; top:12px; left:12px; z-index:2; display:flex; align-items:center; gap:8px; background:rgba(0,0,0,.55); color:#fff; padding:6px 10px; border-radius:20px; font-size:13px; font-weight:600; backdrop-filter:blur(4px); }\\n" +\n"    .video-facebook-badge i { font-size:16px; color:#1877f2; }\\n" +\n"    .video-desc { color:var(--text2,#4A4F6A); font-size:14px; line-height:1.5; margin-top:6px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }\\n" +\n"    @media(max-width:620px){ .video-facebook .video-thumb { height:170px; } }\\n" +\n"}</style>\\n\\n<script>';

let n = (c.split(oldEnd)).length - 1;
console.log('oldEnd found:', n);
if (n === 1) {
  c = c.replace(oldEnd, newEnd);
  fs.writeFileSync(p, c, 'utf8');
  console.log('CSS Facebook ajouté avec succès');
} else {
  console.log('ÉCHEC : pattern non trouvé');
}