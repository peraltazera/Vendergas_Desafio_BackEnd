const ClienteModel = require('../models/clienteModel');
const EmpresaModel = require('../models/empresaModel');
const Joi = require('joi');

const ClienteShema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    telefone: Joi.number().required(),
    empresa: Joi.string().length(24).hex().required(),
});

class ClienteController {
    async create(req, res){
        try {
            const { error, value } = ClienteShema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const empresa = await EmpresaModel.findById(req.body.empresa);

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa não encontrada!' });
            }

            const emailExistente = await ClienteModel.findOne({ email: value.email, empresa: value.empresa });
    
            if (emailExistente) {
                return res.status(400).json({ message: 'Email já cadastado nessa empresa!' });
            }
    
            const telefoneExistente = await ClienteModel.findOne({ telefone: value.telefone, empresa: value.empresa });
    
            if (telefoneExistente) {
                return res.status(400).json({ message: 'Telefone já cadastado nessa empresa!' });
            }

            const cliente = await ClienteModel.create(req.body);
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findAll(req, res){
        try {
            const clientes = await ClienteModel.find();
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findById(req, res){
        try {
            const { id } = req.params;
            const cliente = await ClienteModel.findById(id);

            if(!cliente){
                return res.status(404).json({message: "Cliente não encontrado!"});
            }
            
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findByEmpresa(req, res){
        try {
            const { id } = req.params;
            const clientes = await ClienteModel.find({ empresa: id });

            if(!clientes){
                return res.status(404).json({message: "Clientes não encontrados!"});
            }
            
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            const { error, value } = ClienteShema.validate(req.body);

            const cliente = await ClienteModel.findById(id);

            if(value.email != cliente.email){
                const emailExistente = await ClienteModel.findOne({ email: value.email, empresa: value.empresa });

                if (emailExistente) {
                    return res.status(400).json({ message: 'Email já cadastado nessa empresa!' });
                }
            }

            if(value.telefone != cliente.telefone){
                const telefoneExistente = await ClienteModel.findOne({ telefone: value.telefone, empresa: value.empresa });

                if (telefoneExistente) {
                    return res.status(400).json({ message: 'Telefone já cadastado nessa empresa!' });
                }
            }

            await ClienteModel.findByIdAndUpdate(id, req.body);
            
            return res.status(200).json({message: 'Cliente atualizado!'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const cliente = await ClienteModel.findByIdAndDelete(id);

            if(!cliente){
                return res.status(404).json({message: "Cliente não encontrado!"});
            }
            
            return res.status(200).json({message: 'Cliente deletado!'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }
}

module.exports = new ClienteController();