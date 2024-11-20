const express = require('express');
const path = require('path');
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

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para las vistas (HTML)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/gymCatalogo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gymCatalogo.html'));
});

app.get('/gymExito.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gymExito.html'));
});

app.get('/gymFallo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gymFallo.html'));
});

app.get('/gymRegistro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gymRegistro.html'));
});

app.get('/miembroExito.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'miembroExito.html'));
});

app.get('/miembroFallo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'miembroFallo.html'));
});

app.get('/miembroInicio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'miembroInicio.html'));
});

app.get('/miembroRegistro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'miembroRegistro.html'));
});

app.get('/Pregunta.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Pregunta.html'));
});

app.get('/training.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'training.html'));
});

app.get('/welcome.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'welcome.html'));
});

// Manejo de errores
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`);
});