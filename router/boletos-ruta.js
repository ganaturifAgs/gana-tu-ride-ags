const express = require('express')
const router = express.Router()
const boletosControlador = require('../controladores/boletos-controlador')

router.post('/', boletosControlador.crearBoleto)
router.get('/', boletosControlador.obtenerBoletos)
router.get('/:id', boletosControlador.obtenerBoletoPorId)
router.put('/:id', boletosControlador.actualizarBoleto)
router.delete('/:id', boletosControlador.eliminarBoleto)
router.get('/azar/:cant',boletosControlador.alAzar)
router.get('/numero/:numero/sorteo/:sorteo',boletosControlador.boletoporNumeroySorteo)


router.get('/impreso/:id_boleto',async (req,res)=>{
    const moment = require("moment")
    const gpoBol = require("../modelos/gruposBoletos")
    const sorteo = require('../modelos/Sorteo')
    let resp = await gpoBol.findById(parseInt(req.params.id_boleto))
    const titulo = await sorteo.findById(resp.sorteo)
    resp.titulo = titulo.titulo
    resp.foto = titulo.premios['1'].foto
    resp.nuMax = titulo.cantidad_boletos.toString().length
    resp.fecha["1"] = moment(resp.fecha["1"]).locale('es-mx').format('LL')
    resp.fecha_sorteo = moment(titulo.fecha_sorteo["1"]).locale('es-mx').format('LL')
    res.render("boleto_base",{data:resp})
})

module.exports = router