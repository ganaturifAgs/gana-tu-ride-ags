const express = require('express')
const router = express.Router()
const preguntasControlador = require('../controladores/preguntas-controlador')

router.post('/', preguntasControlador.crearPregunta)
router.get('/listar',preguntasControlador.obtenerPreguntas)
router.get('/:id', preguntasControlador.obtenerPreguntaPorId)
router.put('/:id', preguntasControlador.actualizarPregunta)
router.delete('/:id', preguntasControlador.eliminarPregunta)


module.exports = router;