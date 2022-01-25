//Permite usar las bases de datos
const { User } = require('../../database/models');

const usersAPIController = {

    // Muestro la lista de usuarios

    list: (req, res) => {

        User.findAll()
            .then(users => {

                // Para poder sacar seleccionar los campos de cada usuario, lo que voy a hacer es
                // convertir los datos de los usuarios que se reciben en un array, así los puedo
                // manipular con mayor facilidad

                const usersArray = users.map( ( user ) => {
                    return user.dataValues;
                });

                // Del usersArray saco por cada usuario la información que no es necesaria 
                // o sensible
                // Agrego el link para información individual del usuario

                usersArray.forEach( (user ) => {
                    delete user.surname;
                    delete user.birthDate;
                    delete user.password;
                    delete user.image;
                    delete user.roleId;
                    delete user.sexId;
                    user.detail = `http://localhost:3000/api/users/${user.id}`;
                });


                // Voy a retornar en un JSON los datos requeridos (cantidad de usuarios y 
                // los datos de los usuarios )

                // Indico que la operación fue ok con el código de status 200

                return res.status(200).json({
                        status: 200,
                        count: users.length,
                        data: usersArray
                })
            })
            //Si hay errores en el proceso se nos muestra
            .catch((error) => console.error(error))
    },

    // Veo el detalle del usuario

    detail: (req, res) => {
        User.findByPk(req.params.id)
            .then(user => {
                // En caso que el usuario exista, procedemos a procesar la información
                // para mostrarla después, sino muestro un mensaje de error diciendo
                // que no se encontró el usuario

                // Si el usuario existe, modifico los datos que necesito y los retorno en un JSON

                if ( user != null) {

                    // Guardo la información del usuario para poder modificarla

                    const userDetail = user.dataValues;

                    // Saco la información que no es necesaria o sensible
                    delete userDetail.password;
                    delete userDetail.roleId;
                    delete userDetail.sexId;
                    userDetail.image = `/public/users/${userDetail.image}`;

                    // Voy a retornar en un JSON el dato del usuario en data

                    // Indico que la operación fue ok con el código de status 200

                    return res.status(200).json({
                        status: 200,
                        data: userDetail
                    })
                };

                // Si no se encontró el usuario muestro un mensaje de error

                return res.send({
                    error: 'Usuario no encontrado'
                })
            })

        //Si hay errores en el proceso se nos muestra
        .catch((error) => console.error(error));
    }

}

module.exports = usersAPIController;



