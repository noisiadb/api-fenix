var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var usuariosSchema = Schema({
    user : String,
    pass : String
});

module.exports = mongoose.model('Usuarios', usuariosSchema);