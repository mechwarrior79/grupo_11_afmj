//Defino la variable express para usarla
const express = require('express');

//Habilito la función router para mandar las funciones
const router = express.Router();

// Guardo en la variable mainController la ruta y el archivo que tiene todas las funciones que está en controllers/mainController.js

const mainController = require('../controllers/mainController');

// Guardo en la variable productsController la ruta y el archivo que tiene todas las funciones que está en controllers/productsController.js

const productsController = require('../controllers/productsController');

// Guardo en la variable usersController la ruta y el archivo que tiene todas las funciones que está en controllers/usersController.js

const usersController = require('../controllers/usersController');

// Con router, de acuerdo a la ruta que ponga, le digo que haga tal función 

router.get('/', mainController.index);

router.get('/products/productDetail/:id', productsController.productDetail);

router.get('/products/cart/:id', productsController.cart);

router.get('/products/create/:id', productsController.edit);

router.get('/products/edit/:id', productsController.edit);

router.get('/users/register/:id', usersController.register);

router.get('/users/login/:id', usersController.login);

module.exports = router;
