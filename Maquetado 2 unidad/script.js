document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.barra-navegacion a');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    const quitarFotoBtn = document.getElementById('quitar-foto');
    const cambiarFotoBtn = document.getElementById('cambiar-foto');

    quitarFotoBtn.addEventListener('click', () => {
        alert('Foto de perfil quitada');
    });

    cambiarFotoBtn.addEventListener('click', () => {
        alert('Funcionalidad para cambiar foto aún no implementada');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Aquí puedes agregar la funcionalidad de JavaScript que necesites
});

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    const input = document.getElementById("ubicacion");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.error("No se encontró ningún lugar");
            return;
        }

        // Aquí puedes obtener la ubicación seleccionada, por ejemplo:
        console.log("Ubicación seleccionada:", place.formatted_address);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyABiRateJdtcvPjZwtPzo8D-2nKUVPt-PA&libraries=places&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
});

document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.getElementById('payment-form');
    const savedCardsList = document.getElementById('saved-cards-list');
    const deleteButton = document.getElementById('delete-button');
    let savedCards = [];

    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const cardholderName = document.getElementById('cardholder-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        
        const card = {
            cardholderName,
            cardNumber: '**** **** **** ' + cardNumber.slice(-4),
            expiryDate,
            cvv
        };

        savedCards.push(card);
        displaySavedCards();
        paymentForm.reset();
    });

    deleteButton.addEventListener('click', function () {
        savedCards.pop();
        displaySavedCards();
    });

    function displaySavedCards() {
        savedCardsList.innerHTML = '';
        savedCards.forEach((card, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${card.cardholderName} - ${card.cardNumber} - ${card.expiryDate}`;
            listItem.dataset.index = index;
            savedCardsList.appendChild(listItem);
        });
    }
});

    // Cambio de contraseña
    const passwordForm = document.getElementById('password-change-form');
    passwordForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('La nueva contraseña no coincide con la confirmación.');
            return;
        }

        const confirmation = confirm('¿Estás seguro de que quieres cambiar la contraseña?');
        if (confirmation) {
            // Aquí iría la lógica para cambiar la contraseña
            alert('Contraseña cambiada exitosamente.');
        }
    });

    $(document).ready(function() {
        const guardarBtns = document.querySelectorAll('.guardar-btn');
        const calendarioBtns = document.querySelectorAll('.calendario-btn');
        const guardarTodoBtn = document.getElementById('guardar-todo-btn');
        const datosGuardados = document.getElementById('datos-guardados');
    
        // Función para abrir el calendario
        const abrirCalendario = (inputId) => {
            $("#" + inputId).datepicker({
                dateFormat: "yy-mm-dd",
                onSelect: function(dateText) {
                    guardarDatos(inputId);
                }
            }).datepicker("show");
        };
    
        // Función para guardar datos específicos
        const guardarDatos = (id) => {
            const input = document.getElementById(id);
            const value = input.value;
            let label;
    
            // Manejo especial para el género
            if (id === 'genero') {
                const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
                label = generoSeleccionado ? 'Género:' : '';
                value = generoSeleccionado ? generoSeleccionado.value : '';
            } else {
                label = input.previousElementSibling.textContent;
            }
    
            // Crear un nuevo bloque de datos guardados
            const p = document.createElement('p');
            p.className = 'dato-guardado';
            p.textContent = `${label} ${value}`;
            datosGuardados.appendChild(p);
            datosGuardados.style.display = 'block';
        };
    
        // Agregar evento a cada botón de guardar
        guardarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const inputId = this.dataset.input;
                guardarDatos(inputId);
            });
        });
    
        // Agregar evento a cada botón de calendario
        calendarioBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const inputId = this.dataset.input;
                abrirCalendario(inputId);
            });
        });
    
        // Evento para el botón de guardar todo
        guardarTodoBtn.addEventListener('click', function() {
            const formElements = document.getElementById('datos-form').elements;
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].id && formElements[i].type !== 'button') {
                    guardarDatos(formElements[i].id);
                }
            }
        });
    });

    
    document.getElementById('accept-terms-btn').addEventListener('click', function() {
        alert('Has aceptado los Términos y Condiciones');
        // Aquí puedes agregar la lógica para guardar la aceptación en la base de datos
    });
    

    document.getElementById('accept-privacy-btn').addEventListener('click', function() {
        alert('Has aceptado la Política de Privacidad y Permisos');
        // Aquí puedes agregar la lógica para guardar la aceptación en la base de datos
    });
    

    document.addEventListener('DOMContentLoaded', function() {
        // Aquí puedes agregar lógica de JavaScript si es necesario
    });

    