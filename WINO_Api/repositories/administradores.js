const db = require('../db'); // Importar el pool de conexiones

// Función para obtener todos los administradores
const getAllAdministradores = async () => {
    const [rows] = await db.query('SELECT * FROM administradores');
    return rows;
};

// Función para obtener un administrador por su ID
const getAdministradorById = async (id_admin) => {
    const [rows] = await db.query('SELECT * FROM administradores WHERE id_admin = ?', [id_admin]);
    return rows[0];
};

// Función para insertar un nuevo administrador
const createAdministrador = async (Nombre, Apellido, FechaNacimiento, Contacto, username, password, codigo) => {
    const [result] = await db.query(
        'INSERT INTO administradores (Nombre, Apellido, FechaNacimiento, Contacto, username, password, codigo) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Nombre, Apellido, FechaNacimiento, Contacto, username, password, codigo]
    );
    return result.insertId; // Devuelve el ID del nuevo registro
};

// Exportar las funciones
module.exports = {
    getAllAdministradores,
    getAdministradorById,
    createAdministrador
};