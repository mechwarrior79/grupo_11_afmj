//CONFIGURO LA TABLA CON VARIOS PARAMETROS

module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // Uso 'Product' para llamar esta tabla siempre   

    let cols = { //Defino las variables de los campos de la tabla y sus tipos
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        mainDescription: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        secondaryDescription: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255)
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        categoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        statusId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false 
    };

    //Defino al modelo Product con los parámetros arriba definidos
    const Product = sequelize.define(alias, cols, config);

    //Defino las relaciones que hay entre esta tabla y las demás
    Product.associate = function (models) {
        Product.belongsTo(models.Category, { // models.Category -> Product es el valor del alias en Category.js
            as: 'category', // El nombre del modelo
            foreign_key: 'categoryId' // Es el campo en Product que la vincula con esta tabla
        });
    }
    
    Product.associate = function (models) {
        Product.belongsTo(models.Status, { // models.Status -> Product es el valor del alias en Status.js
            as: 'status', // El nombre del modelo
            foreign_key: 'statusId' // Es el campo en Product que la vincula con esta tabla
        });
    }
    return Product;
};