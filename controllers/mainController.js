// Cargo las funciones que quiero que haga
// Las derivo por render al archivo ejs que le diga

const controller = {

// Sirve para mostrar la página principal con el listado de productos

  index: (req, res) => {
      res.render('index')
  }

}

module.exports = controller;