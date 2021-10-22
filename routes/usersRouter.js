//Defino la variable express para usarla
const express = require('express');

//Habilito la función router para mandar las funciones
const router = express.Router();

// Guardo en la variable usersController la ruta y el archivo que tiene todas las funciones que está en controllers/usersController.js

const usersController = require('../controllers/usersController');

// Con router, de acuerdo a la ruta que ponga, le digo que haga tal función 


router.get('/register/', usersController.register);

router.get('/login/', usersController.login);

module.exports = router;
