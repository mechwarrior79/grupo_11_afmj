//CONFIGURO LA TABLA CON VARIOS PARAMETROS

module.exports = (sequelize, dataTypes) => {
    let alias = 'Status'; // Uso 'Status' para llamar esta tabla siempre   

    let cols = { //Defino las variables de los campos de la tabla y sus tipos
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false 
    };

    //Defino al modelo Category con los parámetros arriba definidos
    const Status = sequelize.define(alias, cols, config);

    //Defino las relaciones que hay entre esta tabla y las demás
    Status.associate = function (models) {
        Status.hasMany(models.Product, { // models.Product -> Product es el valor del alias en Product.js
            as: 'statuses', // El nombre del modelo pero en plural
            foreign_key: 'statusId' // Es el campo en Product que la vincula con esta tabla
        });
    }
    
    return Status;
};