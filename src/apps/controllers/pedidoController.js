const PedidoModel = require('../models/pedidoModel');
const EmpresaModel = require('../models/empresaModel');
const ClienteModel = require('../models/clienteModel');
const Joi = require('joi');

const PedidoShema = Joi.object({
    numero: Joi.number().required(),
    cliente: Joi.string().length(24).hex().required(),
    empresa: Joi.string().length(24).hex().required(),
    observacao: Joi.string().required(),
    data: Joi.date().required()
  });
  
class PedidoController {
    async create(req, res){
        try {
            const { error, value } = PedidoShema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const empresa = await EmpresaModel.findById(req.body.empresa);
            if (!empresa) {
                return res.status(404).json({ message: 'Empresa não encontrada' });
            }

            const cliente = await ClienteModel.findById(req.body.cliente);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            else if(cliente.empresa != value.empresa) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            const numeroExistente = await PedidoModel.findOne({ numero: value.numero });
    
            if (numeroExistente) {
                return res.status(400).json({ message: 'Numero do pedido já existe' });
            }

            const pedido = await PedidoModel.create(req.body);
            return res.status(200).json(pedido);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findAll(req, res){
        try {
            const pedidos = await PedidoModel.find();
            return res.status(200).json(pedidos);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findById(req, res){
        try {
            const { id } = req.params;
            const pedido = await PedidoModel.findById(id);

            if(!pedido){
                return res.status(404).json({message: "Pedido não encontrado"});
            }
            
            return res.status(200).json(pedido);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findByEmpresa(req, res){
        try {
            const { id } = req.params;
            const pedidos = await PedidoModel.find({ empresa: id });

            if(!pedidos){
                return res.status(404).json({message: "Pedidos não encontrados"});
            }
            
            return res.status(200).json(pedidos);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            const { error, value } = PedidoShema.validate(req.body);

            const empresa = await EmpresaModel.findById(req.body.empresa);

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa não encontrada' });
            }

            const cliente = await ClienteModel.findById(req.body.cliente);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            else if(cliente.empresa != value.empresa) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            const pedido = await PedidoModel.findById(id);

            if(value.numero != pedido.numero){
                const numeroExistente = await PedidoModel.findOne({ numero: value.numero, empresa: value.empresa });

                if (numeroExistente) {
                    return res.status(400).json({ message: 'Numero do pedido já existe' });
                }
            }
            
            await PedidoModel.findByIdAndUpdate(id, req.body);
            
            return res.status(200).json({message: 'Pedido atualizado'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const pedido = await PedidoModel.findByIdAndDelete(id);

            if(!pedido){
                return res.status(404).json({message: "Pedido não encontrado"});
            }
            
            return res.status(200).json({message: 'Pedido deletado'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }
}

module.exports = new PedidoController();