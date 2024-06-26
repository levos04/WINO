const express = require('express');
const path = require('path');

const mysql = require("mysql");

const app = express();

let conexion = mysql.createConnection({
  host: "localhost",
  database: "wino",
  user: "root",
  password: "",
})

conexion.connect((err) => {
  if (err) {
      console.error('Error conectando a la base de datos:', err);
      return;
  }
  console.log('Conexión a la base de datos MySQL establecida.');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'views')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Ruta para el formulario
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/InicioMiembro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'InicioMiembro.html'));
});

// Ruta para manejar el formulario
app.post('/validarMiembro', (req, res) => {
    const datos = req.body;

    let nombre = datos.Nombre;
    let apellido = datos.Apellido;
    let fn = datos.FechaNacimiento;
    let contacto = datos.Contacto;
    let nu = datos.NombreUsuario;
    let pass = datos.password;

    let registrar = "CALL agregar_cliente(?, ?, ?, ?, ?, ?)";

    conexion.query(registrar, [nombre, apellido, fn, contacto, nu, pass], (error, results) => {
        if (error) {
            console.error('Error ejecutando el procedimiento almacenado:', error);
            return res.status(500).send('Ocurrió un error al registrar el miembro.');
        }
        console.log('Resultado del procedimiento almacenado:', results);
        res.send('Cliente agregado correctamente.');
      });

    // Aquí puedes agregar lógica para procesar los datos del formulario
    res.redirect('/'); // Redirigir a la página principal o a otra página después de procesar los datos
});

app.listen(5500, () => {
    console.log('Servidor iniciado en http://localhost:5500');
});

