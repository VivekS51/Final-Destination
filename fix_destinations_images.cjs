const fs = require('fs');

async function fixImages() {
    let content = fs.readFileSync('src/data/destinations.js', 'utf8');
    
    // Extract titles using regex
    const titles = [...content.matchAll(/title:\s*'([^']+)'/g)].map(m => m[1]);
    
    for (let title of titles) {
        try {
            const headers = { 'User-Agent': 'TravelAppBuilder/1.0 (test@example.com)' };
            let searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(title)}&utf8=&format=json`;
            let searchRes = await fetch(searchUrl, { headers });
            let searchData = await searchRes.json();
            
            if (searchData.query && searchData.query.search.length > 0) {
                let wikiTitle = searchData.query.search[0].title;
                let summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
                let summaryRes = await fetch(summaryUrl, { headers });
                let summaryData = await summaryRes.json();
                
                if (summaryData.originalimage && summaryData.originalimage.source) {
                    let newUrl = summaryData.originalimage.source;
                    // Find the block for this title and replace its image
                    // This regex matches the title line, any intervening lines, and the image line.
                    const regex = new RegExp(`(title:\\s*'${title}'[\\s\\S]*?image:\\s*')[^']+(')`, 'g');
                    content = content.replace(regex, `$1${newUrl}$2`);
                    console.log(`Updated ${title} with ${newUrl}`);
                } else {
                    console.log(`No image found for ${title}`);
                }
            }
        } catch (e) {
            console.log(`Error on ${title}: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 600));
    }
    
    fs.writeFileSync('src/data/destinations.js', content);
    console.log('Done fixing destinations.js');
}

fixImages();
