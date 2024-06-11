const { Router } = require('express');
const ProdutoController = require('../controllers/produtoController');
const router = Router();

router.post('/', ProdutoController.create);
router.get('/', ProdutoController.findAll);
router.get('/:id', ProdutoController.findById);
router.put('/:id', ProdutoController.update);
router.delete('/:id', ProdutoController.delete);
router.get('/empresa/:id', ProdutoController.findByEmpresa);

module.exports = router;