const express = require('express')
const router = express.Router()
const { conectar, desconectar } = require('./BD/mongo-db');



async function getBoletos(){
    var boles = []
    const {db} = await conectar('rifas_bd','dbAdmin','_dbAdmin')
    try{
        boles = await db.collection('boletos').find().toArray()
    }finally{
        await desconectar();
    }
    return boles
}


router.get("/apartar/:id", async (req,res)=>{
    const id = req.params.id;
    const args = req.body
    var datos = await getBoletos()
    res.json({success:true,data:datos})
})


module.exports = router;