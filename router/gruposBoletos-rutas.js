const express = require('express')
const router = express.Router()
const gruposBoletosRutas = require("../controladores/gruposBoletos_controlador")

router.get('/', gruposBoletosRutas.listar)
router.get('/:id', gruposBoletosRutas.obtenerPorId)
router.post('/', gruposBoletosRutas.crear)
router.put('/:id', gruposBoletosRutas.actualizar)
router.delete('/:id', gruposBoletosRutas.eliminar)

module.exports = router