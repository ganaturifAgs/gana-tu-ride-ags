const express = require('express')
const router = express.Router()
const gruposBoletosRutas = require("../controladores/gruposBoletos_controlador")

router.get('/', gruposBoletosRutas.obtenerGruposBoletos)
router.get('/:id', gruposBoletosRutas.obtenerGruposBoletosPorId)
router.post('/', gruposBoletosRutas.crearGrupoBoletos)
router.put('/:id', gruposBoletosRutas.actualizarGrupoBoletos)
router.delete('/:id', gruposBoletosRutas.eliminarGrupoBoletos)
router.get('/new/id',gruposBoletosRutas.getNewId)

module.exports = router