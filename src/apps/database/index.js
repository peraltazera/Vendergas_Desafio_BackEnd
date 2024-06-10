const mongoose = require('mongoose');

const URL_DB = process.env.URL_DB;

async function startDB(){
    try {
        await mongoose.connect(URL_DB);
        console.log('Conexão com o MongoDB estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o MongoDB:', error);
    }
}

module.exports = startDB;