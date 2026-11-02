const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.post('/clientes', clienteController.create);
router.get('/clientes', clienteController.findAll);
router.get('/clientes/:id/ventas', clienteController.getVentasByCliente);
router.get('/clientes/:id', clienteController.findById);
router.put('/clientes/:id', clienteController.replace);
router.patch('/clientes/:id', clienteController.update);
router.delete('/clientes/:id', clienteController.remove);

module.exports = router;
