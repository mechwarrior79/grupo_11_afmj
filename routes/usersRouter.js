//Defino la variable express para usarla
const express = require('express');

//Habilito la función router para mandar las funciones
const router = express.Router();

//Defino la variable de multer para poder subir archivos en las peticiones de tipo PUT y POST
const multer = require('multer');

//Habilito la función body del paquete de express-validator para validar los campos que vienen en req.body
const { body } = require('express-validator');



// Guardo en la variable usersController la ruta y el archivo que tiene todas las funciones que está en controllers/usersController.js

const usersController = require('../controllers/usersController');

// Guardo en en el array validations los resultados de las validaciones que tienen los campos 
/*
const validations = [

    body ('userLogin').notEmpty().withMessage('Nombre de usuario vacío. Por favor completar el nombre de usuario'),
    body ('name').notEmpty().withMessage('Nombre vacío. Por favor completar el nombre'),
    body ('surname').notEmpty().withMessage('Apellido vacío. Por favor completar el apellido'),
    body (' sex').notEmpty().withMessage('Sexo vacío. Tienes que elegir el sexo'),
    body (' birthDate').notEmpty().withMessage('Fecha de nacimiento vacío. Tienes que elegir una fecha de nacimiento'),
    body (' email').notEmpty().withMessage('Email vacío. Por favor completar el email'),
    body (' password').notEmpty().withMessage('Password vacía. Por favor completar el Password'),
 
];*/

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

/* Almaceno la información cargada del formulario en la base de datos y valido los campos
con un array después de haber agregado el archivo de multer */

router.post ('/register', upload.single('newUserImage'), usersController.newRegister)

module.exports = router;
