const ImageKit = require('imagekit');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const dataPath = path.join(__dirname, '../data/data.json');

function safeSaveData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    // Retry once if file lock occurred
    try {
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {}
  }
}

function cleanSearchTerm(name) {
  return name
    .replace(/\b\d+(\.\d+)?(kg|g|L|ml|mL|pcs|pc|p|s|mm|cm|m|oz|W|V|TB|GB|mAh|inch)\b/gi, '')
    .replace(/\b(Set|Pack|Box|Bundle|Pair|Kit)\b/gi, '')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim();
}

async function getUniqueImageCandidates(productName, categoryName) {
  const term = cleanSearchTerm(productName) || productName;
  const candidates = [];

  // 1. Unsplash Public Search
  try {
    const unsplashUrl = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(term)}&per_page=5`;
    const res = await axios.get(unsplashUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 4000
    });
    if (res.data?.results) {
      for (const item of res.data.results) {
        if (item.urls?.small) candidates.push(item.urls.small);
      }
    }
  } catch (e) {}

  // 2. Wikimedia Commons
  try {
    const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json`;
    const res = await axios.get(wikiUrl, {
      headers: { 'User-Agent': 'HypermarketApp/1.0' },
      timeout: 4000
    });
    const pages = res.data?.query?.pages;
    if (pages) {
      for (const pageId of Object.keys(pages)) {
        const url = pages[pageId]?.imageinfo?.[0]?.url;
        if (url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png'))) {
          candidates.push(url);
        }
      }
    }
  } catch (e) {}

  // 3. Fallback
  candidates.push(`https://loremflickr.com/600/600/${encodeURIComponent(term.split(' ')[0])}`);
  return candidates;
}

async function processProduct(p, index, total) {
  if (p.images && p.images[0] && p.images[0].url && p.images[0].url.includes('ik.imagekit.io')) {
    return false;
  }

  const cleanName = p.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const candidates = await getUniqueImageCandidates(p.name, p.categoryName);

  for (const imgUrl of candidates) {
    try {
      const res = await imagekit.upload({
        file: imgUrl,
        fileName: `${cleanName}-${Date.now()}.jpg`,
        folder: '/hypermarket/products',
      });

      p.images = [{ url: res.url, publicId: res.fileId }];
      console.log(`[${index + 1}/${total}] ✓ Uploaded ImageKit URL for: "${p.name}"`);
      return true;
    } catch (err) {}
  }
  return false;
}

async function fetchAndUploadUniqueImages() {
  if (!fs.existsSync(dataPath)) {
    console.error('data.json not found!');
    return;
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const total = data.products.length;
  console.log(`🚀 Finalizing unique image uploads for ${total} products...`);

  const BATCH_SIZE = 10;
  for (let i = 0; i < total; i += BATCH_SIZE) {
    const chunk = data.products.slice(i, i + BATCH_SIZE);
    const promises = chunk.map((p, chunkIdx) => processProduct(p, i + chunkIdx, total));
    
    await Promise.all(promises);
    safeSaveData(data);
    console.log(`  💾 Progress saved: ${Math.min(i + BATCH_SIZE, total)}/${total}`);
  }

  safeSaveData(data);
  console.log(`\n🎉 Finished processing all ${total} products!`);

  console.log('\nSyncing MongoDB database with unique ImageKit URLs...');
  const { execSync } = require('child_process');
  execSync('node data/seed.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  console.log('✅ Database sync complete!');
}

fetchAndUploadUniqueImages().catch(console.error);
