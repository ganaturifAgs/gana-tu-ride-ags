const express = require('express')
const router = express.Router()
const usuarioControlador = require('../controladores/usuario-controlador')

router.get('/cuenta/:usu',usuarioControlador.obtenerUsuarioPorUsuario)
router.post('/nuevo',usuarioControlador.crearUsuario);
router.get('/', usuarioControlador.obtenerUsuarios)
router.get('/:id',usuarioControlador.obtenerUsuarioPorId)
router.put('/:id',usuarioControlador.actualizarUsuario)
router.delete('/:id',usuarioControlador.eliminarUsuario)


module.exports = router