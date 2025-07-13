const modeloGruposBoletos = require("../modelos/gruposBoletos")

exports.obtenerGruposBoletos = async (req, res) => {
    try {
        const gruposBoletos = await modeloGruposBoletos.find();
        res.json(gruposBoletos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener grupos de boletos", error });
    }
};
exports.obtenerGruposBoletosPorId = async (req, res) => {
    try {
        const grupoBoleto = await modeloGruposBoletos.findById(req.params.id);
        if (!grupoBoleto) {
            return res.status(404).json({ mensaje: 'Boleto no encontrado' });
        }
        res.json(grupoBoleto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener boleto', error });
    }
};

exports.crearGrupoBoletos = async (req, res) => {
    try {
        const nuevoGrupo = await modeloGruposBoletos(req.body);
        await nuevoGrupo.save()
        res.status(201).json(nuevoGrupo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear grupo de boletos", error });
    }
};

exports.actualizarGrupoBoletos = async (req, res) => {
    try {
        const id = req.params.id;
        const grupoActualizado = await modeloGruposBoletos.findByIdAndUpdate(id, req.body);
        res.json(grupoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar grupo de boletos", error });
    }
};

exports.eliminarGrupoBoletos = async (req, res) => {
    try {
        const id = req.params.id;
        await modeloGruposBoletos.findByIdAndDelete(id);
        res.json({ mensaje: "Grupo de boletos eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar grupo de boletos", error });
    }
};