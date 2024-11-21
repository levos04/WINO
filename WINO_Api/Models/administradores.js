class admin{
    constructor(id_admin, Nombre, Apellido, FechaNacimiento, Contacto, username, pasword, codigo, imagen){
        this.id_admin = id_admin;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.FechaNacimiento = FechaNacimiento;
        this.Contacto = Contacto;
        this.username = username;
        this.pasword = pasword;
        this.codigo = codigo;
        this.imagen = imagen;
    }
}

module.exports = admin;