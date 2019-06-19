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

// Función para cargar el mapa
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

/* Funcion para hacer update de un dispositivo y su estado */
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

/* Funcion para validar el login a traves de GET, version movil */
function validar2(req, res) {

    console.log("req.params");
    console.log(req.params);

    var params = req.params;

    if (params.user && params.pass) {

        var paramsUser = params.user;
        var paramsPass = params.pass;

        Usuario.find({ "user": paramsUser, "pass": paramsPass })
            .exec((err, usuario) => {
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

    } else {
        res.status(200).send({
            encontrado: false,
            Por_que: "Faltan parametros en la url o esta mal escrita :("
        })
    }
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

/* Funcion para crear un usuario nuevo */
function crearUsuario(req, res) {
    var usuario = new Usuario();

    var params = req.body;

    if (params.user && params.pass) {

        usuario.user = params.user
        usuario.pass = params.pass
        usuario.admin = params.admin

        usuario.save((err, userStored) => {
            if (err) {
                res.status(500).send({
                    message: "Error en el servidor"
                })
            } else {
                if (userStored) {
                    res.status(200).send({
                        insertado: true,
                        usuario: userStored
                    })
                } else {
                    res.status(200).send({
                        insertado: false,
                        Por_que: "Motivos extraños, fijate en " +
                            "los caracteres tal vez",
                        message: "No se ha guardado el usuario"
                    })
                }
            }
        })
    } else {
        res.status(200).send({
            insertado: false,
            Por_que: "faltan parametros por añadir",
            message: "El nombre de usuario, la contraseña y el" +
                "tipo de privilegios son obligatorios"
        })
    }
}

/* Funcion para borrar un usuario por _id */
function deleteUsuario(req, res) {

    if (req.params.idUser) {

        var id = req.params.idUser
        var mongoose = require("mongoose")

        /* "_id": new mongoose.mongo.ObjectId(idUser) */
        Usuario.findByIdAndRemove({ "_id": new mongoose.mongo.ObjectId(id) })
            .exec(function (err, usuarioRemoved) {
                if (err) {
                    res.status(500).send({
                        borrado: false,
                        message: "Error en el servidor",
                        messageError: err,
                        id: id
                    })
                } else {
                    if (usuarioRemoved != 0) {
                        res.status(200).send({
                            borrado: true,
                            usuarioRemoved: usuarioRemoved
                        })
                    } else {
                        res.status(200).send({
                            borrado: false,
                            message: "La matricula no existe"
                        })
                    }
                }
            })
    } else {
        res.status(200).send({
            borrado: false,
            message: "Falta por especificar el id de la matricula"
        })
    }
}

/* Funcion parea actualizar un usuario */
function updateUsuario(req, res) {

    var paramsBody = req.body
    var paramsParam = req.params

    console.log("paramsBody");
    console.log(paramsBody);
    console.log("paramsParam");
    console.log(paramsParam);

    if (paramsParam.idUser && paramsBody.user
        && paramsBody.pass && paramsBody.admin) {

        var id = paramsParam.idUser;
        var mongoose = require("mongoose")

        Usuario.findOneAndUpdate({ "_id": new mongoose.mongo.ObjectId(id) },
            paramsBody, { new: true })
            .exec((err, usuario) => {
                if (err) {
                    res.status(500).send({
                        actualizado: false,
                        message: "Error en el servidor",
                        error: err
                    })
                } else {
                    if (usuario) {
                        res.status(200).send({
                            actualizado: true,
                            usuario: usuario
                        })
                    } else {
                        res.status(200).send({
                            actualizado: false
                        })
                    }
                }
            })
    } else {
        res.status(200).send({
            actualizado: false,
            message: "Faltan parametros por añadir"
        })
    }

}


/* Exportamos las funciones para poder usarlas en routes */
module.exports = {
    validar,
    mapa,
    update,
    validar2,
    cargarUsuarios,
    crearUsuario,
    deleteUsuario,
    updateUsuario
}

