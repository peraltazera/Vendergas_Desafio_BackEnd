const { Router } = require('express');
const PedidoProdutoController = require('../controllers/pedidoProdutoController');
const router = Router();

router.post('/', PedidoProdutoController.create);
router.get('/', PedidoProdutoController.findAll);
router.get('/:id', PedidoProdutoController.findById);
router.put('/:id', PedidoProdutoController.update);
router.delete('/:id', PedidoProdutoController.delete);
router.get('/produto/:id', PedidoProdutoController.findByProduto);
router.get('/pedido/:id', PedidoProdutoController.findByPedido);

module.exports = router;