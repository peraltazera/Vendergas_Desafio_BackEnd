const { Router } = require('express');
const usuarioRoutes = require('./usuarioRoutes');

const router = Router();

router.get('/health', (req, res) => {
    return res.send({ message: 'Ok' });
});

router.use('/usuarios', usuarioRoutes);

module.exports = router;