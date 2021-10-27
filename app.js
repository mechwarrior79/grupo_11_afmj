const express = require ("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override'); //Sirve para poder usar los métodos PUT y DELETE


// Defino las variables en donde se van a ubicar las rutas

const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

//Para tomar los parámetros de los formularios POST 

app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

//Sirve para poder usar los métodos PUT y DELETE
app.use(methodOverride('_method')); //Cuando ponga _method se aplica methodOverride


//Defino en dónde se va a ubicar la carpeta /views
app.set('views', path.join(__dirname, '/src/views/'));


//Inicializo ejs
app.set('view engine', 'ejs');


//listen en localHost 3000

app.listen( 3000 , () => { console.log("Servidor levantado "," http://localhost:3000/")
});


//.use sirven de archivos estaticos como css e imagenes

const staticFiles = express.static("public");
app.use(staticFiles);



//Cuando use '/' se va a manejar desde mainRouter
app.use('/', mainRouter);

//Cuando use '/users' se va a manejar desde usersRouter
app.use('/users', usersRouter);

//Cuando use '/products' se va a manejar desde productsRouter
app.use('/products', productsRouter);




