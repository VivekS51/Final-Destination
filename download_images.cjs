const fs = require('fs');
const https = require('https');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'images', 'destinations');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

let destinationsContent = fs.readFileSync('src/data/destinations.js', 'utf8');
const urls = [...destinationsContent.matchAll(/id:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g)].map(m => ({ id: m[1], url: m[2] }));

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };
        https.get(url, options, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(filepath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            } else {
                reject(new Error(`Failed with status code: ${res.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

async function run() {
    for (let { id, url } of urls) {
        if (!url.startsWith('http')) continue;
        const filepath = path.join(destDir, `${id}.jpg`);
        try {
            console.log(`Downloading ${id}...`);
            await downloadImage(url, filepath);
            
            // Replace url in file
            const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?image:\\s*')https://upload.wikimedia.org[^']+(')`, 'g');
            destinationsContent = destinationsContent.replace(regex, `$1/images/destinations/${id}.jpg$2`);
            
            console.log(`Saved ${id}`);
        } catch (e) {
            console.log(`Failed to download ${id}: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 2000)); // 2 sec delay to avoid 429
    }
    fs.writeFileSync('src/data/destinations.js', destinationsContent);
    console.log('Done!');
}
run();
