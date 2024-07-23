document.addEventListener('DOMContentLoaded', function () {
    const clipButton = document.querySelector('.clip-btn');
    const sendButton = document.querySelector('.send-btn');
    const inputField = document.querySelector('.chat-input input[type="text"]');
    const chatMessages = document.querySelector('.chat-messages');

    // Ejemplo de función para enviar un mensaje
    sendButton.addEventListener('click', function () {
        const message = inputField.value;
        if (message.trim() !== '') {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messageElement.classList.add('message');
            chatMessages.appendChild(messageElement);
            inputField.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    // Ejemplo de función para abrir el selector de archivos (simplificado)
    clipButton.addEventListener('click', function () {
        alert('Abrir selector de archivos');
    });
});