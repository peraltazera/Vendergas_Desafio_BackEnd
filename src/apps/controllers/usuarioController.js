const UsuarioModel = require('../models/usuarioModel');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const UsuarioShema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
  });

class UsuarioController {
    async create(req, res){
        const { error, value } = UsuarioShema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const emailExistente = await UsuarioModel.findOne({ email: value.email });

        if (emailExistente) {
            return res.status(400).json({ message: 'Email já existe' });
        }

        const nomeExistente = await UsuarioModel.findOne({ nome: value.nome });

        if (nomeExistente) {
            return res.status(400).json({ message: 'Nome já existe' });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(value.senha, salt);
            value.senha = hashedPassword;
            const usuario = new UsuarioModel(value);
            const savedUsuario = await usuario.save();
            const usuarioObject = savedUsuario.toObject();
            delete usuarioObject.senha;
            return res.status(200).json(usuarioObject);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findAll(req, res){
        try {
            const usuarios = await UsuarioModel.find().select('-senha');
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findById(req, res){
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.findById(id).select('-senha');

            if(!usuario){
                return res.status(404).json({message: "Usuario não encontrado"});
            }
            
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            const { error, value } = UsuarioShema.validate(req.body);

            const usuario = await UsuarioModel.findById(id).select('-senha');

            if(value.email != usuario.email){
                const emailExistente = await UsuarioModel.findOne({ email: value.email });

                if (emailExistente) {
                    return res.status(400).json({ message: 'Email já existe' });
                }
            }

            if(value.nome != usuario.nome){
                const nomeExistente = await UsuarioModel.findOne({ nome: value.nome });

                if (nomeExistente) {
                    return res.status(400).json({ message: 'Nome já existe' });
                }
            }

            await UsuarioModel.findByIdAndUpdate(id, req.body);
            
            return res.status(200).json({message: 'Usuario atualizado'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.findByIdAndDelete(id);

            if(!usuario){
                return res.status(404).json({message: "Usuario não encontrado"});
            }
            
            return res.status(200).json({message: 'Usuario deletado'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }
}

module.exports = new UsuarioController();