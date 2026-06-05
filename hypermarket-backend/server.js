const app = require('./src/app');
const connectDB = require('./src/config/db');
const { port, validateEnv } = require('./src/config/env');

const start = async () => {
  try {
    validateEnv();
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(`Startup failed: ${error.message}`);
    process.exit(1);
  }
};

start();
