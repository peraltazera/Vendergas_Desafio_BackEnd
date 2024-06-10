const EmpresaModel = require('../models/empresaModel');
const UsuarioModel = require('../models/usuarioModel');
const Joi = require('joi');

const EmpresaShema = Joi.object({
    nomeFantasia: Joi.string().required(),
    razaoSocial: Joi.string().required(),
    cnpj: Joi.string().required(),
    usuario: Joi.string().length(24).hex().required(),
  });

class EmpresaController {
    async create(req, res){
        try {
            const { error, value } = EmpresaShema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const nomeFantasiaExistente = await EmpresaModel.findOne({ nomeFantasia: value.nomeFantasia });

            if (nomeFantasiaExistente) {
                return res.status(400).json({ message: 'Nome Fantasia já existe' });
            }

            const razaoSocialExistente = await EmpresaModel.findOne({ razaoSocial: value.razaoSocial });

            if (razaoSocialExistente) {
                return res.status(400).json({ message: 'Razao Social já existe' });
            }

            const cnpjExistente = await EmpresaModel.findOne({ cnpj: value.cnpj });

            if (cnpjExistente) {
                return res.status(400).json({ message: 'CNPJ já existe' });
            }

            const usuario = await UsuarioModel.findById(req.body.usuario);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario não encontrada' });
            }

            const empresa = await EmpresaModel.create(req.body);
            return res.status(200).json(empresa);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findAll(req, res){
        try {
            const empresas = await EmpresaModel.find();
            return res.status(200).json(empresas);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findById(req, res){
        try {
            const { id } = req.params;
            const empresa = await EmpresaModel.findById(id);

            if(!empresa){
                return res.status(404).json({message: "Empresa não encontrada"});
            }
            
            return res.status(200).json(empresa);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findByUsuario(req, res){
        try {
            const { id } = req.params;
            const empresas = await EmpresaModel.find({ usuario: id });

            if(!empresas){
                return res.status(404).json({message: "Empresas não encontradas"});
            }
            
            return res.status(200).json(empresas);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            const { error, value } = EmpresaShema.validate(req.body);

            const empresa = await EmpresaModel.findById(id);

            if(value.nomeFantasia != empresa.nomeFantasia){
                const nomeFantasiaExistente = await EmpresaModel.findOne({ nomeFantasia: value.nomeFantasia });

                if (nomeFantasiaExistente) {
                    return res.status(400).json({ message: 'Nome Fantasia já existe' });
                }
            }

            if(value.razaoSocial != empresa.razaoSocial){
                const razaoSocialExistente = await EmpresaModel.findOne({ razaoSocial: value.razaoSocial });

                if (razaoSocialExistente) {
                    return res.status(400).json({ message: 'Razao Social já existe' });
                }
            }

            if(value.cnpj != empresa.cnpj){
                const cnpjExistente = await EmpresaModel.findOne({ cnpj: value.cnpj });

                if (cnpjExistente) {
                    return res.status(400).json({ message: 'CNPJ já existe' });
                }
            }

            await EmpresaModel.findByIdAndUpdate(id, req.body);
            
            return res.status(200).json({message: 'Empresa atualizada'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const empresa = await EmpresaModel.findByIdAndDelete(id);

            if(!empresa){
                return res.status(404).json({message: "Empresa não encontrada"});
            }
            
            return res.status(200).json({message: 'Empresa deletada'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }
}

module.exports = new EmpresaController();