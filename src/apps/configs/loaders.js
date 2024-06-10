const startDB = require('../database/index');

class Loaders {
    start(){
        startDB();
    }
}

module.exports = new Loaders();