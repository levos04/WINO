const db = require('../db'); // Importar el pool de conexiones

// Función para obtener todos los clientes
const getAllClientes = async () => {
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows;
};

// Función para obtener un cliente por su ID
const getClienteById = async (id_cliente) => {
    const [rows] = await db.query('SELECT * FROM clientes WHERE id_cliente = ?', [id_cliente]);
    return rows[0];
};

// Función para insertar un nuevo cliente
const createCliente = async (nombre, apellido, fecha_nacimiento, contacto, username, password) => {
    const [result] = await db.query(
        'INSERT INTO clientes (nombre, apellido, fecha_nacimiento, contacto, username, password) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellido, fecha_nacimiento, contacto, username, password]
    );
    return result.insertId; // Devuelve el ID del nuevo registro
};

// Función para obtener un cliente por su su Username y Password
const getClienteByUsername = async (username, password) => {
    const [rows] = await db.query('SELECT * FROM clientes WHERE username = ? AND password = ?', [username, password]);
    return rows[0];
};

// Función para agregar al cliente su código de gimnasio
const UpdateClienteCodigo = async (codigo_gym, username) => {
    const [rows] = await db.query('UPDATE clientes SET codigo_gym = ? WHERE username = ?', [codigo_gym, username]);
    return rows[0];
};

// Exportar las funciones
module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    getClienteByUsername,
    UpdateClienteCodigo
};