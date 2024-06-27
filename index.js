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

app.get('/miembroRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'miembroRegistro.html'));
});

app.get('/entrenadorRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'entrenadorRegistro.html'));
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

  // Llamada al procedimiento almacenado
  let registrar = "CALL agregar_cliente(?, ?, ?, ?, ?, ?)";

  conexion.query(registrar, [nombre, apellido, fn, contacto, nu, pass], (error, results, fields) => {
      if (error) {
          console.error('Error ejecutando el procedimiento almacenado:', error);
          if (error.code === 'ER_SIGNAL_EXCEPTION') {
              return res.redirect('/miembroFallo.html'); // Redirigir en caso de error específico
          } else {
              return res.redirect('/miembroFallo.html'); // Redirigir en caso de otro error
          }
      }

      // Si la ejecución fue exitosa, verificar el mensaje devuelto por el procedimiento almacenado
      if (results && results.length > 0 && results[0][0] && results[0][0].mensaje) {
          let mensaje = results[0][0].mensaje;
          if (mensaje.includes('Error')) {
              return res.redirect('/miembroFallo.html'); // Redirigir si hay un mensaje de error
          } else {
              return res.redirect('/miembroExito.html'); // Redirigir si el cliente se agregó correctamente
          }
      } else {
          console.error('Error: No se recibió un mensaje válido del procedimiento almacenado.');
          return res.redirect('/miembroFallo.html'); // Redirigir si no se recibió un mensaje válido
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
  
    conexion.query(registrar, [nombre, apellido, fn, contacto, nu, pass], (error, results, fields) => {
        if (error) {
            console.error('Error ejecutando el procedimiento almacenado:', error);
            if (error.code === 'ER_SIGNAL_EXCEPTION') {
                return res.redirect('/entrenadorFallo.html'); // Redirigir en caso de error específico
            } else {
                return res.redirect('/entrenadorFallo.html'); // Redirigir en caso de otro error
            }
        }
  
        // Si la ejecución fue exitosa, verificar el mensaje devuelto por el procedimiento almacenado
        if (results && results.length > 0 && results[0][0] && results[0][0].mensaje) {
            let mensaje = results[0][0].mensaje;
            if (mensaje.includes('Error')) {
                return res.redirect('/entrenadorFallo.html'); // Redirigir si hay un mensaje de error
            } else {
                return res.redirect('/entrenadorExito.html'); // Redirigir si el cliente se agregó correctamente
            }
        } else {
            console.error('Error: No se recibió un mensaje válido del procedimiento almacenado.');
            return res.redirect('/entrenadorFallo.html'); // Redirigir si no se recibió un mensaje válido
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

    conexion.query(registrar, [pais, estado, ciudad, direccion, cp, rfc, nombre], (error, results, fields) => {
        if (error) {
            console.error('Error ejecutando el procedimiento almacenado:', error);
            if (error.sqlMessage.includes('La dirección ya existe')) {
                return res.redirect('/gymFallo.html?error=direccion');
            } else if (error.sqlMessage.includes('El RFC ya existe')) {
                return res.redirect('/gymFallo.html?error=rfc');
            } else {
                return res.redirect('/gymFallo.html');
            }
        }

        // Si la ejecución fue exitosa, obtener el código generado
        if (results && results.length > 0 && results[0][0] && results[0][0].codigo_gym) {
            let codigoGym = results[0][0].codigo_gym;
            return res.render('gymExito', { codigoGym }); // Pasar el código generado a la vista
        } else {
            console.error('Error: No se recibió un código válido del procedimiento almacenado.');
            return res.redirect('/gymFallo.html');
        }
    });
});




app.listen(5500, () => {
    console.log('Servidor iniciado en http://localhost:5500');
});