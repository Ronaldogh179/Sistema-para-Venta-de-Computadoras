const config = require('./src/config/env');
const app = require('./src/app');
const { connectDatabase, disconnectDatabase } = require('./src/config/database');
const logger = require('./src/utils/logger');

let server;
let isShuttingDown = false;

const startServer = async () => {
  try {
    await connectDatabase();
    server = app.listen(config.port, () => {
      logger.info(`Servidor corriendo en http://localhost:${config.port}`);
    });
  } catch (error) {
    logger.error(`No se pudo iniciar el servidor: ${error.message}`);
    process.exitCode = 1;
  }
};

const closeServer = () =>
  new Promise((resolve, reject) => {
    if (!server) {
      resolve();
      return;
    }

    server.close((error) => (error ? reject(error) : resolve()));
  });

const shutdown = async (signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  logger.info(`Señal ${signal} recibida. Cerrando servidor...`);

  try {
    await closeServer();
    await disconnectDatabase();
    process.exitCode = 0;
  } catch (error) {
    logger.error(`Error al cerrar la aplicación: ${error.message}`);
    process.exitCode = 1;
  }
};

const handleShutdown = (signal) => {
  shutdown(signal).catch((error) => {
    logger.error(`Error al cerrar la aplicación: ${error.message}`);
    process.exitCode = 1;
  });
};

const handleFatalError = (error) => {
  const detail = error instanceof Error ? error.message : String(error);
  logger.error(`Error no controlado: ${detail}`);
  handleShutdown('fatal');
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

process.on('unhandledRejection', handleFatalError);
process.on('uncaughtException', handleFatalError);

startServer();
