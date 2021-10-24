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
    newRegister: (req,res) =>{
        res.redirect ('../')
    }
  }
  
  module.exports = controller;