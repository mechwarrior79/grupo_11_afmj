//Defino la variable express para usarla
const express = require('express');

//Habilito la función router para mandar las funciones
const router = express.Router();


// Guardo en la variable productsController la ruta y el archivo que tiene todas las funciones que está en controllers/productsController.js

const productsController = require('../controllers/productsController');


// Con router, de acuerdo a la ruta que ponga, le digo que haga tal función 


router.get('/detail', productsController.productDetail);

router.get('/cart', productsController.cart);

router.get('/list',productsController.list);

router.get('/create', productsController.create);

router.post('/create/', productsController.created);

router.get('/edit/', productsController.edit);

router.put('/edit/', productsController.modified);



module.exports = router;
