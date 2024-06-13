const UsuarioModel = require('../models/usuarioModel');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsuarioShema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
  });

const LoginShema = Joi.object({
    email: Joi.string().required(),
    senha: Joi.string().min(6).required(),
});

class UsuarioController {
    async create(req, res){
        try {
            const { error, value } = UsuarioShema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
    
            const emailExistente = await UsuarioModel.findOne({ email: value.email });
    
            if (emailExistente) {
                return res.status(400).json({ message: 'Email já cadastado!' });
            }
    
            const nomeExistente = await UsuarioModel.findOne({ nome: value.nome });
    
            if (nomeExistente) {
                return res.status(400).json({ message: 'Nome já cadastado!' });
            }
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
                return res.status(404).json({message: "Usuario não encontrado!"});
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
                    return res.status(400).json({ message: 'Email já cadastado!' });
                }
            }

            if(value.nome != usuario.nome){
                const nomeExistente = await UsuarioModel.findOne({ nome: value.nome });

                if (nomeExistente) {
                    return res.status(400).json({ message: 'Nome já cadastado!' });
                }
            }

            await UsuarioModel.findByIdAndUpdate(id, req.body);
            
            return res.status(200).json({message: 'Usuario atualizado!'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.findByIdAndDelete(id);

            if(!usuario){
                return res.status(404).json({message: "Usuario não encontrado!"});
            }
            
            return res.status(200).json({message: 'Usuario deletado!'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async login(req, res){
        try {
            const { error, value } = LoginShema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const usuario = await UsuarioModel.findOne({email: value.email});

            if(!usuario){
                return res.status(404).json({message: "Usuario não encontrado!"});
            }
            
            const checkPassword = await bcrypt.compare(value.senha, usuario.senha);
            if(!checkPassword){
                return res.status(422).json({message: "Credenciais invalidas!"});
            }

            const PRIVATE_KEY = process.env.PRIVATE_KEY;

            const token = jwt.sign(
                {
                    id: usuario._id,
                },
                PRIVATE_KEY,
            );

            return res.status(200).json({message: "Autenticação realizada com sucesso!", token, _id: usuario._id});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }
}

module.exports = new UsuarioController();