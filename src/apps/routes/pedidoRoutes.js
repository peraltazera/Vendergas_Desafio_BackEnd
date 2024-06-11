const { Router } = require('express');
const PedidoController = require('../controllers/pedidoController');
const router = Router();

router.post('/', PedidoController.create);
router.get('/', PedidoController.findAll);
router.get('/:id', PedidoController.findById);
router.put('/:id', PedidoController.update);
router.delete('/:id', PedidoController.delete);
router.get('/empresa/:id', PedidoController.findByEmpresa);

module.exports = router;