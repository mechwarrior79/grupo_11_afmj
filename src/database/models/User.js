//CONFIGURO LA TABLA CON VARIOS PARAMETROS

module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; // Uso 'User' para llamar esta tabla siempre   

    let cols = { //Defino las variables de los campos de la tabla y sus tipos
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        surname: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        birthDate: {
            type: dataTypes.DATE,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255)
        },
        roleId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        sexId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        timestamps: false,
        deletedAt: false 
    };

    //Defino al modelo User con los parámetros arriba definidos
    const User = sequelize.define(alias, cols, config);

    //Defino las relaciones que hay entre esta tabla y las demás
    User.associate = function (models) {
        User.belongsTo(models.Role, { // models.Role -> User es el valor del alias en Role.js
            as: 'role', // El nombre del modelo
            foreignKey: 'roleId' // Es el campo en User que la vincula con esta tabla
        });

        User.belongsTo(models.Sex, { // models.Sex -> User es el valor del alias en Sex.js
            as: 'sex', // El nombre del modelo
            foreignKey: 'sexId' // Es el campo en User que la vincula con esta tabla
        }); 

    };
    
    return User;
};