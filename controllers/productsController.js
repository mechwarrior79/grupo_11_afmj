// Cargo las funciones que quiero que haga
// Las derivo por render al archivo ejs que le diga

const controller = {

    // Derivo cada función a la página que le corresponde
    
    // Veo el detalle del producto

    productDetail: (req, res) => {
        res.render('./products/productDetail')
    },

     // Muestro el carrito de compras

     cart: (req, res) => {
        res.render('./products/cart')
    },

    // Creo un producto

    create: (req, res) => {
        res.send("Estamos en create de productos")
    },

   
    // Edito los datos de un producto
    
    edit: (req, res) => {
        res.send("Estamos en edit de productos")
    }
  }
  
  module.exports = controller;