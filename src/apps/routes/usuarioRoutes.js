const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController');
const router = Router();

router.post('/', UsuarioController.create);
router.get('/', UsuarioController.findAll);
router.get('/:id', UsuarioController.findById);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.delete);

module.exports = router;