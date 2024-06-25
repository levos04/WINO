const nombre = document.getElementById('Nombre').value;
const apellido = document.getElementById('Apellido').value;
const fechaNacimiento = document.getElementById('FechaNacimiento').value;
const contacto = document.getElementById('Contacto').value;
const nombreUsuario = document.getElementById('NombreUsuario').value;
const password = document.getElementById('password').value;
const enviar = document.getElementById('enviar');

const data = {
  nombre: nombre,
  apellido: apellido,
  fechaNacimiento: fechaNacimiento,
  contacto: contacto,
  username: nombreUsuario,
  password: password
};

fetch('/agregar_cliente', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  if (data.error) {
    console.error('Error del servidor:', data.error);
    // Mostrar un mensaje de error al usuario
  } else {
    console.log('Usuario registrado correctamente!');
    // Redireccionar al usuario a otra página o realizar otra acción
  }
})
.catch(error => {
  console.error('Error al enviar datos al servidor:', error);
  // Mostrar un mensaje de error genérico al usuario
});