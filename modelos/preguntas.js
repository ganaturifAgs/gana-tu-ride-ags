const mongoose = require('mongoose')
const esquema =  mongoose.Schema({
    _id:Number,
    pregunta:String,
    respuesta:String
})

const Preguntas  = mongoose.model("preguntas",esquema)

module.exports = Preguntas