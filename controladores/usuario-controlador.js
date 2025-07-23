const Usuario = require('../modelos/usuarios');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
    }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el usuario', error });
    }
};

// Obtener un usuario por cuenta de usuario
exports.obtenerUsuarioPorUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.find({usuario:req.params.usu});
        if (!usuario) {
            return res.status(404).json({ mensaje: 'No hay usuario activo' });
        }
        res.json({success:true,data:usuario[0]});
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el usuario', error });
    }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        const nuevousuario = new Usuario(req.body);
        await nuevousuario.save();
        res.status(201).json(nuevousuario);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el usuario', error });
    }
};

// Actualizar un usuario existente
exports.actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'usuario no encontrado' });
        }
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el usuario', error });
    }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'usuario no encontrado' });
        }
        res.json({ mensaje: 'usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
    }
};