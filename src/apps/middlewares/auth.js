require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message: "Acesso negado!"}); 
    }

    try {
        const PRIVATE_KEY = process.env.PRIVATE_KEY;
        jwt.verify(token, PRIVATE_KEY);
        next();
    } catch (error) {
        return res.status(400).json({message: "Token invalido!"}); 
    }
}

module.exports = authenticateToken;