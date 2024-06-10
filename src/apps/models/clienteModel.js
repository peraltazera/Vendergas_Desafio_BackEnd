const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ClienteShema = new Schema({
    id: ObjectId,
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: Number, required: true },
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'empresa', required: true }
});

const ClienteModel = mongoose.model('cliente', ClienteShema);

module.exports = ClienteModel;