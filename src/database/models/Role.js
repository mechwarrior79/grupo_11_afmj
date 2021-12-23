//CONFIGURO LA TABLA CON VARIOS PARAMETROS

module.exports = (sequelize, dataTypes) => {
    let alias = 'Role'; // Uso 'Role' para llamar esta tabla siempre   

    let cols = { //Defino las variables de los campos de la tabla y sus tipos
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        role: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false 
    };

    //Defino al modelo Role con los parámetros arriba definidos
    const Role = sequelize.define(alias, cols, config);

    //Defino las relaciones que hay entre esta tabla y las demás
    Role.associate = function (models) {
        Role.hasMany(models.User, { // models.User -> User es el valor del alias en User.js
            as: 'roles', // El nombre del modelo pero en plural
            foreignKey: 'roleId' // Es el campo en User que la vincula con esta tabla
        });
    }
    
    return Role;
};