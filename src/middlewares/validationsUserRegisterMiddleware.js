//Permite usar direcciones de rutas
const path = require("path");

//Habilito la función body del paquete de express-validator para validar los campos que vienen en req.body
const { body } = require('express-validator');


// Guardo en en el array validations los resultados de las validaciones que tienen los campos 

const validationsUserRegisterMiddleware = [

    // Es el nombre del campo que dice en el input 'name'

    body ('name')
        .notEmpty().withMessage('Por favor completar el nombre').bail()
        .isLength({min:2}).withMessage('El nombre debe contener al menos 2 caracteres'),
    body ('surname')
        .notEmpty().withMessage('Por favor completar el apellido').bail()
        .isLength({min:2}).withMessage('El apellido debe contener al menos 2 caracteres'),
    body ('sexId').notEmpty().withMessage('Por favor completar el sexo'),
    body ('birthDate').notEmpty().withMessage('Tienes que elegir una fecha de nacimiento'),
    body ('email')
        .notEmpty().withMessage('Por favor completar el email').bail() // Con bail si tengo un error en notEmpty 
                                                                    // no sigo con las validaciones. Corto acá
        .isEmail().withMessage('Debes escribir un email válido'),
    body ('roleId').notEmpty().withMessage('Por favor completar el rol'),
    body ('password')
        .notEmpty().withMessage('Por favor completar la contraseña').bail()
        .isStrongPassword().withMessage('Contraseña débil. Debe contener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula, un número y un carácter especial'),                      
    body ('repeatPassword')
        .notEmpty().withMessage('Por favor completar repetir contraseña').bail()
        .isStrongPassword().withMessage('Contraseña débil. Debe contener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula, un número y un carácter especial'),                      
    body ('newUserImage').custom( (value, { req } ) => {
        // Me fijo si la extensión del archivo de imagen que subo coincide con los que quiero

        // Guardo la información del archivo subido y defino formatos de archivo de imagen permitidos
        let file = req.file; 
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        
        // Si no me llega ningún archivo muestro un mensaje de error, sino valido su formato
        
        if (!file) {
            throw new Error('Por favor subir un archivo de imagen');
        } else {
            // Si me llegó un archivo me fijo si el formato coincide con el que yo quiero permitir
            let fileExtension = path.extname(file.originalname);
            //Tiro mensaje de error si no es el formato requerido
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ') } `);
            }
        }
        return true;
    }) 
];

module.exports = validationsUserRegisterMiddleware;