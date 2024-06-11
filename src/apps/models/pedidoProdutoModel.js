const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PedidoProdutoShema = new Schema({
  id: ObjectId,
  pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'pedido', required: true },
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'produto', required: true },
  quantidade: { type: Number, required: true },
});

const PedidoProdutoModel = mongoose.model('pedido_produto', PedidoProdutoShema);

module.exports = PedidoProdutoModel;