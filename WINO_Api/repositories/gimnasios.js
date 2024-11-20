const db = require('../db'); // Importar el pool de conexiones

// Función para obtener todos los gimnasios
const getAllGimnasios = async () => {
    const [rows] = await db.query('SELECT * FROM gimnasios');
    return rows;
};

// Función para obtener un gimnasio por su ID
const getGimnasioById = async (id) => {
    const [rows] = await db.query('SELECT * FROM gimnasios WHERE id = ?', [id]);
    return rows[0];
};

// Función para insertar un nuevo gimnasio
const createGimnasio = async (pais, estado, ciudad, direccion, cp, rfc, nombre, imagenPath) => {
    const [result] = await db.query(
        'CALL agregar_gym(?, ?, ?, ?, ?, ?, ?, ?)',
        [pais, estado, ciudad, direccion, cp, rfc, nombre, imagenPath]
    );
    return result.insertId; // Devuelve el ID del nuevo registro
};

// Exportar las funciones
module.exports = {
    getAllGimnasios,
    getGimnasioById,
    createGimnasio
};