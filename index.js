const express = require("express");
const app = express();
const { Router } = express;

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./Assets"))
app.use(express.static("./public"))

const routerProductos = new Router();

const archivoLocal = "./productos.txt"
let Contenedor = require('../Clase4/desafio')  // Hago la llamada al Class del desafio anterior
let nuevoContenedor = new Contenedor(archivoLocal)
let productosPost = [];

/// Armado de Router para ingresos con formularios desde HTML usando un array

routerProductos.get("/productospostman", (req, res, next)=>{
    res.json(productosPost)
})

routerProductos.post("/productospost", (req, res, next)=>{
    let ingresos  = req.body
    let nuevoProducto = {   ...ingresos,
        id: productosPost.length + 1
    }
    productosPost.push(nuevoProducto)
    res.send(productosPost)
})

// Devuelve todos los productos, uso async por uso de lo realizado en anterior desafio
/*  app.get("/api/productos", (req, res, next) => {
     (async () => {
         contenido = await nuevoContenedor.getAll();
        res.send(contenido)
     })();
     }) */

routerProductos.get("/api/productos", (req, res, next) => {
    (async () => {
        console.log(__dirname)
        contenido = await nuevoContenedor.getAll();
        res.send(contenido)
    })();
})

// devuelve unicamente producto por iD
/*  app.get("/api/productos/:id", (req, res, next) => {
     let { id } = req.params;
    (async () => {
       contenido = await nuevoContenedor.getAll();

      if (Number(id) > contenido.length) {
           res.send("Error, el producto no existe")
       }        else {
            res.send(contenido[id - 1])
       }
    })();
 }) */

routerProductos.get("/api/productos/:id", (req, res, next) => {
    let { id } = req.params;
    (async () => {
        contenido = await nuevoContenedor.getAll();

        if (Number(id) > contenido.length) {
            res.send("Error, el producto no existe")
        }
        else {
            res.send(contenido[id - 1])
        }
    })();
})

// Recibe y agrega un producto

/* app.post("/api/productos", (req, res, next) => {
    let productos = req.body;
    (async () => {
        contenido = await nuevoContenedor.getAll();
         let nuevoProducto = { ...productos, id: contenido.length + 1}
         contenido.push(nuevoProducto)
         res.send(contenido)
     })();
 }) */

routerProductos.post("/api/productos", (req, res, next) => {
    let productos = req.body;
    (async () => {
        contenido = await nuevoContenedor.getAll();
        let nuevoProducto = {   ...productos,
                                id: contenido.length + 1
                            }
        contenido.push(nuevoProducto)
        res.send(contenido)
    })();
})

 app.put("/api/productos/:id", (req, res, next) => {
     let producto = req.body;
    let {id} = req.params;
     (async () => {
         contenido = await nuevoContenedor.getAll();

        if (Number(id) > contenido.length) {
           res.send("Error, el producto no existe")
         }
         else {
            contenido.splice(Number(id) - 1,1,producto)
       }
        res.json( contenido )
    })();
})

routerProductos.put("/api/productos/:id", (req, res, next) => {
    let producto = req.body;
    let {id} = req.params;
    (async () => {
        contenido = await nuevoContenedor.getAll();

        if (Number(id) > contenido.length) {
            res.send("Error, el producto no existe")
        }
        else {
            let nuevoProducto = {...producto,
                id: id
            }
            contenido.splice(Number(id) - 1,1,nuevoProducto)
            res.json(contenido)
        }
    })();
})

/// Se elimina objeto por ID
/*  app.delete("/api/productos/:id", (req, res, next) => {
     let producto = req.body;
     let {id} = req.params;
     (async () => {
         contenido = await nuevoContenedor.getAll();

         if (Number(id) > contenido.length) {
             res.send("Error, el producto no existe")
         }
        else {
             contenido.splice(Number(id) - 1,1)
         }
         res.json( contenido )
     })();
 }) */

routerProductos.delete("/api/productos/:id", (req, res, next) => {
    let producto = req.body;
    let {id} = req.params;
    (async () => {
        contenido = await nuevoContenedor.getAll();

        if (Number(id) > contenido.length) {
            res.send("Error, el producto no existe")
        }
        else {
            contenido.splice(Number(id) - 1,1)
        }
        res.json( contenido )
    })();
})

// ESCUCHAMOS EL PUERTO ACTIVO
const server = app.listen(PORT, () => {
    console.log(`Server activo en http://localhost:${PORT}`);
})

server.on("error", error => console.log(error))