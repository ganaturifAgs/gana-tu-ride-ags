const express = require('express');
const router = express.Router();
const { conectar } = require('./BD/mongoose-db');





async function getBoletos(id_sort){
    var boles = []
    try{
        const { db } = await conectar('rifas_db','getBoletos')
        
    }finally{
        await desconectar();
    }
    return boles;
}

async function apartaBoleto(bole,dat) {
    ids = bole.map(x=>{return parseInt(x)})
    console.log(bole)
    console.log(ids)
    console.log(dat)
    var resp
    try{ const { db } = await conectar('rifas_db','apartaBoletos')
        resp = await db.collection('boletos').updateMany({_id:{$in:ids}},{$set:{estatus:1,fecha:'2025-07-06',datos:dat}})
    }catch{
        console.log("entro al catch")
    }finally{
        await desconectar();
    }
}
    
async function boletosAzar(n){
    var boleAza=[]
    const agg = [{'$sample': {'size': n}},{'$match':{'estatus':{'$exists': false}}}];
    try{ const { db } = await conectar('rifas_db','boletosAzar');
         boleAza = await db.collection('boletos').aggregate(agg).toArray()
    }finally{await desconectar()}
    return boleAza
}



/* ############################ RUTAS ################################# */



router.get('/boletos', async (req,res)=>{
    var boletos = await getBoletos();
    res.json(boletos)
});

/*
router.get('/boletos/actualizar/:id/:est', async (req,res)=>{
    var respu = await apartaBoleto(req.params);
    res.jsonp(respu)
});
*/
router.post('/boletos/actualizar',async (req,res)=>{
        let ids=req.body['boletos[]']
        let datos=JSON.parse(req.body.datos)
        await apartaBoleto(ids,datos);
        
        res.json({success:true,msg:"Boletos apartados correctamente"})
    })

router.get('/boletos/azar/:cant',async (req,res)=>{
    var azar = await boletosAzar(parseInt(req.params.cant))
    res.json(azar)
})




module.exports = router