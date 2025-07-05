const apiPublic="huwkfwhl"
const apiPrivate = "9d385924-22a5-4f71-9ccb-b17dc0b8aaf8"



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:pass@clusterrifas.kfwlu4w.mongodb.net/?retryWrites=true&w=majority&appName=ClusterRifas";



let client;
let db;

async function conectar(nombreDB,funcion,user="dbAdmin",pass="_dbAdmin") {
  if (!client) {
    client = new MongoClient(uri.replace("user",user).replace("pass",pass), {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    db = client.db(nombreDB);
    console.log("Conectado a MongoDB Atlas desde el metodo "+funcion);
  }
  return { client, db };
}

async function desconectar() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("Desconectado de MongoDB Atlas");
  }
}

module.exports = { conectar, desconectar };
