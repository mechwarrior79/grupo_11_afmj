function authMiddleware(req, res, next) {

    /* Con authMiddleware si no tengo a nadie en sesión, el sistema te redirige a la página del login */ 
    
        if (!req.session.userLogged) {
            return res.redirect('/users/login');
            
        }
        
        //Si tengo a alguien en sesión hago un next haciendo que el request siga con su cadena de peticiones.
    
        next(); 
    }
    
    module.exports = authMiddleware;