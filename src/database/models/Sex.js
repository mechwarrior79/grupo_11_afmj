//CONFIGURO LA TABLA CON VARIOS PARAMETROS

module.exports = (sequelize, DataTypes) => {
    let alias = 'Sex'; // Uso 'Sex' para llamar esta tabla siempre   

    let cols = { //Defino las variables de los campos de la tabla y sus tipos
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        sex: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false 
    };

    //Defino al modelo Sex con los parámetros arriba definidos
    const Sex = sequelize.define(alias, cols, config);

    //Defino las relaciones que hay entre esta tabla y las demás
    Sex.associate = function (models) {
        Sex.hasMany(models.User, { // models.User -> User es el valor del alias en User.js
            as: 'sexes', // El nombre del modelo pero en plural
            foreign_key: 'sexId' // Es el campo en User que la vincula con esta tabla
        });
    }
    
    return Sex;
};