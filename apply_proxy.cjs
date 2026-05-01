const fs = require('fs');
let d = fs.readFileSync('src/data/destinations.js', 'utf8');
d = d.replace(/https:\/\/upload\.wikimedia\.org\/[^']+/g, m => 'https://images.weserv.nl/?url=' + encodeURIComponent(m));
fs.writeFileSync('src/data/destinations.js', d);

let r = fs.readFileSync('src/data/realImages.js', 'utf8');
r = r.replace(/https:\/\/upload\.wikimedia\.org\/[^\"']+/g, m => 'https://images.weserv.nl/?url=' + encodeURIComponent(m));
fs.writeFileSync('src/data/realImages.js', r);
console.log('Fixed proxy for all images');
