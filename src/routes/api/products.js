//Defino la variable express para usarla
const express = require('express');

//Permite usar direcciones de rutas
const path = require('path'); 

//Habilito la función router para mandar las funciones
const router = express.Router();

const productsAPIController = require ('../../controllers/api/productsAPIController');

//get de product
router.get('/', productsAPIController.index);
//get de product con id
router.get('/:id', productsAPIController.productDetail);



module.exports = router;
