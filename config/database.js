const mongoose = require('mongoose');
const config = require('./env');
const logger = require('../utils/logger');

const connectDatabase = async () => {
  await mongoose.connect(config.mongoUri);
  logger.info('Conexión a MongoDB establecida');
};

const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    logger.info('Conexión a MongoDB cerrada');
  }
};

module.exports = { connectDatabase, disconnectDatabase };
