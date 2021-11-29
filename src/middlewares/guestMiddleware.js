

function guestMiddleware(req, res, next) {

/* Con guestMiddleware hago que si hay alguien en sesión, mi sistema lo redirija a la página 
de perfil del usuario */ 

    if (req.session.userLogged) {
        return res.redirect('./profile');
        
    }
    
    //Si no tengo a nadie en sesión hago un next haciendo que el request siga con su cadena de peticiones.

    next(); 
}

module.exports = guestMiddleware;