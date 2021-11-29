
//Permite codificar (hashear) la password del usuario y comparar su contenido para el login
const bcryptjs = require('bcryptjs');

//Permite ver el resulado de las validaciones de datos
const { validationResult } = require('express-validator'); 

//Permite usar archivos
const fs = require('fs');

//Permite usar direcciones de rutas
const path = require('path'); 


//Defino en usersFilePath la ruta en donde está el archivo JSON users
const usersFilePath = path.join(__dirname, '../data/users.json');

/*En users almaceno el contenido del archivo JSON convertido en un array de
objetos literales*/
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


// Cargo las funciones que quiero que haga
// Las derivo por render al archivo ejs que le diga

const controller = {

    // Derivo cada función a la página que le corresponde
    
    //Busca el usuario por mail usando cookies

    userFromCookie: (marParams) => {
    
    /*console.log('marParams es: ' + marParams);*/
    
    /* Guardo en userToLogin el usuario que está guardado en el email de la cookie y retorno el objeto literal
    del usuario */
    
    let userToLogin = users.find( user => {
        return user.email == marParams;
    });

    return userToLogin;

    },

    // Creación de usuario registrandolo

    register: (req, res) => {
        res.render('./users/register')
    },

    // Login de usuario

    login: (req, res) => { 
        console.log(req.cookies);

        res.render('./users/login')
    },

    /*profile: (req,res) =>{
        res.redirect ('../')
    },*/

    loginProcess: (req, res) => {

       /* console.log(req.body);*/

        /* Busco al usuario por email y guardo los datos de la búsqueda del usuario en la variable 
        userToLogin*/
       
        let userToLogin = users.find( user => {
            return user.email == req.body.email;
        });

        
        /* Si encuentro un usuario pregunto si su password es la misma que tengo hasheada.
        Si es verdad redirijo al usuario al perfil de su usuario.
        Sino lo redirecciono al login con mensajes de error */

        if (userToLogin) { //Si existe el usuario en la base de datos

        /* Comparo la password que me vino por el request del body con la password
        hasheada y guardo el resultado de la comparación en isOkPassword. Puede ser true o false */

                                                    //texto plano       //texto hasheado
            let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

            if (isOkPassword) { /* Si la password ingresada es correcta, ya puedo loguear al usuario
                en su página de perfil */
                

                /* Con esto guardo todos los datos del usuario a lo largo de todas las páginas del 
                navegador */

                req.session.userLogged = userToLogin;

                /* Verifico en el request del body si está tildado "Recordar usuario".
                Si está puesto, quiere decir que el usuario está logueado, con lo cual
                voy a guardar en la cookie userEmail el email que me vino en el request del body
                con duración 30 segundos de prueba
                */

                if (req.body.rememberUser) {
                    res.cookie('userEmail', req.body.email, { maxAge: ( 1000 * 60 ) } );     
                }

                //Redirecciono al usuario a su página de perfil

                return res.redirect('./profile');
            }
            
            //Si hay algo mal se redirecciona a la página del login mandando un mensaje de error

            return res.render('./users/login', {
                errors: {
                    email: {
                        msg: 'Email y/o password inválidos'
                    }
                }
            });

        }

        return res.render('./users/login', {
            errors: {
                email: {
                    msg: 'Email no encontrado en la base de datos'
                }
            }
        });

    },

    profile: (req, res) => {

        /* A la página del profile le voy a mandar un objeto literal que tiene la información guardada 
        en session con los datos del usuario logueado (userLogged) */
        
        return res.render('./users/userProfile', {
             user: req.session.userLogged
        });
    },

    // Almaceno los datos cargados en el formulario de creación en la base de datos 

    newRegister: (req, res) => {

        /*
        // Muestra los errores de validación en el request. Me dice cuáles campos tuvieron error
        const resultValidation = validationResult(req);
        
        //Me fijo si resultValidation tiene errores fijandome si su longitud es mayor a 0
        if ( resultValidation.length > 0 ) { 
        //Si hay errores le paso

        }*/

        // Antes de crear al usuario me tengo que fijar si hay un usuario creado con el mismo email

        /* Busco al usuario por email y guardo los datos de la búsqueda del usuario a crear en la variable 
        userInDB*/
       
        const userInDB = users.find( user => {
            return user.email == req.body.email;
        });

        // Si el mail del usuario está repetido, lo mando a la página del login
        if (userInDB) { 
            res.redirect('/users/login');
        };
        
        let newUser = {/*Creo el objeto literal almacenando los datos recogidos del formulario
            por medio del req.body
            De esta forma hago que coincida con el objeto del formato JSON del archivo de la base de
            datos */
    
            id: users[users.length - 1].id + 1, //Es la última posición del id de users + 1
            userLogin: req.body.userLogin,
            name: req.body.name,
            surname: req.body.surname,
            sex: req.body.sex,
            birthDate: req.body.birthDate,
            email: req.body.email,
            //Hasheo la password que me vino cargada en el formulario
            password: bcryptjs.hashSync(req.body.password, 10), 
           //Si vino un archivo de imagen lo tomo, sino pongo imagen por default
            image: req.file ? req.file.filename : "defaultUser.png" 
            }
            
    
            //Agrego los datos del nuevo usuario a la base de datos
    
            //Agrego este nuevo usuario a users con un push
            users.push(newUser);
    
            //Guardo users actualizado en la base de datos
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
    
             // Lo redirige a la página principal donde muestra la lista actualizada
            res.redirect('/');     
        
    },

    logout: (req, res) => {
        
        //Borra todo lo que está en sesión
        req.session.destroy();

        //Destruyo la cookie para que cuando me loguee de vuelta no me aparezca el usuario
        res.clearCookie('userEmail');

        //Lo redirijo al '/' de la página
        return res.redirect('/');
    }

  }
  
  module.exports = controller;