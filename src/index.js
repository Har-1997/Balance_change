require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('../config/db');
const userRoutes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const umzug = require('../config/uzumg');
const compression = require('compression');

const { PORT=3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use('/api', userRoutes);
app.use(errorHandler);

(async () => {
  try {
    await initializeDatabase();  // Ensure DB exists and connect
    await umzug.up();  // Run migrations

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ server running on port ${PORT} and migrations completed successfully.`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
  }
})();