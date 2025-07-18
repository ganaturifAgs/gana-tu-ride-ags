const express = require('express')
const router = express.Router()
const sorteoControlador = require('../controladores/sorteo-controlador')


router.get('/',async (req,res)=>{ 
    const moment = require('moment')
    const Boletos = require("../modelos/Boletos")
    const Sorteo = require('../modelos/Sorteo')
    let tmp = await Boletos.find()
    let boletos = await Object.values(tmp)
    let activo = await Sorteo.findOne({activo:true})
    activo["tmp"] = moment(activo.fecha_sorteo["1"]).locale('es-mx').format('LL')
    res.render('sorteos',{titulo:activo.titulo,activo:activo,boletosObjeto:boletos})
    

})
router.get('/activo',sorteoControlador.obtenerSorteoPorEstatus)
router.post('/nuevo',sorteoControlador.crearSorteo);
router.get('/listar', sorteoControlador.obtenerSorteos)
router.get('/:id',sorteoControlador.obtenerSorteoPorId)
router.put('/:id',sorteoControlador.actualizarSorteo)
router.delete('/:id',sorteoControlador.eliminarSorteo)


module.exports = router