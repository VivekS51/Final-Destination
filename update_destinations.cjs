const fs = require('fs');
let content = fs.readFileSync('src/data/destinations.js', 'utf8');

const images = {
    'goa': 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Palolem_Beach_Goa.jpg',
    'ladakh': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Leh_City_seen_from_Shanti_Stupa.JPG',
    'kerala': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Alappuzha_Boat_Beauty_W.jpg',
    'jaipur': 'https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg',
    'varanasi': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg',
    'agra': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Taj_Mahal_in_March_2004.jpg',
    'rishikesh': 'https://upload.wikimedia.org/wikipedia/commons/7/74/Trayambakeshwar_Temple_VK.jpg',
    'udaipur': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Evening_view%2C_City_Palace%2C_Udaipur.jpg',
    'manali': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Manali_city.jpg',
    'darjeeling': 'https://upload.wikimedia.org/wikipedia/commons/9/96/DarjeelingTrainFruitshop_%282%29.jpg',
    'mysore': 'https://upload.wikimedia.org/wikipedia/commons/5/52/Mysore_Palace_Morning.jpg',
    'hampi': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg',
    'andaman': 'https://upload.wikimedia.org/wikipedia/commons/6/63/Havelock%2C_Andaman_%26_Nicobar_Islands.JPG',
    'amritsar': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Golden_Temple_Amritsar_Gurudwara_%28cropped%29.jpg',
    'srinagar': 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Red_and_Yellow_Tulips.JPG'
};

for (const [id, url] of Object.entries(images)) {
    const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?image:\\s*')https://loremflickr.com[^']*(')`, 'g');
    content = content.replace(regex, `$1${url}$2`);
}

fs.writeFileSync('src/data/destinations.js', content);
console.log('Updated destinations.js');
