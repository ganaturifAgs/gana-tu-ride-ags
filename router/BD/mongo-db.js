const apiPublic="huwkfwhl"
const apiPrivate = "9d385924-22a5-4f71-9ccb-b17dc0b8aaf8"
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:pass@clusterrifas.kfwlu4w.mongodb.net/?retryWrites=true&w=majority&appName=ClusterRifas";



let client;
let db;

async function conectar(nombreDB,funcion,user="dbAdmin",pass="_dbAdmin") {
  if (!client) {
    console.log("crear cliente")
    client = new MongoClient(uri.replace("user",user).replace("pass",pass), {
      noDelay:true,
      monitorCommands:true,
      minPoolSize:3,
      maxPoolSize:10,
     useNewUrlParser: true,
     useUnifiedTopology: true,
     // Opcional: Configurar opciones del pool de conexiones
     poolSize: 10, // Número máximo de conexiones en el pool
     socketTimeoutMS: 360000, // Tiempo de espera para sockets inactivos
     connectTimeoutMS: 30000 // Tiempo de espera para la conexión inicial
    });
    await client.connect();
    
  return { client };
}

async function getDB(cli){
    db = cli.db(nombre);
    console.log("Conectado a MongoDB Atlas desde el metodo "+funcion);
}





async function desconectar(client) {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("Desconectado de MongoDB Atlas por el usuario "+client)
  }
}

module.exports = { conectar, desconectar };
