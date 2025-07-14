const mongoose = require('mongoose')
const esquemaB =  mongoose.Schema({
    _id: Number,
    sorteo: Number,
    numero: Number,
    estatus: Number,
    grupoBoleto: Number
})

const Boletos  = mongoose.model("boletos",esquemaB)

module.exports = Boletos