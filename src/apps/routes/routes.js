const { Router } = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const empresaRoutes = require('./empresaRoutes');

const router = Router();

router.get('/health', (req, res) => {
    return res.send({ message: 'Ok' });
});

router.use('/usuarios', usuarioRoutes);
router.use('/empresas', empresaRoutes);

module.exports = router;