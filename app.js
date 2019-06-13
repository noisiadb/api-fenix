var express = require("express")
var cors = require("cors")
var bodyParser = require('body-parser')

var app = express()

// Cargar rutas
var controls_router = require("./routes/routes")

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// configurar CORSE
app.use(cors());

// rutas
app.use("/", controls_router)


module.exports = app;