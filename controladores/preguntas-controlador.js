const Preguntas = require('../modelos/preguntas');

// Obtener todas las preguntas
exports.obtenerPreguntas = async (req, res) => {
    try {
        const preguntas = await Preguntas.find();
        res.json(preguntas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener preguntas', error });
    }
};

// Obtener una pregunta por ID
exports.obtenerPreguntaPorId = async (req, res) => {
    try {
        const preguntas = await Preguntas.findById(req.params.id);
        if (!preguntas) {
            return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
        }
        res.json(preguntas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la pregunta', error });
    }
};

// Crear una nueva pregunta
exports.crearPregunta = async (req, res) => {
    try {
        const nuevaPregunta = new Preguntas(req.body);
        await nuevaPregunta.save();
        res.status(201).json(nuevaPregunta);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la pregunta', error });
    }
};

// Actualizar una pregunta existente
exports.actualizarPregunta = async (req, res) => {
    try {
        const preguntaActualizada = await Preguntas.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!preguntaActualizada) {
            return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
        }
        res.json(preguntaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la pregunta', error });
    }
};

// Eliminar una pregunta
exports.eliminarPregunta = async (req, res) => {
    try {
        const preguntaEliminada = await Preguntas.findByIdAndDelete(req.params.id);
        if (!preguntaEliminada) {
            return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
        }
        res.json({ mensaje: 'Pregunta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la pregunta', error });
    }
};