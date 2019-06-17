var Usuario = require("../models/usuarios")
var Zona = require("../models/zonas")

/* Funcion para validar el login */
function validar(req, res) {

    var params = req.body;

    var paramsUser = params.user;
    var paramsPass = params.pass;

    Usuario.find({ "user": paramsUser, "pass": paramsPass }).exec((err, usuario) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor",
                error: err
            })
        } else {
            if (usuario != 0) {
                res.status(200).send({
                    encontrado: true,
                    usuario: usuario
                })
            } else {
                res.status(200).send({
                    encontrado: false
                })
            }
        }
    })
}

// Función para mostrar el mapa
function mapa(req, res) {

    Zona.find({}).exec((err, zonas) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor",
                error: err
            })
        } else {
            if (zonas != 0) {
                res.status(200).send({
                    encontrado: true,
                    zonas: zonas
                })
            } else {
                res.status(200).send({
                    encontrado: false
                })
            }
        }
    })
}

function update(req, res) {

    var idDispositivo = req.body.dispositivoAleatorio
    var estadoDispositivoNuevo = req.body.estadoDispositivoAleatorio
    aleatorio = numeroAleatorio(1, 18)

    Zona.update({ "Dispositivos.idDispositivo": idDispositivo },
        {
            $set: {
                "Dispositivos.$.estadoDispositivo": estadoDispositivoNuevo
            }
        }, { new: true }).exec((err, zonas) => {
            if (err) {
                res.status(500).send({
                    message: "Error en el servidor",
                    error: err
                })
            } else {
                if (zonas != 0) {

                    res.status(200).send({
                        encontrado: true,
                        zonas: zonas
                    })
                } else {
                    res.status(200).send({
                        encontrado: false
                    })
                }
            }
        })
}
/* Exportamos las funciones para poder usarlas en routes */
module.exports = {
    validar,
    mapa,
    update
}

function numeroAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}