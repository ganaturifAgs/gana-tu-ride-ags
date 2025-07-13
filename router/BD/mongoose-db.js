const mongoose = require('mongoose');
const urlAtlas = "mongodb+srv://user:pass@clusterrifas.kfwlu4w.mongodb.net/rifas_db?retryWrites=true&w=majority&appName=ClusterRifas";
const opc = {
    noDelay:true,
    monitorCommands:true,
    minPoolSize:3,
    maxPoolSize:10,
    maxIdleTimeMS:3000, 
    socketTimeoutMS: 360000, // Tiempo de espera para sockets inactivos
    connectTimeoutMS: 30000 // Tiempo de espera para la conexión inicial
}



mongoose.connect(urlAtlas.replace("user","dbAdmin").replace("pass","_dbAdmin"),opc).then(async (res)=>{console.log("Conectando con mongoDB con Pool de Conexiones");

module.exports = res;


}).catch((err)=>{console.log(`[ERR ] Ocurrio un error al inentar conectar con la BD. Revise su conexion a internet o contacte a un admnistrador.${err}`)})