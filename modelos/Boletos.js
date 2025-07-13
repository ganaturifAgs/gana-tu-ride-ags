const mongoose = require('mongoose')
const esquemaB =  mongoose.Schema({
    _id: Number,
    sorteo: Number,
    numero: Number,
    estatus: Number,
    datos: {
        nombre: String,
        ciudad: String,
        telefono: String
    },
    fecha: Date
})

const Boletos  = mongoose.model("boletos",esquemaB)

module.exports = Boletos