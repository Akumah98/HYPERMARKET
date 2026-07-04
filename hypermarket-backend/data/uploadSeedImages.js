const ImageKit = require('imagekit');
const fs = require('fs');
const path = require('path');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadSeedImages = async (products) => {
  const imageMap = {};
  const screenImagesDir = path.join(__dirname, '../../SCREEN IMAGES');

  if (!fs.existsSync(screenImagesDir)) {
    console.log('SCREEN IMAGES directory not found, seeding without images.');
    return imageMap;
  }

  console.log('Uploading product images to ImageKit...');
  for (const p of products) {
    const imageName = p.name + '.jpeg';
    let finalPath = path.join(screenImagesDir, imageName);

    if (!fs.existsSync(finalPath)) {
      const jpgPath = path.join(screenImagesDir, p.name + '.jpg');
      if (fs.existsSync(jpgPath)) {
        finalPath = jpgPath;
      } else if (p.name.toLowerCase().includes('wireless') && p.name.toLowerCase().includes('earbuds')) {
        const specialPath = path.join(screenImagesDir, 'wireless earbuds.jpg');
        if (fs.existsSync(specialPath)) finalPath = specialPath;
      } else {
        finalPath = null;
      }
    }

    if (finalPath) {
      try {
        const fileBuffer = fs.readFileSync(finalPath);
        const response = await imagekit.upload({
          file: fileBuffer,
          fileName: `${Date.now()}-${path.basename(finalPath).replace(/\s+/g, '-')}`,
          folder: '/hypermarket/products',
        });
        imageMap[p.name] = [{
          url: response.url,
          publicId: response.fileId
        }];
        console.log(`Uploaded image for: ${p.name}`);
      } catch (error) {
        console.error(`Failed to upload image for ${p.name}:`, error.message);
      }
    }
  }
  return imageMap;
};

module.exports = uploadSeedImages;
