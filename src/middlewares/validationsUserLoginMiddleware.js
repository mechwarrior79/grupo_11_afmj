//Permite usar direcciones de rutas
const path = require("path");

//Habilito la función body del paquete de express-validator para validar los campos que vienen en req.body
const { body } = require('express-validator');


// Guardo en en el array validations los resultados de las validaciones que tienen los campos 

const validationsUserLoginMiddleware = [

    // Es el nombre del campo que dice en el input 'email' y 'password'


    body ('email')
        .notEmpty().withMessage('Por favor completar el email').bail() // Con bail si tengo un error en notEmpty 
                                                                    // no sigo con las validaciones. Corto acá
        .isEmail().withMessage('Debes escribir un email válido'),
    body ('password')
        .notEmpty().withMessage('Por favor completar la contraseña')
        
];

module.exports = validationsUserLoginMiddleware;