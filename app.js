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


app.put('/productos/:id', (req, res)=>{
       // res.send('actualizando un producto')
       const prodEncontrado = productos.find((p)=>p.id==req.params.id)

        if(!prodEncontrado){
          return res.status(404),res.json('No se encuentra el producto')
        }

        console.log(req.params.id)
        console.log(req.body)
        const nuevosDatos =req.body

        productos =productos.map(p=>p.id==req.params.id?{...p,...nuevosDatos}:p)
        res.json('productos actualizados')

      })

app.delete('/productos/:id', (req, res)=>{
        //res.send('eliminando un producto')
        const prodEncontrado = productos.find((p)=>p.id==req.params.id)

        if(!prodEncontrado){
          return res.status(404),res.json('No se encuentra el producto')
        }

        productos = productos.filter((p)=>p.id!=req.params.id)
        res.json('producto eliminado')
        console.log(productos)
        

})

app.get('/productos/:id', (req, res)=>{
        console.log(req.params.id)
        //res.send('mostrando un producto')

//forma larga

//const prodEncontrado = productos.find((producto)=>{
  //return producto.id == req.params.id
//})

//forma corta

const prodEncontrado = productos.find((p)=>p.id==req.params.id)

        if(!prodEncontrado){
          return res.status(404),res.json('No se encuentra el producto')
        }else{
  return res.json({
    "mensaje": "producto encontrado",
    "producto": prodEncontrado
  })
}




})

app.listen(3000, ()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
}
)