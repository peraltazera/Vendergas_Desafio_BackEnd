const { Router } = require('express');
const ClienteController = require('../controllers/clienteController');
const router = Router();

router.post('/', ClienteController.create);
router.get('/', ClienteController.findAll);
router.get('/:id', ClienteController.findById);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);
router.get('/empresa/:id', ClienteController.findByEmpresa);

module.exports = router;