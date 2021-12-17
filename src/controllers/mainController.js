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
const { Op } = require('sequelize');


// Cargo las funciones que quiero que haga
// Las derivo por render al archivo ejs que le diga

const controller = {

// Sirve para mostrar la página principal con el listado de productos

  index: (req, res) => {
    
    Product.findAll()
      .then(products=>{
        res.render('index', {products});
      })

      /*res.render('index', { 
        'products' : products })*/
  }

}

module.exports = controller;