//Permite usar direcciones de rutas
const path = require("path");


//Defino la variable de multer para poder subir archivos en las peticiones de tipo PUT y POST
const multer = require('multer');

//Configuro la variable multer

const storage = multer.diskStorage( {
    destination: function (req, file, cb) {
        cb(null, './public/images/users'); //Defino la ubicación en donde se guardan los archivos
        //Va desde la raiz del proyecto
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); //Defino cómo quiero nombrar al archivo que quiero guardar
    }
});

const upload = multer ({storage}); //Ejecuto multer pasando como objeto literal la constante storage

module.exports = upload;

