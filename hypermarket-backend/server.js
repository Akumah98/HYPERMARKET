const app = require('./src/app');
const connectDB = require('./src/config/db');
const { port, validateEnv } = require('./src/config/env');

const start = async () => {
  try {
    validateEnv();
    await connectDB();

    // Bootstrap all event-driven subscribers
    require('./src/subscribers/index');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(`Startup failed: ${error.message}`);
    process.exit(1);
  }
};

start();
