var Usuario = require("../models/usuarios")
var Zona = require("../models/zonas")

/* Funcion para validar el login */
function validar(req, res) {

    console.log("req.body");
    console.log(req.body);

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
    
    Zona.updateOne({ "Dispositivos.idDispositivo": idDispositivo },
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

function validar2(req, res) {
    
    console.log("req.params");
    console.log(req.params);
    console.log("req.params.user");
    console.log(req.params.user);
    
    var params = req.params;
    
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

// Función para cargar los usuarios que hay
function cargarUsuarios(req, res) {

    Usuario.find({}).exec((err, usuarios) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor",
                error: err
            })
        } else {
            if (usuarios != 0) {
                res.status(200).send({
                    encontrado: true,
                    usuarios: usuarios
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
    update,
    validar2,
    cargarUsuarios
}

