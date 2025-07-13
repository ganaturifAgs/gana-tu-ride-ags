const mongoose = require('mongoose')
const sortSchema =  new mongoose.Schema({
  _id: Number,
  titulo: String,
  cantidad_boletos: Number,
  num_ini: Number,
  num_fin: Number,
  fecha_creacion: Date,
  fecha_sorteo: Object,
  premios:Object,
  boletos_vendidos: Number,
  ganadores: Object,
  activo: Boolean,
  precio: Number,
  numporboleto: Number
});

const Sorteo = mongoose.model('sorteos',sortSchema);

module.exports = Sorteo