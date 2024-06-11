const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PedidoShema = new Schema({
  id: ObjectId,
  numero: { type: Number, required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente', required: true },
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'empresa', required: true },
  observacao: { type: String, required: true },
  data: { type: Date, required: true }
});

const PedidoModel = mongoose.model('pedido', PedidoShema);

module.exports = PedidoModel;