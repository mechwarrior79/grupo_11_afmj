//Permite usar direcciones de rutas
const path = require("path");

//Habilito la función body del paquete de express-validator para validar los campos que vienen en req.body
const { body } = require('express-validator');

const validationsProductUpdateMiddleware = [

    body('name').notEmpty().withMessage('Debe completar este campo obligatoriamente para el registro!').bail().isLength({min:5}).withMessage('El nombre debe contener al menos 5 caracteres'),
    body('mainDescription').notEmpty().withMessage('Debe completar este campo obligatoriamente para el registro!').bail().isLength({min:20}).withMessage('La descripcion principal debe contener al menos 20 caracteres'),
    body('secondaryDescription').notEmpty().withMessage('Debe completar este campo obligatoriamente para el registro!').bail().isLength({min:20}).withMessage('La descripcion secundaria debe contener al menos 20 caracteres'),
    body('category').notEmpty().withMessage('Debe seleccionar obligatoriamente una categoria para el registro!'),
    body('status').notEmpty().withMessage('Debe seleccionar obligatoriamente un status para el registro!'),
    body('price').notEmpty().withMessage('El precio no puede estar vacio!'),
    body('discount').notEmpty().withMessage('El descuento no puede estar vacio!'),
    body('editedProductImage').custom((value , {req})=>{

        let file = req.file;
        let acceptedExtension = [ '.jpeg','.png' , '.gif','.jpg' ,'JPG', 'JPEG', 'PNG', 'GIF'];
        
        if(!file){
            throw new Error ('Debe subir una imagen para su producto!')
        } else { 
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtension.includes(fileExtension)){
                throw new Error ('Debe subir una imagen de formato .jpg, .png ,.gif , .jpeg ,.JPG, .JPEG, .PNG, .GIF')
            }
        }
        return true
    })
];


module.exports = validationsProductUpdateMiddleware;