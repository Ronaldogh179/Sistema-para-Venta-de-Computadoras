require('dotenv').config();

const config = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number.parseInt(process.env.PORT, 10) || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tienda_computadores',
  corsOrigin: process.env.CORS_ORIGIN || '*',
});

module.exports = config;
