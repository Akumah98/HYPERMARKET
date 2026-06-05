const dotenv = require('dotenv');

dotenv.config();

const requiredVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'FAPSHI_BASE_URL',
  'FAPSHI_API_KEY',
  'FAPSHI_API_USER',
];

const validateEnv = () => {
  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join('\n')}`
    );
  }
};

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  fapshi: {
    baseUrl: process.env.FAPSHI_BASE_URL,
    apiKey: process.env.FAPSHI_API_KEY,
    apiUser: process.env.FAPSHI_API_USER,
  },
  expoAccessToken: process.env.EXPO_ACCESS_TOKEN,
  validateEnv,
};
