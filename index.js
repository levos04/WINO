const express = require('express');
const path = require('path');
const mysql = require("mysql");
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

// Configuración de conexión a la base de datos
let conexion = mysql.createConnection({
    host: "localhost",
    database: "wino",
    user: "root",
    password: "",
});

conexion.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida.');
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'views')));
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
    let registrar = "CALL agregar_cliente(?, ?, ?, ?, ?, ?)";

    conexion.query(registrar, [nombre, apellido, fn, contacto, nu, pass], (error, results) => {
        if (error) {
            console.error('Error ejecutando el procedimiento almacenado:', error);
            return res.redirect('/miembroFallo.html');
        }

        // Si la ejecución fue exitosa, verificar el mensaje devuelto por el procedimiento almacenado
        if (results && results.length > 0 && results[0][0] && results[0][0].mensaje) {
            let mensaje = results[0][0].mensaje;
            if (mensaje.includes('Error')) {
                return res.redirect('/miembroFallo.html');
            } else {
                return res.redirect('/miembroExito.html');
            }
        } else {
            console.error('Error: No se recibió un mensaje válido del procedimiento almacenado.');
            return res.redirect('/miembroFallo.html');
        }
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

    // Llamada al procedimiento almacenado
    let registrar = "CALL agregar_entrenador(?, ?, ?, ?, ?, ?)";

    conexion.query(registrar, [nombre, apellido, fn, contacto, nu, pass], (error, results) => {
        if (error) {
            console.error('Error ejecutando el procedimiento almacenado:', error);
            return res.redirect('/entrenadorFallo.html');
        }

        // Si la ejecución fue exitosa, verificar el mensaje devuelto por el procedimiento almacenado
        if (results && results.length > 0 && results[0][0] && results[0][0].mensaje) {
            let mensaje = results[0][0].mensaje;
            if (mensaje.includes('Error')) {
                return res.redirect('/entrenadorFallo.html');
            } else {
                return res.redirect('/entrenadorExito.html');
            }
        } else {
            console.error('Error: No se recibió un mensaje válido del procedimiento almacenado.');
            return res.redirect('/entrenadorFallo.html');
        }
    });
});

app.post('/validarGym', (req, res) => {
    const datos = req.body;

    let pais = datos.Pais;
    let estado = datos.Estado;
    let ciudad = datos.Ciudad;
    let direccion = datos.Direccion;
    let cp = datos.CodigoPostal;
    let rfc = datos.RFC;
    let nombre = datos.Nombre;

    // Llamada al procedimiento almacenado
    let registrar = "CALL agregar_gym(?, ?, ?, ?, ?, ?, ?)";

    conexion.query(registrar, [pais, estado, ciudad, direccion, cp, rfc, nombre], (error, results) => {
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
    let codigo_gym = datos.codigo;

    // Llamada al procedimiento almacenado
    let query = "CALL agregar_administrador(?, ?, ?, ?, ?, ?, ?)";

    conexion.query(query, [nombre, apellido, fechaNacimiento, contacto, username, password, codigo_gym], (error) => {
        if (error) {
            console.error('Error ejecutando el procedimiento almacenado:', error);
            return res.redirect('/adminFallo.html');
        }

        // Si la ejecución fue exitosa
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

        if (!cliente.codigo_gym) {
            // Si el cliente no tiene un codigo_gym asignado
            return res.redirect(`/welcome.html?usuario=${username}&hasGymCode=${hasGymCode}`);
        }

        // Si el cliente tiene un codigo_gym asignado
        return res.redirect(`/user.html?usuario=${username}&hasGymCode=${hasGymCode}`);
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
    let query = 'SELECT * FROM carta_gym';
    conexion.query(query, (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results); // Enviar los resultados como JSON
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});