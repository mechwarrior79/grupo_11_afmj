//Defino la variable express para usarla
const express = require('express');

//Habilito la función router para mandar las funciones
const router = express.Router();

//Defino la variable de multer para poder subir archivos en las peticiones de tipo PUT y POST
const multer = require('multer');

// Guardo en la variable usersController la ruta y el archivo que tiene todas las funciones que está en controllers/usersController.js

const usersController = require('../controllers/usersController');


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

// Con router, de acuerdo a la ruta que ponga, le digo que haga tal función 

router.get('/login', usersController.login);

router.get('/register', usersController.register);

router.post ('/login', usersController.user);

//Almaceno la información cargada del formulario en la base de datos
router.post ('/register', upload.single('newUserImage'), usersController.newRegister)

module.exports = router;
