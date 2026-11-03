const express = require('express');
const ventaController = require('../controllers/ventaController');

const router = express.Router();

router.post('/ventas', ventaController.createVenta);
router.get('/ventas', ventaController.getVentas);
router.get('/ventas/resumen-por-cliente', ventaController.getResumenVentasPorCliente);
router.get('/ventas/:id', ventaController.getVentaById);

module.exports = router;
