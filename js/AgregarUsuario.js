document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('Nombre').value;
        const apellido = document.getElementById('Apellido').value;
        const fechaNacimiento = document.getElementById('FechaNacimiento').value;
        const contacto = document.getElementById('Contacto').value;
        const nombreUsuario = document.getElementById('NombreUsuario').value;
        const password = document.getElementById('password').value;

        // Objeto con los datos a enviar al servidor
        const data = {
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento,
            contacto: contacto,
            username: nombreUsuario,
            password: password
        };

        // Enviar los datos al servidor usando fetch API
        fetch('/agregar_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(message => {
            console.log('Respuesta del servidor:', message);
            // Aquí puedes manejar la respuesta del servidor según lo necesites
        })
        .catch(error => {
            console.error('Error al enviar datos al servidor:', error);
        });
    });
});