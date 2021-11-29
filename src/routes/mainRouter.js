//Defino la variable express para usarla
const express = require('express');

//Habilito la función router para mandar las funciones
const router = express.Router();

// Guardo en la variable mainController la ruta y el archivo que tiene todas las funciones que está en controllers/mainController.js

const mainController = require('../controllers/mainController');

// Con router, de acuerdo a la ruta que ponga, le digo que haga tal función 

router.get('/', mainController.index);

module.exports = router;
