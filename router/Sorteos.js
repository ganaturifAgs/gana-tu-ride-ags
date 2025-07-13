const express = require('express')
const router = express.Router()
const sorteoControlador = require('../controladores/sorteo-controlador')


router.get('/',async (req,res)=>{     
    const Sorteo = require("../modelos/Sorteo")
    const Boletos = require("../modelos/Boletos")
    let sorteos = await Sorteo.find()
    let activo = sorteos.filter((s)=>s.activo)[0]
    let tmp = await Boletos.find()
    let boletos = await Object.values(tmp)
    
    //res.render('boletos',{titulo:activo.titulo,activo:activo})
    res.render('sorteos',{titulo:activo.titulo,activo:activo,boletosObjeto:boletos})
})
router.get('/activo',sorteoControlador.obtenerSorteoPorEstatus)
router.post('/nuevo',sorteoControlador.crearSorteo);
router.get('/listar', sorteoControlador.obtenerSorteos)
router.get('/:id',sorteoControlador.obtenerSorteoPorId)
router.put('/:id',sorteoControlador.actualizarSorteo)
router.delete('/:id',sorteoControlador.eliminarSorteo)


module.exports = router