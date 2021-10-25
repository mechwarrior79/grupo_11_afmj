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

    //Muestro la lista de productos

    list: (req,res) =>{
        res.render ('./products/productList')
    },

    // Creo un producto

    create: (req, res) => {
        res.render('./products/productCreate')
    },

    // Mensaje producto creado y testeando que lleguen bien los datos por parámetros 

    created: (req, res) => {
        let datosCreados=req.body;
        console.log(datosCreados);
        res.send( 'Producto creado')
              
    },
   
    // Edito los datos de un producto
    
    edit: (req, res) => {
        res.render('./products/productUpdate')
    },

     // Mensaje producto modificado y testeando que lleguen bien los datos por parámetros 

     modified: (req, res) => {
        let datosModificados=req.body;
        console.log(datosModificados);
        res.send( 'Producto modificado')
              
    }
    
  }
  
  module.exports = controller;