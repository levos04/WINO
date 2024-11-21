const clienteRepo = require('../repositories/clientes');

// Controlador para obtener todos los clientes
const getAllClientes = async (req, res) => {
    try {
        const clientes = await clienteRepo.getAllClientes();
        res.json(clientes);
    } catch (err) {
        console.error('Error al obtener clientes:', err);
        res.status(500).send('Error al obtener clientes');
    }
};

// Controlador para obtener un cliente por su ID
const getClienteById = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const cliente = await clienteRepo.getClienteById(id_cliente);
        if (!cliente) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(cliente);
    } catch (err) {
        console.error('Error al obtener cliente:', err);
        res.status(500).send('Error al obtener cliente');
    }
};

// Controlador para crear un nuevo cliente
const createCliente = async (req, res) => {
    try {
        const { nombre, apellido, fecha_nacimiento, contacto, username, password } = req.body;

        // Validar que todos los campos están presentes
        if (!nombre || !apellido || !fecha_nacimiento || !contacto || !username || !password) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        // Crear cliente
        const newId = await clienteRepo.createCliente(nombre, apellido, fecha_nacimiento, contacto, username, password);
        res.status(201).json({ id: newId });
    } catch (err) {
        console.error('Error al crear cliente:', err);
        res.status(500).send('Error al crear cliente');
    }
};

// Controlador para obtener un cliente por su username y password
const getClienteByUsername = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validar que los campos están presentes
        if (!username || !password) {
            return res.status(400).send('Username y password son obligatorios');
        }

        const cliente = await clienteRepo.getClienteByUsername(username, password);
        if (!cliente) {
            return res.status(404).send('Cliente no encontrado o credenciales incorrectas');
        }
        res.json(cliente);
    } catch (err) {
        console.error('Error al obtener cliente por credenciales:', err);
        res.status(500).send('Error al obtener cliente');
    }
};

// Controlador para actualizar el código del cliente
const updateClienteCodigo = async (req, res) => {
    try {
        const { codigo_gym, username } = req.body;

        // Validar que los campos están presentes
        if (!codigo_gym || !username) {
            return res.status(400).send('Código de gimnasio y username son obligatorios');
        }

        const updatedCliente = await clienteRepo.UpdateClienteCodigo(codigo_gym, username);
        if (!updatedCliente) {
            return res.status(404).send('Cliente no encontrado o no se pudo actualizar');
        }
        res.json({ message: 'Código de gimnasio actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar código del cliente:', err);
        res.status(500).send('Error al actualizar cliente');
    }
};

// Exportar los controladores
module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    getClienteByUsername,
    updateClienteCodigo,
};