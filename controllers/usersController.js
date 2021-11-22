
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
    

    // Creación de usuario registrandolo

    register: (req, res) => {
        res.render('./users/register')
    },

    // Login de usuario

    login: (req, res) => {
        res.render('./users/login')
    },

    user: (req,res) =>{
        res.redirect ('../')
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
            //Hasheo la password que me vino cargado en el formulario
            password: bcryptjs.hashSync(req.body.password, 10), 
           //Si vino un archivo de imagen lo tomo, sino pongo imagen por default
            image: req.file ? req.file.filename : "defaultUser.png" 
            }
            
    
            //Agrego los datos del nuevo usuario a la base de datos
    
            //Agrego este nuevo usuario a users con un push
            users.push(newUser);
    
            //Guardo users actualizado en la base de datos
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
    
             // Lo redirige a la página de users donde muestra la lista actualizada
            res.redirect('/');
          
            
        //res.redirect ('../')
        
    }
  }
  
  module.exports = controller;