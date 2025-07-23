const express = require('express');
const { dirname } = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 80

const  mongoose = require('./router/BD/mongoose-db')
const preguntaRutas = require('./router/preguntas-rutas')
const sorteoRutas = require('./router/sorteo-rutas');
const boletosRutas = require('./router/boletos-ruta')
const gruposBoletosRutas = require("./router/gruposBoletos-rutas");
const usuariosRutas = require("./router/usuario-rutas");



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'/public'));


console.log(__dirname)
console.log(dirname(__dirname))

app.get('/', async (req,res)=>{ 
  const Preguntas = require('./modelos/preguntas')
  let lista = await  Preguntas.find()
  res.render('index',{titulo:'Corre el riesgo, súbete al ride... "¡y gánalo!"',preguntas:lista}) 
})
app.get('/pagos',async(req,res)=>{
  res.render('pagos',{titulo:'Metodos de Pago',corporacion:'Gana tu Ride Ags'})
})

app.get('/buscador',async(req,res)=>{
  res.render('boletos/buscador',{titulo:'Buscador de Boletos',corporacion:'Gana tu Ride Ags'})
})

app.get('/admin/:usuario',async(req,res)=>{
  const Usuario = require('./modelos/usuarios');
  let usuario = await Usuario.findOne({usuario:req.params.usuario})
  console.log(usuario)
  let ruta = usuario ? 'admin':'admin/intruso'
  res.render(ruta,{titulo:'Administración',corporacion:'Gana tu Ride Ags',usu:usuario})
})


app.get("/admin/md5/:texto",(req,res)=>{
  const md5 = require("md5")
  let textoMD5 = md5(req.params.texto)
  res.send(textoMD5)
})

app.use('/pregunta',preguntaRutas)
app.use('/sorteos',sorteoRutas)
app.use('/boletos',boletosRutas)
app.use('/gposBoletos',gruposBoletosRutas)
app.use('/usuarios',usuariosRutas)

app.post('/sesion/:ip',(req,res)=>{
    console.log(`[${req.params.ip}] inicio de sesión`) 
    res.send(true)
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


app.use(express.json());
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist!');
});
// Start the server and listen on the specified port

 
  app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});

