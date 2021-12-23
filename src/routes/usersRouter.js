//Defino la variable express para usarla
const express = require('express');

//Habilito la función router para mandar las funciones
const router = express.Router();

//Defino la variable de multer para poder subir archivos en las peticiones de tipo PUT y POST
const multer = require('multer');

//Habilito la función body del paquete de express-validator para validar los campos que vienen en req.body
const { body } = require('express-validator');

//Defino la variable del middleware guestMiddleware
const guestMiddleware = require('../middlewares/guestMiddleware');

//Defino la variable del middleware authMiddleware
const authMiddleware = require('../middlewares/authMiddleware');

// Guardo en la variable usersController la ruta y el archivo que tiene todas las funciones que está en controllers/usersController.js

const usersController = require('../controllers/usersController');
const req = require('express/lib/request');

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

//Listado de usuarios

router.get('/list', usersController.list);


//Perfil del usuario
/* Con authMiddleware hago que si no hay nadie en sesión, mi sistema lo redirija a la página 
del login */ 
router.get ('/detail/:id', usersController.detail); //, authMiddleware


//Proceso de login

//Login del usuario
/*Con guestMiddleware hago que si hay alguien en sesión, mi sistema lo redirija a la página 
de perfil del usuario */
router.get('/login',  usersController.login); //guestMiddleware,

//Proceso la información cargada en el login del usuario
router.post ('/login', usersController.loginProcess);


//Proceso de registro del usuario

//Registro del usuario

/* Con guestMiddleware hago que si hay alguien en sesión, mi sistema lo redirija a la página 
de perfil del usuario */

router.get('/add', usersController.add); //, guestMiddleware

/* Almaceno la información cargada del formulario en la base de datos y agrego el archivo de la imagen
subido por multer */

router.post ('/create', upload.single('newUserImage'), usersController.create) 


//Edición de información del usuario

/* Tomo la información del usuario seleccionado en la base de datos para modificar los 
datos */

router.get('/edit/:id', usersController.edit);

/* Almaceno la información modificada del formulario en la base de datos y agrego si hubiese modificado el 
archivo de la imagen subida por multer */

router.post ('/update/:id', upload.single('editedUserImage'), usersController.update) 


// Eliminación del usuario

// Borro la información del usuario seleccionado en la base de datos

router.get('/delete/:id', usersController.destroy);

//Logout del usuario
router.get ('/logout/', usersController.logout);


module.exports = router;
