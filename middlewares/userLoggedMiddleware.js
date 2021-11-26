const user = require('../controllers/usersController');

/* Quiero saber si hay alguien en sesión.
Si hay alguien, muestro cierta parte de la barra de navegación */

function userLoggedMiddleware (req, res, next) {
  
    //En la variable res.locals.isLogged le digo que el usuario no está logueado (false)
    //res.locals son variables que se pueden compartir en todas las vistas sin tener en cuenta el controlador

    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = user.userFromCookie(emailInCookie);

    //Si encontró el usuario de la cookie, lo paso a sesión

    if ( userFromCookie ) {
        req.session.userLogged = userFromCookie;

    };
    
    //Si hay un usuario logueado en sesión, le digo que el usuario está logueado (true)

    if (req.session.userLogged) {

        res.locals.isLogged = true;

        /* Paso la información del usuario en sesión para que sea compartida por todo el programa
        con la variable res.locals.userLogged */

        res.locals.userLogged = req.session.userLogged;
      
    }

    
    next ();

};

module.exports = userLoggedMiddleware;