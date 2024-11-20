const express = require('express');
const router = express.Router();
const gimnasiosController = require('../controllers/gimnasiosController');

// Rutas para gimnasios
router.get('/', gimnasiosController.getAllGimnasios); // Obtener todos los gimnasios
router.get('/:id', gimnasiosController.getGimnasioById); // Obtener un gimnasio por ID
router.post('/', gimnasiosController.createGimnasio); // Crear un nuevo gimnasio

module.exports = router;