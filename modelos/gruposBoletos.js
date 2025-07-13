const mongoose = require('mongoose');

const datosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    estado: { type: String, required: true }
}, { _id: false });

const gruposBoletosSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    numeros: { type: [Number], required: true },
    sorteo: { type: Number, required: true },
    estatus: { type: Number, required: true },
    datos: { type: datosSchema, required: true }
}, { collection: 'gruposBoletos' });

module.exports = mongoose.model('GruposBoletos', gruposBoletosSchema);