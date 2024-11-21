const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'Maquetado 2 unidad')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Rutas para las vistas (HTML)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/miembroRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'miembroRegistro.html'));
});

app.get('/entrenadorRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'entrenadorRegistro.html'));
});

app.get('/gymRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gymRegistro.html'));
});

// Rutas para manejar formularios
app.post('/validarMiembro', (req, res) => {
    const datos = req.body;

    let nombre = datos.Nombre;
    let apellido = datos.Apellido;
    let fn = datos.FechaNacimiento;
    let contacto = datos.Contacto;
    let nu = datos.NombreUsuario;
    let pass = datos.password;

    // Llamada al procedimiento almacenado
    let registrar = "INSERT INTO `clientes`(`nombre`, `apellido`, `fecha_nacimiento`, `contacto`, `username`, `password`) VALUES (?,?,?,?,?,?)";

    conexion.query(registrar, [nombre, apellido, fn, contacto, nu, pass], (error, results) => {
        if (error) {
            console.error('Error creando su perfil:', error);
            return res.redirect('/miembroFallo.html');
        }

        return res.redirect('/miembroExito.html');
    });
});

app.post('/validarEntrenador', (req, res) => {
    const datos = req.body;

    let nombre = datos.Nombre;
    let apellido = datos.Apellido;
    let fn = datos.FechaNacimiento;
    let contacto = datos.Contacto;
    let nu = datos.NombreUsuario;
    let pass = datos.password;

    // Inserción directa a la tabla
    let query = "INSERT INTO entrenadores (nombre, apellido, fecha_nacimiento, contacto, username, password) VALUES (?, ?, ?, ?, ?, ?)";

    conexion.query(query, [nombre, apellido, fn, contacto, nu, pass], (error, results) => {
        if (error) {
            console.error('Error ejecutando la inserción:', error);
            return res.redirect('/entrenadorFallo.html');
        }

        return res.redirect('/entrenadorExito.html');
    });
});

app.post('/validarGym', upload.single('Imagen'), (req, res) => {
    const datos = req.body;
    const imagenFile = req.file; // Captura el archivo de imagen

    // Extraer los datos del formulario
    let pais = datos.Pais;
    let estado = datos.Estado;
    let ciudad = datos.Ciudad;
    let direccion = datos.Direccion;
    let cp = datos.CodigoPostal;
    let rfc = datos.RFC;
    let nombre = datos.Nombre;
    let imagenPath = imagenFile ? path.join('/uploads/', imagenFile.filename) : null; // Ruta donde se guardó la imagen en tu servidor

    // Llamada al procedimiento almacenado con la ruta de la imagen
    let registrar = "CALL agregar_gym(?, ?, ?, ?, ?, ?, ?, ?)";

    conexion.query(registrar, [pais, estado, ciudad, direccion, cp, rfc, nombre, imagenPath], (error, results) => {
        if (error) {
            console.error('Error ejecutando el procedimiento almacenado:', error);
            return res.redirect('/gymFallo.html?error=general');
        }

        // Si la ejecución fue exitosa, verificar el mensaje devuelto por el procedimiento almacenado
        if (results && results.length > 0 && results[0][0] && results[0][0].codigo_gym) {
            let codigoGym = results[0][0].codigo_gym;
            return res.redirect(`/gymExito.html?codigo=${codigoGym}`);
        } else {
            console.error('Error: No se recibió un código válido del procedimiento almacenado.');
            return res.redirect('/gymFallo.html?error=nocode');
        }
    });
});

app.post('/validarAdmin', (req, res) => {
    const datos = req.body;

    let nombre = datos.Nombre;
    let apellido = datos.Apellido;
    let fechaNacimiento = datos.FechaNacimiento;
    let contacto = datos.Contacto;
    let username = datos.username;
    let password = datos.password;
    let codigo = datos.codigo;

    // Inserción directa a la tabla
    let query = "INSERT INTO administradores (Nombre, Apellido, FechaNacimiento, Contacto, username, password, codigo) VALUES (?, ?, ?, ?, ?, ?, ?)";

    conexion.query(query, [nombre, apellido, fechaNacimiento, contacto, username, password, codigo], (error) => {
        if (error) {
            console.error('Error ejecutando la inserción:', error);
            return res.redirect('/adminFallo.html');
        }

        return res.redirect('/adminExito.html');
    });
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