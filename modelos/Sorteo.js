const mongoose = require('mongoose')
const fechaSchema = new mongoose.Schema({
      1:{type:Date, required:true},
      2:{type:Date, required:true},
      3:{type:Date, required:true}
},{ _id: false })

const sortSchema =  new mongoose.Schema({
  _id: Number,
  titulo: String,
  cantidad_boletos: Number,
  num_ini: Number,
  num_fin: Number,
  fecha_creacion: Date,
  fecha_sorteo: { type: fechaSchema, required: true },
  premios:Object,
  boletos_vendidos: Number,
  ganadores: Object,
  activo: Boolean,
  precio: Number,
  numporboleto: Number
});

const Sorteo = mongoose.model('sorteos',sortSchema);

module.exports = Sorteo