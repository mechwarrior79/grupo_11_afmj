//Defino la variable express para usarla
const express = require('express');

//Permite usar direcciones de rutas
const path = require('path'); 

//Habilito la función router para mandar las funciones
const router = express.Router();

const productAPIcontroller = require ('../../controllers/api/productsAPIcontroller');

//get de product
router.get('/', productAPIcontroller.index);
//get de product con id
router.get('/list/:id', productAPIcontroller.productDetail);



module.exports = router;
