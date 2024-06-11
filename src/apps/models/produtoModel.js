const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProdutoShema = new Schema({
  id: ObjectId,
  nome: { type: String, required: true },
  valor: { type: Number, required: true },
  descricao: { type: String, required: true },
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'empresa', required: true }
});

const ProdutoModel = mongoose.model('produto', ProdutoShema);

module.exports = ProdutoModel;