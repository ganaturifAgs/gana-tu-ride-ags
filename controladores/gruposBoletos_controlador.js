const { model } = require("mongoose");
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
         let _dat = req.body
         console.log(_dat)
         _dat.datos = JSON.parse(_dat.datos)
        _dat.numeros = JSON.parse(_dat.numeros)
        console.log(_dat)
        const nuevoGrupo = await modeloGruposBoletos(_dat);
        await nuevoGrupo.save()
        res.status(201).json({success:true,data:nuevoGrupo});
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

exports.getNewId = async (req,res)=>{
    try{
        const _newId = await modeloGruposBoletos.find({},{_id:1})
        let _id = _newId.pop()._id+1
        console.log(_id)
        res.send(_id)
    }catch(error){
        console.log(error)
        res.status(500).json({mensaje:"Error al obtener el ultimo id",error});
    }
};


