const express = require('express');
const router = express.Router();
const entrenadoresController = require('../controllers/entrenadoresController');

// Rutas para entrenadores
router.get('/', entrenadoresController.getAllEntrenadores); // Obtener todos los entrenadores
router.get('/:id_entrenador', entrenadoresController.getEntrenadorById); // Obtener un entrenador por ID
router.post('/', entrenadoresController.createEntrenador); // Crear un nuevo entrenador

module.exports = router;