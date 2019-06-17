var express = require('express')
var controladores = require('../controladores/controladores.js')

var api = express.Router()

/* https://proyectofenix.herokuapp.com/validar */
api.post("/validar", controladores.validar)

/* https://proyectofenix.herokuapp.com/mapa */
api.get("/mapa", controladores.mapa)

module.exports = api;