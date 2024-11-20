const entrenadorRepo = require('../repositories/entrenadores');

// Controlador para obtener todos los entrenadores
const getAllEntrenadores = async (req, res) => {
    try {
        const entrenadores = await entrenadorRepo.getAllEntrenadores();
        res.json(entrenadores);
    } catch (err) {
        console.error('Error al obtener entrenadores:', err);
        res.status(500).send('Error al obtener entrenadores');
    }
};

// Controlador para obtener un entrenador por su ID
const getEntrenadorById = async (req, res) => {
    try {
        const { id_entrenador } = req.params;
        const entrenador = await entrenadorRepo.getEntrenadorById(id_entrenador);
        if (!entrenador) {
            return res.status(404).send('Entrenador no encontrado');
        }
        res.json(entrenador);
    } catch (err) {
        console.error('Error al obtener entrenador:', err);
        res.status(500).send('Error al obtener entrenador');
    }
};

// Controlador para crear un nuevo entrenador
const createEntrenador = async (req, res) => {
    try {
        const { nombre, apellido, fecha_nacimiento, contacto, username, password } = req.body;

        // Validar que todos los campos están presentes
        if (!nombre || !apellido || !fecha_nacimiento || !contacto || !username || !password) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        // Crear entrenador
        const newId = await entrenadorRepo.createEntrenador(nombre, apellido, fecha_nacimiento, contacto, username, password);
        res.status(201).json({ id: newId });
    } catch (err) {
        console.error('Error al crear entrenador:', err);
        res.status(500).send('Error al crear entrenador');
    }
};

// Exportar los controladores
module.exports = {
    getAllEntrenadores,
    getEntrenadorById,
    createEntrenador,
};