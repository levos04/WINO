const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rutas para clientes
router.get('/', clientesController.getAllClientes); // Obtener todos los clientes
router.get('/:id_cliente', clientesController.getClienteById); // Obtener un cliente por ID
router.post('/', clientesController.createCliente); // Crear un nuevo cliente
router.post('/login', clientesController.getClienteByUsername); // Obtener cliente por username y password
router.put('/update-codigo', clientesController.updateClienteCodigo); // Actualizar código de gimnasio del cliente

module.exports = router;