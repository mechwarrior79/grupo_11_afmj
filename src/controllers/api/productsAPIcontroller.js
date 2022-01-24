//Permite usar las bases de datos
const { Product } = require('../../database/models');
/*const { Category } = require('../database/models');
const { Status } = require('../database/models');
const { Op } = require('sequelize');*/

const productAPIcontroller = {

    //Muestro la lista de productos

    index: (req, res) => {

        Product.findAll()
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        count: product.length,
                        countByCategory: "aca va la categoria hay que traerlo de la base de datos",
                        detail: 'http://localhost:3000/productos/api'
                    },

                    data: product
                }
                res.json(respuesta);
            })
    },

    // Veo el detalle del producto

    productDetail: (req, res) => {
        Product.findByPk(req.params.id)
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: 'imagen de producto'

                    },
                    data: product
                }
                res.json(respuesta);
            });
    }


}

module.exports = productAPIcontroller;



