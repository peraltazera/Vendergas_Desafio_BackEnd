const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsuarioShema = new Schema({
  id: ObjectId,
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true }
});

const UsuarioModel = mongoose.model('usuario', UsuarioShema);

module.exports = UsuarioModel;