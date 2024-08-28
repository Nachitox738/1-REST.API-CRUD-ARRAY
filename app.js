const express = require ('express')
const app = express();
const port = 3000


//datos array

let productos = []

//middleware

app.use(express.json()) 

//rutas

app.get('/productos', (req, res)=>{
    //res.send('listado de productos')
    res.json(productos)
  })

app.post('/productos', (req, res)=>{
   // res.send('guardando nuevo producto')
    console.log(req.body)
    console.log(productos.length+1)
    nuevoProducto={id: productos.length+1,...req.body}
    //genera un id y le agrega una copia de req.body
    productos.push(nuevoProducto)
    res.json({mensaje:'producto agregado',
        producto: req.body
    })
    })


app.put('/productos', (req, res)=>{
        res.send('actualizando un producto')
      })

app.delete('/productos', (req, res)=>{
        res.send('eliminando un producto')
      })

app.get('/productos/:id', (req, res)=>{
        console.log(req.params)
        res.send('mostrando un producto')
      })

app.listen(3000, ()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
}
)