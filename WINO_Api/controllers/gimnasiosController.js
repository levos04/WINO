const gimnasioRepo = require('../repositories/gimnasios');

// Controlador para obtener todos los gimnasios
const getAllGimnasios = async (req, res) => {
    try {
        const gimnasios = await gimnasioRepo.getAllGimnasios();
        res.json(gimnasios);
    } catch (err) {
        console.error('Error al obtener gimnasios:', err);
        res.status(500).send('Error al obtener gimnasios');
    }
};

// Controlador para obtener un gimnasio por su ID
const getGimnasioById = async (req, res) => {
    try {
        const { id } = req.params;
        const gimnasio = await gimnasioRepo.getGimnasioById(id);
        if (!gimnasio) {
            return res.status(404).send('Gimnasio no encontrado');
        }
        res.json(gimnasio);
    } catch (err) {
        console.error('Error al obtener gimnasio:', err);
        res.status(500).send('Error al obtener gimnasio');
    }
};

// Controlador para crear un nuevo gimnasio
const createGimnasio = async (req, res) => {
    try {
        const { pais, estado, ciudad, direccion, cp, rfc, nombre, imagenPath } = req.body;

        // Validar que todos los campos están presentes
        if (!pais || !estado || !ciudad || !direccion || !cp || !rfc || !nombre || !imagenPath) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        // Crear gimnasio
        const newId = await gimnasioRepo.createGimnasio(pais, estado, ciudad, direccion, cp, rfc, nombre, imagenPath);
        res.status(201).json({ id: newId });
    } catch (err) {
        console.error('Error al crear gimnasio:', err);
        res.status(500).send('Error al crear gimnasio');
    }
};

// Exportar los controladores
module.exports = {
    getAllGimnasios,
    getGimnasioById,
    createGimnasio,
};