var Usuario = require("../models/usuarios.js")

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
                res.tstaus(200).send({
                    encontrado: false
                })
            }
        }
    })
}

/* Exportamos las funciones para poder usarlas en routes */
module.exports = {
    validar
}