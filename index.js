const express = require('express');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registrar las rutas de la API
app.use('/api/administradores', require('./WINO_Api/routes/administradores'));
app.use('/api/clientes', require('./WINO_Api/routes/clientes'));
app.use('/api/entrenadores', require('./WINO_Api/routes/entrenadores'));
app.use('/api/gimnasios', require('./WINO_Api/routes/gimnasios'));

// Manejo de errores
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`);
});