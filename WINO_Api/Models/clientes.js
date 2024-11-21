class cliente{
    constructor(id_cliente, id_entrenador, codigo_gym, nombre, apellido, fecha_nacimiento, contacto, username, pasword, imagen){
        this.id_cliente = id_cliente;
        this.id_entrenador = id_entrenador;
        this.codigo_gym = codigo_gym;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fecha_nacimiento = fecha_nacimiento;
        this.contacto = contacto;
        this.username = username;
        this.pasword = pasword;
        this.imagen = imagen;
    }
}

module.exports = cliente;