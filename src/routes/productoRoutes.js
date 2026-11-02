const express = require('express');
const productoController = require('../controllers/productoController');

const router = express.Router();

router.post('/productos', productoController.create);
router.get('/productos', productoController.findAll);
router.get('/productos/:id', productoController.findById);
router.put('/productos/:id', productoController.replace);
router.patch('/productos/:id', productoController.update);
router.delete('/productos/:id', productoController.remove);

module.exports = router;
