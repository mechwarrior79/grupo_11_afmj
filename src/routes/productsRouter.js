//Defino la variable express para usarla
const express = require('express');

//Habilito la función router para mandar las funciones
const router = express.Router();

//Defino la variable de multer para poder subir archivos en las peticiones de tipo PUT y POST
const multer = require('multer');


// Guardo en la variable productsController la ruta y el archivo que tiene todas las funciones que está en controllers/productsController.js

const productsController = require('../controllers/productsController');

//Configuro la variable multer

const storage = multer.diskStorage( {
    destination: function (req, file, cb) {
        cb(null, './public/images/productos'); //Defino la ubicación en donde se guardan los archivos
        //Va desde la raiz del proyecto
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); //Defino cómo quiero nombrar al archivo que quiero guardar
    }
});

const upload = multer ({storage}); //Ejecuto multer pasando como objeto literal la constante storage



// Con router, de acuerdo a la ruta que ponga, le digo que haga tal función 

//Ver el carro de compras
router.get('/cart', productsController.cart);

//get de product
router.get('/',productsController.index);

//Creación de un producto
router.get('/create/', productsController.create);

//get de product con id
router.get('/list/:id', productsController.productDetail);


//Almaceno la información cargada del formulario en la base de datos
router.post('/', upload.single('newProductImage'), productsController.created); 


//Edición del producto

/*Llamo los datos con el id del producto a editar y cargo el formulario con los datos anteriores 
para editar los datos */
router.get('/edit/:id/', productsController.edit);

//Modifico los datos del producto y actualizo la base de datos
router.put('/edit/:id/', upload.single('editedProductImage'), productsController.edited); /*Hay que modificar 
//con esto en el form del productUpdate*/ 

//Eliminación del producto
router.delete('/delete/:id', productsController.destroy);

//Busqueda de datos
router.post ('/search' , productsController.searching);


module.exports = router;
