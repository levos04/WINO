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

app.get('/entrenadorRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gymRegistro.html'));
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
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
          return res.redirect('/gymFallo.html?error=specific'); // Redirigir en caso de error específico
        } else {
          return res.redirect('/gymFallo.html?error=general'); // Redirigir en caso de otro error
        }
      }
  
      // Si la ejecución fue exitosa, verificar el mensaje devuelto por el procedimiento almacenado
      if (results && results.length > 0 && results[0][0] && results[0][0].codigo_gym) {
        let codigoGym = results[0][0].codigo_gym;
        return res.redirect(`/gymExito.html?codigo=${codigoGym}`); // Pasar el código generado a la vista
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

    // Hashing de la contraseña antes de enviar al procedimiento almacenado
        // Llamada al procedimiento almacenado
        let query = "CALL agregar_administrador(?, ?, ?, ?, ?, ?, ?)";

        conexion.query(query, [nombre, apellido, fechaNacimiento, contacto, username, password, codigo_gym], (error, results, fields) => {
            if (error) {
                console.error('Error ejecutando el procedimiento almacenado:', error);
                if (error.code === 'ER_SIGNAL_EXCEPTION') {
                    return res.redirect('/adminFallo.html'); // Redirigir en caso de error específico
                } else {
                    return res.redirect('/adminFallo.html'); // Redirigir en caso de otro error
                }
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
            if (results.length === 0) {
                // Si no se encontraron coincidencias
                return res.redirect('/miembroInicio.hmtl?error=datos_no_registrados');
            }

            // Si la ejecución fue exitosa
            return res.redirect(`/user.html?usuario=${username}`);
        });
    });


app.listen(5500, () => {
    console.log('Servidor iniciado en http://localhost:5500');
});