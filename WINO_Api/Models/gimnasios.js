class gimnasio{
    constructor(id_gym, codigo_gym, Nombre, Pais, Estado, Ciudad, Direccion, CodigoPostal, RFC, imagen){
        this.id_gym = id_gym;
        this.codigo_gym = codigo_gym;
        this.Nombre = Nombre;
        this.Pais = Pais;
        this.Estado = Estado;
        this.Ciudad = Ciudad;
        this.Direccion = Direccion;
        this.CodigoPostal = CodigoPostal;
        this.RFC = RFC;
        this.imagen = imagen;
    }
}

module.exports = gimnasio;