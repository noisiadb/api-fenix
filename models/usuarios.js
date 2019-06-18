var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var usuariosSchema = Schema({

    user: String,
    pass: String,
    admin: Boolean
    
});

module.exports = mongoose.model('Usuarios', usuariosSchema);