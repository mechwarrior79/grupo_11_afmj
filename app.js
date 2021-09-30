const express = require ("express");
const path = require("path");
const app = express();

//listen en localHost 3000

app.listen( 3000 , () => { console.log("Servidor levantado "," http://localhost:3000/index")
});


//.use sirven de archivos estaticos como css e imagenes

const staticFiles = express.static("public");
app.use(staticFiles);

//get 

// genero una respuesta atravez de un get traigo mi "/views/index.html" con el  metodo path que esta guardado en una variable senFile

app.get("/index", (req,res) => {
    const fileToSent = path.join(__dirname, "/views/index.html" );
    res.sendFile(fileToSent);
});

app.get("/cart", (req,res) => {
    const fileToSent = path.join(__dirname, "/views/cart.html" );
    res.sendFile(fileToSent);
});

app.get("/login", (req,res) => {
    const fileToSent = path.join(__dirname, "/views/login.html" );
    res.sendFile(fileToSent);
});

app.get("/productDetail", (req,res) => {
    const fileToSent = path.join(__dirname, "/views/productDetail.html" );
    res.sendFile(fileToSent);
});

app.get("/register", (req,res) => {
    const fileToSent = path.join(__dirname, "/views/register.html" );
    res.sendFile(fileToSent);
})

//post

app.post("/login", (req,res) => {
    res.redirect("/index");
});

app.post("/cart", (req,res) => {
    res.redirect("/index");
});

app.post("/productDetail", (req,res) => {
    res.redirect("/index");
});

app.post("/register", (req,res) => {
    res.redirect("/index");
});



