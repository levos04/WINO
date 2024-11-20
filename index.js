const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'views')));

// Registrar las rutas de la API
app.use('/api/administradores', require('./WINO_Api/routes/administradores'));
app.use('/api/clientes', require('./WINO_Api/routes/clientes'));
app.use('/api/entrenadores', require('./WINO_Api/routes/entrenadores'));
app.use('/api/gimnasios', require('./WINO_Api/routes/gimnasios'));

// Rutas para las vistas (HTML)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/clientes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'clientes.html'));
});

app.get('/gimnasios', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gimnasios.html'));
});

// Manejo de errores
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});