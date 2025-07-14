const express = require('express');
const { dirname } = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 8080

const html2canvas = require('html2canvas')

const  mongoose = require('./router/BD/mongoose-db')
const preguntaRutas = require('./router/preguntas-rutas')
const sorteoRutas = require('./router/Sorteos');
const boletosRutas = require('./router/boletos-ruta')
const gruposBoletosRutas = require("./router/gruposBoletos-rutas")




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'/public'));




app.get("/", async (req,res)=>{ 
  const Preguntas = require("./modelos/preguntas")
  let lista = await  Preguntas.find()
  res.render('index',{titulo:'Corre el riesgo, súbete al ride... "¡y gánalo!"',preguntas:lista}) 
})

app.use('/pregunta',preguntaRutas)
app.use('/sorteos',sorteoRutas)
app.use('/boletos',boletosRutas)
app.use('/gposBoletos',gruposBoletosRutas)

app.post('/sesion/:ip',(req,res)=>{
    console.log(`IP-Cliente: ${req.params.ip}`) 
    res.send({ip:req.params.ip})
})

/*
(async ()=>{
await mongoose.connection.on('connected', (res) => {
  console.log('Mongoose connected to MongoDB');
});

await mongoose.connection.on('disconnected', (res) => {
  console.log('Mongoose disconnected from MongoDB');
});

await mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});
})()
*/


//(async ()=>{return await desconectar()})();
/*
let coll,sorteo,boletos
let myDB,cliente

(async () => {
  try{
      const {client, db} = await conectar('rifas_db','server')
      cli = await cliente
      myDB=await db
  }catch{ console.log("Ocurrio un problema al conecatar a la BD") }
  finally{ await desconectar(cliente) }
})()
 




app.get("/",async (req,res)=>{ 
  coll = await myDB.collection('preguntas').find().toArray()
  console.log("[info] Se consulto la coleccion preguntas")
  res.render("index",{ corporacion: "Gana tu Ride Ags", titulo: 'Corre el riesgo, súbete al ride... ¡y gánalo!"',preguntas:coll})
})


app.get("/sorteo",async(req,res)=>{
  sorteo = await myDB.collection("sorteos").find({'activo':true}).toArray()
  console.log("[info] Se consulto la coleccion sorteos")
  boletos = await myDB.collection("boletos").find({'sorteo':sorteo[0]._id}).toArray()
  console.log("[info] Se consulto la coleccion boletos")
  res.render("sorteos",{titulo: sorteo[0].titulo,activo:sorteo[0],boletos:boletos})
})



app.post('/boletos/actualizar',async (req,res)=>{
        let tmp=req.body['boletos[]']
        let ids = tmp.map(x=>{return parseInt(x)})
        let dat=JSON.parse(req.body.datos)
        await myDB.collection('boletos').updateMany({_id:{$in:ids}},{$set:{estatus:1,fecha:Date(),datos:dat}})
        res.json({success:true,msg:"Boletos apartados correctamente"})
    })


app.get('/boletos/azar/:cant',async (req,res)=>{
  const agg = [{'$sample': {'size': parseInt(req.params.cant)}},{'$match':{'estatus':{'$exists': false}}}];
  res.json(await myDB.collection('boletos').aggregate(agg).toArray())
    
})


*/

app.use(express.json());
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist!');
});
// Start the server and listen on the specified port

 let a="192.168.1.15"
  app.listen(port,a, () => {
    console.log(`Express app listening at http://${a}:${port}`);
});

