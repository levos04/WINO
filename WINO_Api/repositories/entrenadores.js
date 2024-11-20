const db = require('../db'); // Importar el pool de conexiones

// Función para obtener todos los entrenadores
const getAllEntrenadores = async () => {
    const [rows] = await db.query('SELECT * FROM entrenadores');
    return rows;
};

// Función para obtener un entrenador por su ID
const getEntrenadorById = async (id_entrenador) => {
    const [rows] = await db.query('SELECT * FROM entrenadores WHERE id_entrenador = ?', [id_entrenador]);
    return rows[0];
};

// Función para insertar un nuevo entrenador
const createEntrenador = async (nombre, apellido, fecha_nacimiento, contacto, username, password) => {
    const [result] = await db.query(
        'INSERT INTO entrenadores (nombre, apellido, fecha_nacimiento, contacto, username, password) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellido, fecha_nacimiento, contacto, username, password]
    );
    return result.insertId; // Devuelve el ID del nuevo registro
};

// Exportar las funciones
module.exports = {
    getAllEntrenadores,
    getEntrenadorById,
    createEntrenador
};