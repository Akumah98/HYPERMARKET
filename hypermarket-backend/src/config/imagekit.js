const ImageKit = require('imagekit');
const env = require('./env');
const multer = require('multer');

// Configure ImageKit client
const imagekit = new ImageKit({
  publicKey: env.imagekit.publicKey,
  privateKey: env.imagekit.privateKey,
  urlEndpoint: env.imagekit.urlEndpoint,
});

// Configure Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit to 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WEBP are allowed.'), false);
    }
  },
});

/**
 * Middleware that takes the memory buffers populated by Multer
 * and uploads them to ImageKit, setting file.path to the resulting URL.
 */
const uploadToImageKit = async (req, res, next) => {
  if (req.file) {
    try {
      const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`,
        folder: '/hypermarket/uploads',
      });
      req.file.path = response.url;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  if (!req.files || req.files.length === 0) {
    return next();
  }

  try {
    const uploadPromises = req.files.map(async (file) => {
      const response = await imagekit.upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
        folder: '/hypermarket/products',
      });
      
      // Map the generated URL to path so the controller's mapping works seamlessly
      file.path = response.url;
      file.publicId = response.fileId;
      return response;
    });

    await Promise.all(uploadPromises);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  imagekit,
  upload,
  uploadToImageKit,
};
