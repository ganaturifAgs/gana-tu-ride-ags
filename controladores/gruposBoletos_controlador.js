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
        const id = req.params._id;
        console.log(id)
        console.log(req.body)
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


exports.obtenerGruposBoletosPorTelefono = async (req, res) => {
    try {
        const telefono = req.params.tel;
        console.log(telefono)
        const gruposBoletos = await modeloGruposBoletos.find({ "datos.telefono": telefono });
        res.json({success:true,data:gruposBoletos});
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener grupos de boletos por teléfono", error });
    }
}


exports.findPorCampo = async (req,res) =>{
        try{
            const campo = req.params.campo
            const valor = req.params.valor
            const cond = req.params.condicion == "igual" ? valor: req.params.condicion == "mayor" ? {"$gt":valor}:{"$lt":valor}
            filtro = campo == "estatus" ? {"estatus":cond}: campo=="sorteo" ? {"sorteo":cond}:{"fecha":cond}
            const encontrados = await modeloGruposBoletos.find(filtro);
            res.json({success:true,data:encontrados})            
        }catch(error){
            res.json({success:false,msg:error})
        }
}

exports.buscarGruposBoletos = async (req, res) => {
    try {
        const query = req.params.query;
        const opcion = req.params.opcion;
       
const agg =[
  {
    $search: {
      index: "idx_clientes",
      text: {
        query: query,
        path: {
          wildcard: "*"
        }
      }
    }
  }
];



    const  gruposBoletos =  opcion === '1' ? await modeloGruposBoletos.find({
            $or: [
                { "datos.nombre": { $regex: query, $options: 'i' } },
                { "datos.telefono": { $regex: query, $options: 'i' } },
                { "datos.estado": { $regex: query, $options: 'i' } }
            ]
        }):await modeloGruposBoletos.aggregate(agg);
   

        res.json({success:true,data:gruposBoletos});
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar grupos de boletos", error: error });
    }
}



