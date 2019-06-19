var express = require('express')
var controladores = require('../controladores/controladores.js')

var api = express.Router()

/* https://proyectofenix.herokuapp.com/validar */
api.post("/validar", controladores.validar)

/* https://proyectofenix.herokuapp.com/validar2 */
api.get("/validar2/:user/:pass", controladores.validar2)

/* https://proyectofenix.herokuapp.com/mapa */
api.get("/mapa", controladores.mapa)

/* https://proyectofenix.herokuapp.com/update */
api.put("/update", controladores.update)

/* https://proyectofenix.herokuapp.com/usuarios */
api.get("/usuarios", controladores.cargarUsuarios)

/* https://proyectofenix.herokuapp.com/usuarios/crear */
api.post("/usuarios/crear", controladores.crearUsuario)

/* https://proyectofenix.herokuapp.com/usuarios/delete/:idUser */
api.delete("/usuarios/delete/:idUser", controladores.deleteUsuario)

module.exports = api;