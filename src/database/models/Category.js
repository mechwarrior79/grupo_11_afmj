//CONFIGURO LA TABLA CON VARIOS PARAMETROS

module.exports = (sequelize, DataTypes) => {
    let alias = 'Category'; // Uso 'Category' para llamar esta tabla siempre  

    let cols = { //Defino las variables de los campos de la tabla y sus tipos
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false 
    };

    //Defino al modelo Category con los parámetros arriba definidos
    const Category = sequelize.define(alias, cols, config);

    //Defino las relaciones que hay entre esta tabla y las demás
    Category.associate = function (models) {
        Category.hasMany(models.Product, { // models.Product -> Product es el valor del alias en Product.js
            as: 'products', // El nombre del modelo pero en plural
            foreign_key: 'categoryId' // Es el campo en Product que la vincula con esta tabla
        });
    }

    return Category;
};