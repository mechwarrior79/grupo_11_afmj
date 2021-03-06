//Defino la variable express para usarla
const path = require('path');

//Defino la variable express para usarla
const express = require('express');

//Habilito la función router para mandar las funciones
const router = express.Router();

//Habilito la función body del paquete de express-validator para validar los campos que vienen en req.body
const { body } = require('express-validator');

//Defino la variable del middleware guestMiddleware
const guestMiddleware = require('../middlewares/guestMiddleware');

//Defino la variable del middleware authMiddleware
const authMiddleware = require('../middlewares/authMiddleware');

//Defino la variable del middleware multerMiddlewareUsers
const upload = require('../middlewares/multerUserMiddleware');

//Defino la variable del middleware validationsUserRegisterMiddleware
const validationsUserRegisterMiddleware = require('../middlewares/validationsUserRegisterMiddleware');

//Defino la variable del middleware validationsUserLoginMiddleware
const validationsUserLoginMiddleware = require('../middlewares/validationsUserLoginMiddleware');


// Guardo en la variable usersController la ruta y el archivo que tiene todas las funciones que está en controllers/usersController.js

const usersController = require('../controllers/usersController');
const req = require('express/lib/request');

// Con router, de acuerdo a la ruta que ponga, le digo que haga tal función 

//Listado de usuarios

router.get('/list', usersController.list);


//Perfil del usuario
/* Con authMiddleware hago que si no hay nadie en sesión, mi sistema lo redirija a la página 
del login */ 
router.get ('/detail/:id', authMiddleware, usersController.detail); //


//Proceso de login

//Login del usuario
/*Con guestMiddleware hago que si hay alguien en sesión, mi sistema lo redirija a la página 
de perfil del usuario */
router.get('/login', guestMiddleware, usersController.login); 

//Proceso la información cargada en el login del usuario
router.post ('/login', validationsUserLoginMiddleware, usersController.loginProcess);


//Proceso de registro del usuario

//Registro del usuario

/* Con guestMiddleware hago que si hay alguien en sesión, mi sistema lo redirija a la página 
de perfil del usuario */

router.get('/register', guestMiddleware, usersController.register);

/* Almaceno la información cargada del formulario en la base de datos y agrego el archivo de la imagen
subido por multer */

router.post ('/register', upload.single('newUserImage'), validationsUserRegisterMiddleware, usersController.processRegister) 


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
