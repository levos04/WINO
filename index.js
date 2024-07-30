const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 13172;

// Configuración de conexión a la base de datos
let conexion = mysql.createConnection({
    host: "@monorail.proxy.rlwy.net",
    database: "railway",
    user: "root",
    password: "OOlfSwenfwTJjpHaGLbtKdktRjCFeMzF",
});

conexion.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida.');
});

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware para servir archivos estáticos
app.use('/uploads', express.static('uploads'));

// Ruta para manejar el formulario de carga de archivos
app.post('/upload', upload.single('Imagen'), (req, res) => {
    try {
        res.status(200).send('Archivo subido correctamente: ' + req.file.path);
    } catch (error) {
        res.status(400).send('Error al subir el archivo.');
    }
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'Maquetado 2 unidad')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Rutas para servir archivos HTML
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

app.post('/loginMiembro', (req, res) => {
    const datos = req.body;

    let username = datos.username;
    let password = datos.password;

    let query = 'SELECT * FROM clientes WHERE username = ? AND password = ?';

    conexion.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            return res.redirect('/miembroInicio.html?error=error_en_bd');
        }

        if (results.length === 0) {
            // Si no se encontraron coincidencias
            return res.redirect('/miembroInicio.html?error=datos_no_registrados');
        }

        // Si la ejecución fue exitosa
        const cliente = results[0];
        const hasGymCode = cliente.codigo_gym ? 'yes' : 'no';

        if (cliente.codigo_gym) {
            // Redirigir al usuario con el código de gimnasio
            return res.redirect(`/user.html?usuario=${username}&hasGymCode=${hasGymCode}&codigo_gym=${cliente.codigo_gym}`);
        } else {
            // Redirigir al usuario sin código de gimnasio
            return res.redirect(`/welcome.html?usuario=${username}&hasGymCode=${hasGymCode}&codigo_gym=${cliente.codigo_gym}`);
        }
    });
});

app.post('/loginEntrenador', (req, res) => {
    const datos = req.body;

    let username = datos.username;
    let password = datos.password;

    let query = 'SELECT * FROM entrenadores WHERE username = ? AND password = ?';

    conexion.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            return res.redirect('/entrenadorInicio.html?error=error_en_bd');
        }

        if (results.length === 0) {
            // Si no se encontraron coincidencias
            return res.redirect('/entrenadorInicio.html?error=datos_no_registrados');
        }

        // Si la ejecución fue exitosa
        return res.redirect(`/user.html?usuario=${username}`);
    });
});

// Ruta para obtener gimnasios con filtro
app.get('/gimnasios', (req, res) => {
    let query = 'SELECT * FROM gimnasios';
    conexion.query(query, (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results); // Enviar los resultados como JSON
    });
});

app.get('/clientes', (req, res) => {
    const username = req.query.username; // Obtener el valor de username de la query string
    if (!username) {
        res.status(400).send('Username es requerido');
        return;
    }

    const query = 'SELECT * FROM clientes WHERE username = ?';
    conexion.query(query, [username], (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error); // Log the error to the console
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results); // Enviar los resultados como JSON
    });
});


// Ruta para registrar cliente en un gimnasio
app.post('/registrarCliente', (req, res) => {
    const { codigo_gym, usuario } = req.body;

    // Verifica si ambos campos están presentes
    if (!codigo_gym || !usuario) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    const query = 'UPDATE clientes SET codigo_gym = ? WHERE username = ?';
    conexion.query(query, [codigo_gym, usuario], (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        // Verifica si se actualizó alguna fila
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Registro actualizado correctamente' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});