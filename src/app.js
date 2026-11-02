const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config/env');
const { version } = require('../package.json');
const HTTP_STATUS = require('./constants/httpStatus');
const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const notFoundHandler = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '10kb' }));

if (config.nodeEnv !== 'test') {
  app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
}

app.get('/', (_req, res) => {
  res.status(HTTP_STATUS.OK).json({
    mensaje: 'API REST Tienda de Computadores - Sistema de Facturación',
    version,
    rutas: {
      clientes: '/api/clientes',
      productos: '/api/productos',
      ventas: '/api/ventas',
    },
  });
});

app.get('/health', (_req, res) => {
  res.status(HTTP_STATUS.OK).json({ estado: 'ok' });
});

app.use('/api', clienteRoutes);
app.use('/api', productoRoutes);
app.use('/api', ventaRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
