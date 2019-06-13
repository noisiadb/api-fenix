var express = require('express')
var controladores = require('../controladores/controladores.js')

var api = express.Router()

api.post("/validar", controladores.validar)

module.exports = api;