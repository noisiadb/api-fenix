var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var zonasSchema = Schema({
    idZona: String,
    nombreZona: String,
    coordenadaXZona: String,
    coordenadaYZona: String,
    Dispositivos: [
        {
            idDispositivo: Number,
            coordenadaXDispositivo: Number,
            coordenadaYDispositivo: Number,
            estadoDispositivo: Number
        }
    ],
    LugaresDeAbastecimiento: [
        {
            idLugarDeAbastecimiento: Number,
            coordenadaXLugarDeAbastecimiento: Number,
            coordenadaYLugarDeAbastecimiento: Number
        }
    ],
    Incendios: [
        {
            idLugarIncendio: Number,
            coordenadaXIncendio: Number,
            coordenadaYIncendio: Number
        }
    ]
});

module.exports = mongoose.model('Zonas', zonasSchema);