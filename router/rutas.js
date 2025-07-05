const express = require('express');
const router = express.Router();
const { conectar, desconectar } = require('./BD/mongo-db');

async function getPreguntas() {
    let preguntas = [];
    try {
        const { db } = await conectar('rifas_db',"getPreguntas");
        preguntas = await db.collection('preguntas').find().toArray() 
    }catch{
        return {success:false, msgError:"Error al conectar a la BD o al relizar un find a la coleccion preguntas"}        
    }finally {
        await desconectar();
    }
    return {success:true,data:preguntas};
}   

async function sorteoActivo(){
        let sorteo=[]
        try {
            const { db } = await conectar('rifas_db','sorteoActivo');
            sorteo = await db.collection('sorteos').find({'activo':true}).toArray();
        } finally {
            await desconectar();       
        }
    return sorteo[0];  
}
async function boletosVendidos(id_sort){
        let bole=[]
        try {const { db } = await conectar('rifas_db','boletosVendidos');
            bole = await db.collection('boletos').find({'sorteo':id_sort,'estatus':2}).toArray();
        } finally {await desconectar()}
    return bole;  
}

async function getBoletos(id_sort){
    var boles = []
    try{
        const { db } = await conectar('rifas_db','getBoletos')
        boles = await db.collection('boletos').find({'sorteo':id_sort}).toArray();
    }finally{
        await desconectar();
    }
    return boles;
}

async function apartaBoleto(arg) {
    var resp
    try{const { db } = await conectar('rifas_db','apartaBoletos')
        resp = await db.collection('boletos').updateOne({_id:parseInt(arg.id)},{$set:{estatus:parseInt(arg.est)}})
    }finally{await desconectar()}
    return resp
}
async function boletosAzar(n){
    var boleAza=[]
    const agg = [{'$sample': {'size': 5}},{'$match':{'estatus':{'$exists': false
      }
    }
  }
];
    try{ const { db } = await conectar('rifas_db','boletosAzar');
         boleAza = await db.collection('boletos').aggregate(agg).toArray()
    }finally{await desconectar()}
    return boleAza
}



/* ############################ RUTAS ################################# */



router.get('/', async (req, res) => {
    var lista = await getPreguntas();    
    res.render("../views/index", { corporacion: "Gana tu Ride Ags", titulo: 'Corre el riesgo, súbete al ride... ¡y gánalo!"',preguntas:lista.data });
});

router.get('/sorteo', async (req, res) => {
    var activo = await sorteoActivo();
    var boletos = await getBoletos(activo._id);    
    res.render("../views/sorteos", { titulo: activo.titulo,activo:activo,boletos:boletos});
});

router.get('/boletos', async (req,res)=>{
    var boletos = await getBoletos();
    res.json(boletos)
});

router.get('/boletos/actualizar/:id/:est', async (req,res)=>{
    var respu = await apartaBoleto(req.params);
    res.jsonp(respu)
});

router.get('/boletos/azar/:cant',async (req,res)=>{
    var azar = await boletosAzar(parseInt(req.params.cant))
    res.json(azar)
})




module.exports = router;