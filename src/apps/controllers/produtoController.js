const ProdutoModel = require('../models/produtoModel');
const EmpresaModel = require('../models/empresaModel');
const Joi = require('joi');

const ProdutoShema = Joi.object({
    nome: Joi.string().required(),
    valor: Joi.number().required(),
    descricao: Joi.string().required(),
    empresa: Joi.string().length(24).hex().required(),
  });

class ProdutoController {
    async create(req, res){
        try {
            const { error, value } = ProdutoShema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const empresa = await EmpresaModel.findById(req.body.empresa);

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa não encontrada!' });
            }

            const nomeExistente = await ProdutoModel.findOne({ nome: value.nome,  empresa: value.empresa});
    
            if (nomeExistente) {
                return res.status(400).json({ message: 'Nome já cadastado nessa empresa!' });
            }

            const produto = await ProdutoModel.create(req.body);
            return res.status(200).json(produto);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findAll(req, res){
        try {
            const produtos = await ProdutoModel.find();
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findById(req, res){
        try {
            const { id } = req.params;
            const produto = await ProdutoModel.findById(id);

            if(!produto){
                return res.status(404).json({message: "Pruduto não encontrado!"});
            }
            
            return res.status(200).json(produto);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async findByEmpresa(req, res){
        try {
            const { id } = req.params;
            const produtos = await ProdutoModel.find({ empresa: id });

            if(!produtos){
                return res.status(404).json({message: "Produtos não encontrados!"});
            }
            
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            const { error, value } = ProdutoShema.validate(req.body);

            const produto = await ProdutoModel.findById(id);

            if(value.nome != produto.nome){
                const nomeExistente = await ProdutoModel.findOne({ nome: value.nome, empresa: value.empresa });

                if (nomeExistente) {
                    return res.status(400).json({ message: 'Nome já existe!' });
                }
            }

            await ProdutoModel.findByIdAndUpdate(id, req.body);
            
            return res.status(200).json({message: 'Produto atualizado!'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const produto = await ProdutoModel.findByIdAndDelete(id);

            if(!produto){
                return res.status(404).json({message: "Pruduto não encontrado!"});
            }
            
            return res.status(200).json({message: 'Produto deletado!'});
        } catch (error) {
            return res.status(404).json({message: error});
        }
    }
}

module.exports = new ProdutoController();