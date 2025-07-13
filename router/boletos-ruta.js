const express = require('express')
const router = express.Router()
const boletosControlador = require('../controladores/boletos-controlador')

router.post('/', boletosControlador.crearBoleto)
router.get('/', boletosControlador.obtenerBoletos)
router.get('/:id', boletosControlador.obtenerBoletoPorId)
router.put('/:id', boletosControlador.actualizarBoleto)
router.delete('/:id', boletosControlador.eliminarBoleto)
router.get('/azar/:cant',boletosControlador.alAzar)

router.get('/impreso/:id_boleto',(req,res)=>{
    res.render("boleto_base",{id:req.params.id_boleto})
})

module.exports = router