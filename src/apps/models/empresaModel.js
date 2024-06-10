const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EmpresaShema = new Schema({
  id: ObjectId,
  nomeFantasia: { type: String, required: true },
  razaoSocial: { type: String, required: true },
  cnpj: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true },
});

const EmpresaModel = mongoose.model('empresa', EmpresaShema);

module.exports = EmpresaModel;