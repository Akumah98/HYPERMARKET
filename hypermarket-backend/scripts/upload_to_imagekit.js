const ImageKit = require('imagekit');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const dataPath = path.join(__dirname, '../data/data.json');

async function uploadAllToImageKit() {
  if (!fs.existsSync(dataPath)) {
    console.error('data.json not found!');
    return;
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  console.log(`Starting ImageKit bulk upload for ${data.products.length} products...`);

  let count = 0;
  // Process in small concurrent batches or sequentially to avoid rate limit
  for (let i = 0; i < data.products.length; i++) {
    const p = data.products[i];
    const currentImg = p.images && p.images[0] && p.images[0].url;

    if (currentImg && !currentImg.includes('ik.imagekit.io')) {
      try {
        const cleanName = p.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const res = await imagekit.upload({
          file: currentImg,
          fileName: `${cleanName}-${Date.now()}.jpg`,
          folder: '/hypermarket/products',
        });

        p.images = [{
          url: res.url,
          publicId: res.fileId,
        }];
        count++;
        if (count % 10 === 0 || count === 1) {
          console.log(`Uploaded [${count}/${data.products.length}]: ${p.name} -> ${res.url}`);
          fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
        }
      } catch (err) {
        console.error(`Failed to upload ${p.name}:`, err.message);
      }
    }
  }

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 Completed ImageKit upload! ${count} products updated with ImageKit CDN URLs.`);

  console.log('Syncing MongoDB database with ImageKit URLs...');
  const { execSync } = require('child_process');
  execSync('node data/seed.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  console.log('✅ Database sync complete!');
}

uploadAllToImageKit().catch(console.error);

