//Permite usar archivos
const fs = require('fs');

//Permite usar direcciones de rutas
const path = require('path'); 


//Defino en productsFilePath la ruta en donde está el archivo JSON products
const productsFilePath = path.join(__dirname, '../data/products.json');

/*En products almaceno el contenido del archivo JSON convertido en un array de
objetos literales*/
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


// Cargo las funciones que quiero que haga
// Las derivo por render al archivo ejs que le diga

const controller = {

    // Derivo cada función a la página que le corresponde
    
     //Muestro la lista de productos

     index: (req,res) =>{
        res.render ('./products/productList', {'products':products})
    },

    // Veo el detalle del producto

    productDetail: (req, res) => {
        const id = req.params.id;
        const product = products.find (product=>{
            return product.id == id
        })
        res.render('./products/productDetail', {'product': product})
    },

     // Muestro el carrito de compras

     cart: (req, res) => {
        res.render('./products/cart')
    },

   
    // Creo un producto

    create: (req, res) => {
        res.render('./products/productCreate')
    },

    // Almaceno los datos cargados en el formulario de creación en la base de datos 

    created: (req, res) => {

        let newProduct = {/*Creo el objeto literal almacenando los datos recogidos del formulario
        por medio del req.body
        De esta forma hago que coincida con el objeto del formato JSON del archivo de la base de
        datos */

        id: products[products.length - 1].id + 1, //Es la última posición del id de products + 1
        productName: req.body.productName,
        productMainDescription: req.body.productMainDescription,
        productSecondaryDescription: req.body.productSecondaryDescription,
        productCategory: req.body.productCategory,
        productStatus: req.body.productStatus,
        productPrice: req.body.productPrice,
        productDiscount: req.body.productDiscount,
       //Si vino un archivo de imagen lo tomo, sino pongo imagen por default
        productImage: req.file ? req.file.filename : "default-image.png" 
        }
        

        //Agrego los datos del nuevo producto a la base de datos

        //Agrego este nuevo producto a products con un push
        products.push(newProduct);

        //Guardo products actualizado en la base de datos
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

         // Lo redirige a la página de productos donde muestra la lista actualizada
        res.redirect('/products');
      
        
    },
   
    // Busco los datos de un producto y mando el formulario para editarlo (vino por GET)
    
    edit: (req, res) => {
    
        // En la variable id tengo el id del producto a modificar que me mandaron por parámetro en req.params.id
        const id = req.params.id;
        
        /* Busco el producto con la variable id y guardo los datos del producto a modificar en la variable 
        product*/
       
        
        const product = products.find(product => {
            return product.id == id;
        }) 

        // Mando al formulario para hacer la actualización de datos 

        res.render('./products/productUpdate', { productSent : product });

    },


     // Con los datos actualizados del producto los reemplazo en el archivo (vino por PUT)

     edited: (req, res) => {
     
        // En la variable id tengo el id del producto a modificar que me mandaron por parámetro en req.params.id
        let id = req.params.id;
        
        /* Busco el producto con la variable id y guardo los datos del producto a modificar en la variable 
        product */
        
        let productToEdit = products.find(product => {
            return product.id == id;
        })

        // Voy a tomar los datos modificados del req.body y los pongo en el producto modificado 
        let editedProduct =  /* Tiene que ser un objeto literal porque el JSON es un array de objetos
            literales. */
            {
                id: id, //Tomo el id que me pasaron por parámetro
                productName: req.body.productName,
                productMainDescription: req.body.productMainDescription,
                productSecondaryDescription: req.body.productSecondaryDescription,
                productCategory: req.body.productCategory,
                productStatus: req.body.productStatus,
                productPrice: req.body.productPrice,
                productDiscount: req.body.productDiscount,
                
                /*Pregunto si recibo un archivo con la imagen
                Si me llegó un archivo lo tomo, sino pongo el archivo que vino originalmente */
                
                productImage: req.file ? req.file.filename : productToEdit.productImage   
            }

        // Reemplazo en la posición real del array el producto modificado
        products.forEach((producto, index) => {
            if (producto.id == id){
                products[index] = editedProduct;
                }
        });

        //Escribo el archivo de products con la información actualizada

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

        //Redirijo a la página del listado de productos
        
        res.redirect('/products');

    },

    // Elimino un producto de la base de datos (vino por DELETE)
    
    destroy: ( req, res ) => {  

        /* En la variable id tengo el id del producto a eliminar que me mandaron por parámetro en 
        req.params.id */
        
        const id = req.params.id;   
        
        /* Para eliminarlo guardo en finalProducts los productos distintos del id que recibí 
        por parámetro */

        let finalProducts = products.filter(product => {
            return product.id != id;
        })

        //Escribo el archivo de products con la información actualizada

        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " "));

        //Redirijo a la página del listado de productos
        
        res.redirect('/products');

    }
    
  }
  
  module.exports = controller;