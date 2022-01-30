//Permite usar las bases de datos
const { Product, Category } = require('../../database/models');

const productsAPIController = {


    //Muestro la lista de productos

    index: (req, res) => {

        // Hago llamados asincrónicos con promesas para recolectar todos los productos y las categorias 
        // de la base de datos

        let promProducts = Product.findAll({
            // Vinculo la información guardada en los modelos Category y Status con esta tabla
            include: [ {association: 'category' }, {association: 'status' },  ] }
        );
        let promCategory = Category.findAll();
        Promise
            .all([promProducts, promCategory])
            .then( ([allProducts, allCategories]) => {

                // Para poder sacar seleccionar los campos de cada producto y/o categoria, lo que voy a hacer es
                // convertir los datos de productos y categorias que se reciben en un array de objetos literales, así los 
                // puedo manipular con mayor facilidad

                // const categoriesArray = allCategories.map( ( category ) => {
                //     return category.dataValues;
                // });

                const productsArray = allProducts.map( ( product ) => {
                    return product.dataValues;
                });


                // Solución basada en 2 categorias. No está abierto el sistema para incorporar más categorias

                let cantElectricCar = 0;
                let cantAccessory = 0;

                // Me fijo si en el campo categoria de cada posición si es 1

                // Si es 1 se lo sumo al contador autos eléctricos, sino al de accesorios
                
                productsArray.forEach(product => {
                    product.categoryId == 1 ? cantElectricCar++ : cantAccessory++  
                });

                console.log('Electric ' , cantElectricCar);
                console.log('Accessory ' , cantAccessory);


                // Del productsArray saco por cada producto la información que no es necesaria 
                // o sensible
                // Agrego el link para información individual del producto

                productsArray.forEach( ( product ) => {
                    delete product.secondaryDescription;
                    delete product.image;
                    delete product.price;
                    delete product.discount;
                    delete product.CategoryId; // No sé por qué apareció. Se elimina
                    delete product.StatusId; // No sé por qué apareció. Se elimina
                    delete product.categoryId; 
                    delete product.statusId; 
                    product.category = product.category.category;
                    product.status = product.status.status; 
                    product.detail = `http://localhost:3050/api/products/${product.id}`;
                });


                // Voy a retornar en un JSON los datos requeridos (cantidad de productos, cantidad de 
                // productos por categoria y los datos de los usuarios )

                // Indico que la operación fue ok con el código de status 200

                return res.status(200).json({

                    status: 200,
                    count: allProducts.length,
                    countByCategory: allCategories.length,
                    countByCategoryECar: cantElectricCar,
                    countByCategoryAcc: cantAccessory,
                    products: productsArray
                })
            })
            //Si hay errores en el proceso se nos muestra
            .catch((error) => console.error(error))


        
        
    },

    // Veo el detalle del producto

    productDetail: (req, res) => {
        Product.findByPk(req.params.id, 
            // Vinculo la información guardada en los modelos Category y Status con esta tabla
            { 
                include: [ {association: 'category' }, {association: 'status' },  ] 
            } )
            .then(product => {
                // En caso que el producto exista, procedemos a procesar la información
                // para mostrarla después, sino muestro un mensaje de error diciendo
                // que no se encontró el producto

                // Si el producto existe, modifico los datos que necesito y los retorno en un JSON

                if ( product != null) {

                    // Guardo la información del producto para poder modificarla

                    const productDetail = product.dataValues;

                    // Saco la información que no es necesaria o sensible
                    delete productDetail.CategoryId; // No sé por qué apareció. Se elimina
                    delete productDetail.StatusId; // No sé por qué apareció. Se elimina
                    delete productDetail.categoryId; 
                    delete productDetail.statusId; 
                    productDetail.category = productDetail.category.category;
                    productDetail.status = productDetail.status.status; 
                    productDetail.image = `/images/productos/${productDetail.image}`;

                    // Voy a retornar en un JSON el dato del producto en products

                    // Indico que la operación fue ok con el código de status 200

                    return res.status(200).json({
                        status: 200,
                        product: productDetail
                    })
                };

                // Si no se encontró el producto muestro un mensaje de error

                return res.send({
                    error: 'Producto no encontrado'
                })
            })

        //Si hay errores en el proceso se nos muestra
        .catch((error) => console.error(error));
    }

}

module.exports = productsAPIController;



