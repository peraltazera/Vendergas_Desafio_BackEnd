const { Router } = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const empresaRoutes = require('./empresaRoutes');
const clienteRoutes = require('./clienteRoutes');

const router = Router();

router.get('/health', (req, res) => {
    return res.send({ message: 'Ok' });
});

router.use('/usuarios', usuarioRoutes);
router.use('/empresas', empresaRoutes);
router.use('/clientes', clienteRoutes);

module.exports = router;