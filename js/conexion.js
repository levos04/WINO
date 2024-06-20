let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: "localhost",
    database: "wino",
    user: "root",
    password: ""
});

conexion.connect(function(err){
    if(err){
        throw err;
    } else{
        console.log("Conexión exitosa");
    }
});

conexion.end();