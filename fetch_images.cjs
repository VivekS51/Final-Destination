const fs = require('fs');

const places = [
    "Srinagar", "Gulmarg", "Pahalgam", "Leh", "Nubra Valley", "Pangong Lake",
    "Shimla", "Manali", "Dharamshala", "Spiti Valley", "Kasol",
    "Nainital", "Mussoorie", "Rishikesh", "Haridwar", "Auli",
    "Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Pushkar",
    "Rann of Kutch", "Dwarka", "Somnath", "Gir National Park",
    "Mumbai", "Lonavala", "Mahabaleshwar", "Ajanta Caves", "Ellora Caves",
    "Munnar", "Alleppey", "Kochi", "Wayanad",
    "Chennai", "Ooty", "Kodaikanal", "Rameswaram", "Madurai",
    "Bangalore", "Coorg", "Hampi", "Gokarna",
    "Hyderabad", "Tirupati", "Araku Valley",
    "Kolkata", "Darjeeling", "Sundarbans",
    "Gangtok", "Shillong", "Cherrapunji", "Kaziranga National Park", "Tawang", "Ziro Valley",
    "Khajuraho", "Bhopal", "Pachmarhi", "Kanha National Park",
    "Andaman and Nicobar Islands", "Havelock Island", "Lakshadweep",
    "Varanasi", "Amritsar", "Bodh Gaya", "Kedarnath", "Badrinath"
];

async function fetchImages() {
    let mapping = {};
    if (fs.existsSync('src/data/realImages.js')) {
        try {
            // we won't read it to append, we will just re-fetch all
        } catch(e) {}
    }
    
    for (const place of places) {
        try {
            const headers = { 'User-Agent': 'TravelAppBuilder/1.0 (test@example.com)' };
            let searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(place)}&utf8=&format=json`;
            let searchRes = await fetch(searchUrl, { headers });
            let searchData = await searchRes.json();
            
            if (searchData.query && searchData.query.search.length > 0) {
                let title = searchData.query.search[0].title;
                let summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
                let summaryRes = await fetch(summaryUrl, { headers });
                let summaryData = await summaryRes.json();
                
                if (summaryData.originalimage && summaryData.originalimage.source) {
                    mapping[place.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')] = summaryData.originalimage.source;
                    console.log(`Found image for ${place}`);
                } else {
                    console.log(`No image found for ${place}`);
                }
            } else {
                console.log(`No wiki page for ${place}`);
            }
        } catch (e) {
            console.log(`Error fetching ${place}: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 600));
    }
    
    fs.writeFileSync('src/data/realImages.js', `export const realImages = ${JSON.stringify(mapping, null, 4)};\n`);
    console.log('Done!');
}

fetchImages();
