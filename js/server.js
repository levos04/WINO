const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); // Importar la biblioteca bcrypt

const app = express();
const PORT = process.env.PORT || 5500;

// Configurar body-parser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar el middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wino'
});

conexion.connect(function(err) {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

// Ruta para manejar el envío del formulario
app.post('/agregar_cliente', async (req, res) => {
  const { Nombre, Apellido, FechaNacimiento, Contacto, NombreUsuario, password } = req.body;

  // Validación de datos (agregar validaciones según tus necesidades)
  if (!Nombre || !Apellido || !FechaNacimiento || !Contacto || !NombreUsuario || !password) {
    res.status(400).send('Todos los campos son obligatorios.');
    return;
  }

  // Hashing de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10); // Cambiar el número de rondas según sea necesario

  // Ejecutar el procedimiento almacenado
  const query = `CALL agregar_cliente(?, ?, ?, ?, ?, ?)`;
  conexion.query(query, [Nombre, Apellido, FechaNacimiento, Contacto, NombreUsuario, hashedPassword], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento almacenado:', error);
      res.status(500).send('Error al agregar el cliente.');
    } else {
        // Manejar la respuesta del procedimiento almacenado
        const result = results[0][0]; // Asumiendo que el procedimiento retorna una fila con el mensaje
        if (result && result.message) {
            res.send(result.message);
        } else {
            res.status(500).send('Error: no se recibió un mensaje válido del servidor.');
        }
    }
});
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});