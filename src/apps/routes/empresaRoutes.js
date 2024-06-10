const { Router } = require('express');
const EmpresaController = require('../controllers/empresaController');
const router = Router();

router.post('/', EmpresaController.create);
router.get('/', EmpresaController.findAll);
router.get('/:id', EmpresaController.findById);
router.put('/:id', EmpresaController.update);
router.delete('/:id', EmpresaController.delete);
router.get('/usuario/:id', EmpresaController.findByUser);

module.exports = router;