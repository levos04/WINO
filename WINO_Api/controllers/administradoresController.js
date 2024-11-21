const adminRepo = require('../repositories/administradores');

// Controlador para obtener todos los administradores
const getAllAdministradores = async (req, res) => {
    try {
        const administradores = await adminRepo.getAllAdministradores();
        res.json(administradores);
    } catch (err) {
        console.error('Error al obtener administradores:', err);
        res.status(500).send('Error al obtener administradores');
    }
};

// Controlador para obtener un administrador por su ID
const getAdministradorById = async (req, res) => {
    try {
        const { id_admin } = req.params;
        const administrador = await adminRepo.getAdministradorById(id_admin);
        if (!administrador) {
            return res.status(404).send('Administrador no encontrado');
        }
        res.json(administrador);
    } catch (err) {
        console.error('Error al obtener administrador:', err);
        res.status(500).send('Error al obtener administrador');
    }
};

// Controlador para crear un nuevo administrador
const createAdministrador = async (req, res) => {
    try {
        const { Nombre, Apellido, FechaNacimiento, Contacto, username, password, codigo } = req.body;

        // Validar que todos los campos están presentes
        if (!Nombre || !Apellido || !FechaNacimiento || !Contacto || !username || !password || !codigo) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        // Crear administrador
        const newId = await adminRepo.createAdministrador(Nombre, Apellido, FechaNacimiento, Contacto, username, password, codigo);
        res.status(201).json({ id: newId });
    } catch (err) {
        console.error('Error al crear administrador:', err);
        res.status(500).send('Error al crear administrador');
    }
};

// Exportar los controladores
module.exports = {
    getAllAdministradores,
    getAdministradorById,
    createAdministrador,
};