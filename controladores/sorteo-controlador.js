const Sorteo = require('../modelos/Sorteo');

// Obtener todos los sorteos
exports.obtenerSorteos = async (req, res) => {
    try {
        const sorteos = await Sorteo.find();
        res.json(sorteos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los sorteos', error });
    }
};

// Obtener un sorteo por ID
exports.obtenerSorteoPorId = async (req, res) => {
    try {
        const sorteo = await Sorteo.findById(req.params.id);
        if (!sorteo) {
            return res.status(404).json({ mensaje: 'Sorteo no encontrado' });
        }
        res.json(sorteo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el sorteo', error });
    }
};

// Obtener un sorteo por activo
exports.obtenerSorteoPorEstatus = async (req, res) => {
    try {
        const sorteo = await Sorteo.find({activo:true});
        if (!sorteo) {
            return res.status(404).json({ mensaje: 'No hay sorteo activo' });
        }
        res.json({success:true,data:sorteo[0]});
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el sorteo', error });
    }
};

// Crear un nuevo sorteo
exports.crearSorteo = async (req, res) => {
    try {
        const nuevoSorteo = new Sorteo(req.body);
        await nuevoSorteo.save();
        res.status(201).json(nuevoSorteo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el sorteo', error });
    }
};

// Actualizar un sorteo existente
exports.actualizarSorteo = async (req, res) => {
    try {
        const sorteoActualizado = await Sorteo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!sorteoActualizado) {
            return res.status(404).json({ mensaje: 'Sorteo no encontrado' });
        }
        res.json(sorteoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el sorteo', error });
    }
};

// Eliminar un sorteo
exports.eliminarSorteo = async (req, res) => {
    try {
        const sorteoEliminado = await Sorteo.findByIdAndDelete(req.params.id);
        if (!sorteoEliminado) {
            return res.status(404).json({ mensaje: 'Sorteo no encontrado' });
        }
        res.json({ mensaje: 'Sorteo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el sorteo', error });
    }
};