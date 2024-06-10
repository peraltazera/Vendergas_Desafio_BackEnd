const { Router } = require('express');

const router = Router();

router.get('/health', (req, res) => {
    return res.send({ message: 'Ok' });
});

module.exports = router;