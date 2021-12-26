

//Permite codificar (hashear) la password del usuario y comparar su contenido para el login
const bcryptjs = require('bcryptjs');

//Permite ver el resulado de las validaciones de datos
const { validationResult } = require('express-validator'); 

//Permite usar archivos
const fs = require('fs');

//Permite usar direcciones de rutas
const path = require('path'); 

//Permite usar las bases de datos
const { User, Role, Sex } = require('../database/models'); //De los modelos voy a usar estas tablas
const { Op } = require('sequelize');



// //Defino en usersFilePath la ruta en donde está el archivo JSON users
// const usersFilePath = path.join(__dirname, '../data/users.json');

// /*En users almaceno el contenido del archivo JSON convertido en un array de
// objetos literales*/
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


// Cargo las funciones que quiero que haga


const controller = {

    //Listo los usuarios cargados en la base de datos

    list: (req, res) => {
        User.findAll()
            .then( ( users ) => {
                res.render('./users/usersList', { users } ); // Renderizo la vista usersList pasando 
                // como datos todos los usuarios
            })
            //Si hay errores en el proceso se nos muestra
            .catch((error) => res.send(error));
    },

   


    // Login de usuario

    login: (req, res) => { 
        res.render('./users/userLogin')
    },


    loginProcess: (req, res) => {
         
        //  Busco al usuario por email y guardo los datos de la búsqueda del usuario en la variable 
        //  userToLogin
        User.findAll({
            where: {
                email: req.body.email
            }
        })
        .then( (userToLogin) => {

            if (userToLogin.length > 0) { // Con esto me fijo si existe el usuario en la base de datos
                                       // Si existe el mail del usuario va a tener un largo en caracteres
                                       // mayor a 0

                
                //  Si encuentro un usuario pregunto si su password es la misma que tengo hasheada.
                //  Si es verdad redirijo al usuario al perfil de su usuario.
                //  Sino lo redirecciono al login con mensajes de error 

                //  /* Comparo la password que me vino por el request del body con la password
                //  hasheada y guardo el resultado de la comparación en isOkPassword. Puede ser true o false */
                    
                                                             //texto plano       //texto hasheado
                    let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin[0].password);
                    
                    if (isOkPassword) { /* Si la password ingresada es correcta, ya puedo loguear al usuario
                         en su página de perfil */

                   

                //     Con esto guardo todos los datos del usuario a lo largo de todas las páginas del 
                //     navegador y le borro el campo de la password al userToLogin por seguridad
                        
                        
                        delete userToLogin[0].password; //para ver por qué no lo borra
                        req.session.userLogged = userToLogin[0];

                //          /* Verifico en el request del body si está tildado "Recordar usuario".
                //          Si está puesto, quiere decir que el usuario está logueado, con lo cual
                //          voy a guardar en la cookie userEmail el email que me vino en el request del body
                //          con duración 30 segundos de prueba
                //          */

                //          if (req.body.rememberUser) {
                //              res.cookie('userEmail', req.body.email, { maxAge: ( 1000 * 60 ) } );     
                //          }

                        // Redirecciono al usuario a su página de perfil

                        
                        return res.redirect('./detail/' + userToLogin[0].id);
                        
                     }

                //      //Si puso mal la contraseña se redirecciona a la página del login mandando un mensaje de error

                     return res.render('./users/userlogin', {
                         errors: {
                             password: {
                                 msg: 'Contraseña inválida'
                             }
                         }
                     });

                //  }

                //  return res.render('./users/login', {
                //      errors: {
                //          email: {
                //              msg: 'Email no encontrado en la base de datos'
                //          }
                //      }
                //  });
                // )


                // PARA VER CON MAS TIEMPO LAS VALIDACIONES
                // return res.render('./users/userRegister', {
                //     errors: {
                //          email: {
                //              msg: 'Este email ya está registrado'
                //          }
                //     },
                //     oldData: req.body
                // });
                //res.send('encontrado');
            
            } else { // Si no existe el mail del usuario va a tener un largo en caracteres
                     // igual a 0 

                // Mando un mensaje de error diciendo que el email no fue encontrado
            
                return res.render('./users/userLogin', {
                         errors: {
                             email: {
                                 msg: 'Email no encontrado en la base de datos'
                             }
                         }
                     });
                
            }
        })
        
        // Si no hubo errores lo redirige a la página donde muestra la lista actualizada de usuarios
        .catch((error) => res.send(error));
                
    },

    
    // Creación de usuario registrandolo

    register: (req, res) => {
        let promRole = Role.findAll();
        let promSex = Sex.findAll();
        Promise
        .all([promRole, promSex])
        .then( ([allRoles, allSexes]) => {
            return res.render('./users/userRegister', { allRoles, allSexes } ); // Renderizo la vista userRegister tomando 
                // los datos de las tablas Role y Sex
            })
            //Si hay errores en el proceso se nos muestra
            .catch((error) => res.send(error));
    },

   

    // Almaceno los datos cargados en el formulario de creación en la base de datos 

    processRegister: (req, res) => {

            // const resultValidation = validationResult(req);

            // if (resultValidation.errors.length > 0) {
            //     return res.sender('./users/userRegister', {
            //         errors: resultValidation.mapped(),
            //         oldData: req.body
            //     });
            // }

            // return res.send('Ok, las validaciones pasaron y no tienes errores');


            

       
            // Antes de crear al usuario me tengo que fijar si hay un usuario creado con el mismo email

            // Busco si el email que vino en el req.body que ingresó el nuevo usuario a crear está en la base 
            // de datos
            // El resultado de la búsqueda lo almaceno en userInDb
            // Si existe userInDb quiere decir que el usuario existe, con lo cual voy a redirigirlo
            // a la pantalla de login
            // Sino lo creo al usuario en la base de datos


            User.findAll({
                where: {
                    email: req.body.email
                }
            })
            .then( (userInDb) => {
                
                if (userInDb.length > 0) { // Con esto me fijo si existe el usuario en la base de datos
                                           // Si existe el mail del usuario userInDb va a tener un largo en caracteres
                                           // mayor a 0

                    res.redirect('../users/login');
               
                
                } else { // Si no existe el mail del usuario userInDb va a tener un largo en caracteres
                         // igual a 0 

                    //Creo el nuevo usuario en la base de datos con los datos recogidos del req.body 
                    
                    User.create ({
                        name: req.body.name,
                        surname: req.body.surname,
                        sexId: req.body.sexId,
                        birthDate: req.body.birthDate,
                        email: req.body.email,
                        roleId: req.body.roleId,
                        //Hasheo la password que me vino cargada en el formulario
                        password: bcryptjs.hashSync(req.body.password, 10), 
                        //Si vino un archivo de imagen lo tomo, sino pongo imagen por default
                        image: req.file ? req.file.filename : "defaultUser.png" 
                    })

                    // Si no hubo errores lo redirige a la página donde muestra la lista actualizada de usuarios
                    .then( () => {
                        return res.redirect('/users/list'); 
                    })
                    .catch((error) => res.send(error));
                    
                    
                }
            })
            .catch((error) => res.send(error));

                    
    },


    // Llamo la información del usuario cargada en la base de datos 

    edit: (req, res) => {
        // Cargo la información de las 3 bases de datos
        let promUser = User.findByPk(req.params.id);
        let promRole = Role.findAll();
        let promSex = Sex.findAll();
        Promise
        .all([promUser, promRole, promSex])
        .then( ([user, allRoles, allSexes]) => {
            return res.render('./users/userEdit', { user, allRoles, allSexes } ); // Renderizo la vista userEdit tomando 
                // los datos de las tablas Role, Sex y los datos del usuario a editar
            })
        //Si hay errores en el proceso se nos muestra
        .catch((error) => res.send(error));
    },


    // Almaceno los datos modificados del usuario en la base de datos 
    
    update: (req, res) => {

        /* Guardo los datos del usuario a modificar en la variable 
        userToEdit */

        let userToEdit;

        User.findByPk(req.params.id)
                .then( ( user ) => {
                   userToEdit = user;
                   User.update (
                    {
                        name: req.body.name,
                        surname: req.body.surname,
                        sexId: req.body.sexId,
                        birthDate: req.body.birthDate,
                        email: req.body.email,
                        roleId: req.body.roleId,
        
                        /*Pregunto si recibo un archivo con la imagen
                        Si me llegó un archivo lo tomo, sino pongo el archivo que vino originalmente */
                        
                        image: req.file ? req.file.filename : userToEdit.image   
                    },
                    {
                        where: 
                            { id: req.params.id }
                    })
                    .then( ()  => {
                        return res.redirect('/users/list'); 
                    })
                    //Si hay errores en el proceso se nos muestra
                    .catch((error) => res.send(error));
                } )
                
                //Si hay errores en el proceso se nos muestra
                .catch((error) => res.send(error));
            

       
    },


    //Elimino al usuario de la base de datos

    destroy: (req, res) => {

        User.destroy ( {
            where: 
                    { id: req.params.id },

            force: true // Por si hubiera problemas fuerzo al sistema para que lo elimine
            })

            .then( ()  => {
                return res.redirect('/users/list'); 
            })
            //Si hay errores en el proceso se nos muestra
            .catch((error) => res.send(error));
           
    },


    // Proceso de salir de sesión del usuario

    logout: (req, res) => {
        
        //Borra todo lo que está en sesión
        req.session.destroy();

        //Lo redirijo al '/' de la página
        return res.redirect('/'); 

        //Destruyo la cookie para que cuando me loguee de vuelta no me aparezca el usuario
        // res.clearCookie('userEmail');

    },

     //Muestro el perfil del usuario

     detail: (req, res) => {
        
        // A la página del profile le voy a mandar la información del usuario de la base de datos 
        // almacenada en el req.params.id que viene por parámetro
        
        User.findByPk(req.params.id,  {
        // Vinculo la información guardada en los modelos Role y Sex con esta tabla
            include: [ {association: 'role' } ,  { association: 'sex' } ] 
            })
            .then( ( user ) => {
                               
                //En la vista cuando vea los detalles le paso los datos de mi usuario en sesion
                res.render('./users/userDetail', { user } ); 
            } )
            
            //Si hay errores en el proceso se nos muestra
            .catch((error) => res.send(error));
            console.log('El usuario en sesión es: ', req.session);
      

        // VER que tiene la información guardada 
        // en session con los datos del usuario logueado (userLogged) 
        
        //return res.render('./users/userProfile', {
          //   user: req.session.userLogged
        //});
    }


    

  }
  
  module.exports = controller;