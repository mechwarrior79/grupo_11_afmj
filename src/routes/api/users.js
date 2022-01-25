//Defino la variable express para usarla
const express = require('express');

//Permite usar direcciones de rutas
const path = require('path'); 

//Habilito la función router para mandar las funciones
const router = express.Router();

const usersAPIController = require ('../../controllers/api/usersAPIController');

//get de product
router.get('/', usersAPIController.list);

//get de product con id
router.get('/:id', usersAPIController.detail);


module.exports = router;