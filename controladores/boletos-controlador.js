const modeloBoletos = require('../modelos/Boletos');
const {publicIp,publicIpv4,publicIpv6} = require("public-ip")
let ip_cliente
publicIpv4().then(ip=>{  ip_cliente = ip })

const obtenerBoletos = async (req, res) => {
    try {
        const boletos = await modeloBoletos.find();
        res.json(boletos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener boletos', error });
    }
};

const obtenerBoletoPorId = async (req, res) => {
    try {
        
        const boleto = await modeloBoletos.findById(req.params.id);
        if (!boleto) {
            return res.status(404).json({ mensaje: 'Boleto no encontrado' });
        }
        res.json(boleto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener boleto', error });
    }
};

const crearBoleto = async (req, res) => {
    try {
        const nuevoBoleto = new modeloBoletos(req.body);
        await nuevoBoleto.save()
        res.status(201).json(nuevoBoleto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear boleto', error });
    }
};

const actualizarBoleto = async (req, res) => {
    try {
        console.log(`[${ip_cliente}] Reservo Boleto _id: ${req.params.id}. Grupo Boleto: ${req.body}`)
        let datos = req.body
        const boletoActualizado = await modeloBoletos.findByIdAndUpdate(req.params.id, datos);
        if (!boletoActualizado) {
            return res.status(404).json({ mensaje: 'Boleto no encontrado', success:false });
        }
        boletoActualizado.success=true
        res.json(boletoActualizado);
    } catch (error) {
        console.log(error)
        res.status(404).json({ mensaje: 'Error al actualizar boleto', success:false });
    }
};

const eliminarBoleto = async (req, res) => {
    try {
        const eliminado = await modeloBoletos.findByIdAndDelete(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Boleto no encontrado' });
        }
        res.json({ mensaje: 'Boleto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar boleto', error });
    }
};

const alAzar = async (req, res) => {
    try {
        const agg = [{'$sample': {'size': parseInt(req.params.cant)}},{'$match':{'estatus':0}}];
        const result = await modeloBoletos.aggregate(agg)
        if (!result) {
            return res.status(404).json({ mensaje: 'No se pudieron generar los boletos' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al generar los boletos', error });
    }
};


const boletoporNumeroySorteo = async (req, res) => {
    try {
        const { numero, sorteo } = req.params;
        const boleto = await modeloBoletos.findOne({ numero, sorteo });
        if (!boleto) {
            return res.status(404).json({ mensaje: 'Boleto no encontrado' });
        }
        res.json({success:true,data:boleto});
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener boleto', error });
    }
};


module.exports = {
    obtenerBoletos,
    obtenerBoletoPorId,
    crearBoleto,
    actualizarBoleto,
    eliminarBoleto,
    alAzar,
    boletoporNumeroySorteo
};