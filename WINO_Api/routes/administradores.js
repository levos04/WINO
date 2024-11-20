const express = require('express');
const router = express.Router();
const administradoresController = require('../controllers/administradoresController');

// Rutas para administradores
router.get('/', administradoresController.getAllAdministradores); // Obtener todos los administradores
router.get('/:id_admin', administradoresController.getAdministradorById); // Obtener un administrador por ID
router.post('/', administradoresController.createAdministrador); // Crear un nuevo administrador

module.exports = router;