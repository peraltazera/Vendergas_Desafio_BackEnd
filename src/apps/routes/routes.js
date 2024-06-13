const { Router } = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const empresaRoutes = require('./empresaRoutes');
const clienteRoutes = require('./clienteRoutes');
const produtoRoutes = require('./produtoRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const pedidoProdutoRoutes = require('./pedidoProdutoRoutes');
const authenticateToken = require('../middlewares/auth');
const UsuarioController = require('../controllers/usuarioController');

const router = Router();

router.get('/health', (req, res) => {
    return res.send({ message: 'Ok' });
});

router.post('/login', UsuarioController.login);
router.post('/cadastro', UsuarioController.create);

router.use(authenticateToken);

router.use('/usuarios', usuarioRoutes);
router.use('/empresas', empresaRoutes);
router.use('/clientes', clienteRoutes);
router.use('/produtos', produtoRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/pedidos_produtos', pedidoProdutoRoutes);

module.exports = router;