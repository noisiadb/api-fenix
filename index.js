var mongoose = require("mongoose")
var app = require("./app")
var port = 3800;

mongoose.Promise = global.Promise;
// mongodb://admin:MdC-7824@cluster0-98qru.gcp.mongodb.net/mdc?retryWrites=true
// mongodb://admin:MdC-7824@ds137687.mlab.com:37687/heroku_wqxg0rvb
mongoose.connect("mongodb://admin:Studium2018;@ds237337.mlab.com:37337/heroku_mhbdsd8b", { useNewUrlParser: true })
    .then(() => {
        console.log("Conexion establecida");
        app.listen(process.env.PORT || port, function() {
            console.log("El servidor esta corriendo en https://proyectofenix.herokuapp.com/");
        })
    }).catch(err => console.log(err))