const PedidoModel = require('../models/pedidoModel');
const ProdutoModel = require('../models/produtoModel');
const PedidoProdutoModel = require('../models/pedidoProdutoModel');
const Joi = require('joi');

const PedidoProdutoShema = Joi.object({
    pedido: Joi.string().length(24).hex().required(),
    produto: Joi.string().length(24).hex().required(),
    quantidade: Joi.number().required()
  });
  

class PedidoProdutoController {
    async create(req, res){
        try {
            const { error, value } = PedidoProdutoShema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const pedido = await PedidoModel.findById(req.body.pedido);

            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrada' });
            }

            const produto = await ProdutoModel.findById(req.body.produto);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrada' });
            }

            const pedidoProdutos = await PedidoProdutoModel.create(req.body);
            return res.status(200).json(pedidoProdutos);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findAll(req, res){
        try {
            const pedidoProdutos = await PedidoProdutoModel.find();
            return res.status(200).json(pedidoProdutos);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findById(req, res){
        try {
            const { id } = req.params;
            const pedidoProdutos = await PedidoProdutoModel.findById(id);

            if(!pedidoProdutos){
                return res.status(404).json({message: "Pedido_Produto não encontrado"});
            }
            
            return res.status(200).json(pedidoProdutos);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findByProduto(req, res){
        try {
            const { id } = req.params;

            const produto = await ProdutoModel.findById(id);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            const pedidoProduto = await PedidoProdutoModel.find({ produto: id });

            if(!pedidoProduto){
                return res.status(404).json({message: "Pedido Produto não encontrados"});
            }
            
            return res.status(200).json(pedidoProduto);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findByPedido(req, res){
        try {
            const { id } = req.params;

            const pedido = await PedidoModel.findById(id);

            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            const pedidoProduto = await PedidoProdutoModel.find({ pedido: id });

            if(!pedidoProduto){
                return res.status(404).json({message: "Pedido Produto não encontrados"});
            }
            
            return res.status(200).json(pedidoProduto);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            const pedido = await PedidoModel.findById(req.body.pedido);

            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrada' });
            }

            const produto = await ProdutoModel.findById(req.body.produto);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrada' });
            }

            await PedidoProdutoModel.findByIdAndUpdate(id, req.body);
            
            return res.status(200).json({message: 'Pedido_Produto atualizado'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const pedidoProdutos = await PedidoProdutoModel.findByIdAndDelete(id);

            if(!pedidoProdutos){
                return res.status(404).json({message: "Pedido_Produto não encontrado"});
            }
            
            return res.status(200).json({message: 'Pedido_Produto deletado'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }
}

module.exports = new PedidoProdutoController();