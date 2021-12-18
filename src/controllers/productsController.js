//Permite usar archivos
const fs = require('fs');

//Permite usar direcciones de rutas
const path = require('path'); 


//Defino en productsFilePath la ruta en donde está el archivo JSON products
const productsFilePath = path.join(__dirname, '../data/products.json');

/*En products almaceno el contenido del archivo JSON convertido en un array de
objetos literales*/
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//Permite usar las bases de datos
const { Product } = require('../database/models');
const { Category } = require('../database/models');
const { Status } = require('../database/models');
const { Op } = require('sequelize');



// Cargo las funciones que quiero que haga
// Las derivo por render al archivo ejs que le diga

const controller = {

    // Derivo cada función a la página que le corresponde
    
     //Muestro la lista de productos

     index: (req,res) =>{

        Product.findAll()
            .then(products=>{
                res.render ('./products/productList', {products})
            })
        //Logica de JSON
       /*res.render ('./products/productList', {'products':products})*/
    },

    // Veo el detalle del producto

    productDetail: (req, res) => {

        Product.findByPk(req.params.id)
            .then(product=>{
                res.render ('./products/productDetail', {product})
            });


        //Logica de JSON    
        /*const id = req.params.id;
        const product = products.find (product=>{
            return product.id == id
        })
        res.render('./products/productDetail', {'product': product})*/
    },

     // Muestro el carrito de compras

     cart: (req, res) => {
        res.render('./products/cart')
    },

   
    // Creo un producto

    create: (req, res) => {

        let promCategory = Category.findAll();
        let promStatus = Status.findAll();
        
        Promise
        .all([promCategory, promStatus])
        .then(([allCategories, allStatuses]) => {
            return res.render('./products/productCreate', {allCategories,allStatuses})})
        .catch(error => res.send(error))

        //Logica de JSON
        /*res.render('./products/productCreate')*/
    },

    // Almaceno los datos cargados en el formulario de creación en la base de datos 

    created: (req, res) => {
        Product.create(
            {
                name: req.body.name,
                mainDescription: req.body.mainDescription,
                secondaryDescription: req.body.secondaryDescription,
                categoryId: req.body.category,
                statusId: req.body.status,
                price: req.body.price,
                discount: req.body.discount,
                //Si vino un archivo de imagen lo tomo, sino pongo imagen por default
                image: req.file ? req.file.filename : "default-image.png" 
            }
        )
        .then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))

        //Logica de JSON
        /*let newProduct = {/*Creo el objeto literal almacenando los datos recogidos del formulario
        por medio del req.body
        De esta forma hago que coincida con el objeto del formato JSON del archivo de la base de
        datos */
            /*
        id: products[products.length - 1].id + 1, //Es la última posición del id de products + 1
        name: req.body.name,
        mainDescription: req.body.mainDescription,
        secondaryDescription: req.body.secondaryDescription,
        category: req.body.category,
        status: req.body.status,
        price: req.body.price,
        discount: req.body.discount,
       //Si vino un archivo de imagen lo tomo, sino pongo imagen por default
        image: req.file ? req.file.filename : "default-image.png" 
        }
        

        //Agrego los datos del nuevo producto a la base de datos

        //Agrego este nuevo producto a products con un push
        products.push(newProduct);

        //Guardo products actualizado en la base de datos
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

         // Lo redirige a la página de productos donde muestra la lista actualizada
        res.redirect('/products');
      */
        
    },
   
    // Busco los datos de un producto y mando el formulario para editarlo (vino por GET)
    
    edit: (req, res) => {
       

        
        let productId = req.params.id;
        let promProducts = Product.findByPk(productId);
        let promCategory = Category.findAll();
        let promStatus = Status.findAll();
        
        /*Product.findByPk(productId)

            .then(product=>{
                res.render ('./products/productUpdate', {product})
        });*/

        Promise
        .all([promProducts,promCategory, promStatus])
        .then(([product,allCategories, allStatuses]) => {
            return res.render('./products/productUpdate', {product,allCategories,allStatuses})})
        .catch(error => res.send(error))
        
        //Logica de JSON

        /* En la variable id tengo el id del producto a modificar que me mandaron por parámetro en req.params.id*/
        //const id = req.params.id;
        
        /* Busco el producto con la variable id y guardo los datos del producto a modificar en la variable 
        product*/
       
        
       /* const product = products.find(product => {
            return product.id == id;
        }) 

        // Mando al formulario para hacer la actualización de datos 

        res.render('./products/productUpdate', { productSent : product });
        */
    },


     // Con los datos actualizados del producto los reemplazo en el archivo (vino por PUT)

     edited: (req, res) => {

         /*falta la funcionalidad que si no se agrega una imagen nueva te deje por defecto la imagen anterior
         ahora esta funcioando que si no se coloca una imagen nueva te pisa la vieja por una por defecto*/

        Product.update(
            {
                name: req.body.name,
                mainDescription: req.body.mainDescription,
                secondaryDescription: req.body.secondaryDescription,
                categoryId: req.body.category,
                statusId: req.body.status,
                price: req.body.price,
                discount: req.body.discount,
                //Si vino un archivo de imagen lo tomo, sino pongo imagen por default
                image: req.file ? req.file.filename : "default-image.png" 
            },
            {
                where: {id:req.params.id}
            }
        )
            .then(()=>{
                return res.redirect('/products')
            })


        },


     /*
        // En la variable id tengo el id del producto a modificar que me mandaron por parámetro en req.params.id
        let id = req.params.id;
        
        /* Busco el producto con la variable id y guardo los datos del producto a modificar en la variable 
        product */
        
       /* let productToEdit = products.find(product => {
            return product.id == id;
        })*/

        // Voy a tomar los datos modificados del req.body y los pongo en el producto modificado 
       // let editedProduct =  /* Tiene que ser un objeto literal porque el JSON es un array de objetos
        //    literales. 
         /*   {
                id: id, //Tomo el id que me pasaron por parámetro
                name: req.body.name,
                mainDescription: req.body.mainDescription,
                secondaryDescription: req.body.secondaryDescription,
                category: req.body.category,
                status: req.body.status,
                price: req.body.price,
                discount: req.body.discount,
              */  
                /*Pregunto si recibo un archivo con la imagen
                Si me llegó un archivo lo tomo, sino pongo el archivo que vino originalmente */
                
              //  image: req.file ? req.file.filename : productToEdit.image   
            //}

        // Reemplazo en la posición real del array el producto modificado
        /*products.forEach((producto, index) => {
            if (producto.id == id){
                products[index] = editedProduct;
                }
        });
        */
        //Escribo el archivo de products con la información actualizada

        //fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

        //Redirijo a la página del listado de productos
        
        //res.redirect('/products');

   

    // Elimino un producto de la base de datos (vino por DELETE)
    
    destroy: ( req, res ) => {  

        Product.destroy(
            {
                where:{id:req.params.id}
            }
        )
        .then(()=>{
            return res.redirect('/products')
        })



        /* En la variable id tengo el id del producto a eliminar que me mandaron por parámetro en 
        req.params.id */
        
        //const id = req.params.id;   
        
        /* Para eliminarlo guardo en finalProducts los productos distintos del id que recibí 
        por parámetro */

        /*let finalProducts = products.filter(product => {
            return product.id != id;
        })

        //Escribo el archivo de products con la información actualizada

        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " "));

        //Redirijo a la página del listado de productos
        
        res.redirect('/products');*/

    }
    
  }
  
  module.exports = controller;

  /*<% allStatuses.forEach(status => { %>
                        <option value="<%= status.id %>" <% if (product.statusId == status.id) { %><%= 'selected' %><% }; %>><%= status.name %></option>
                        <% }); %>
                        
                        
    <% allCategories.forEach(category => { %>
                      <option value="<%= category.id %>" <% if (product.categoryId == category.id) { %><%= 'selected' %><% }; %>><%= category.name %></option>
                      <% }); %>
                      */