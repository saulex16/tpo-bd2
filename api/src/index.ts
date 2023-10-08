import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/clientes', async (req,res) => {
  const clients = await prisma.e01_cliente.findMany()
  res.json(clients)
})

app.put('/clientes/:id', async (req,res) => {
  const { id }= req.params
  const { nombre, apellido, direccion, activo } = req.body
  try {
    const clients = await prisma.e01_cliente.update({
      where: {nro_cliente: Number(id)},
      data: {
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        activo: activo
      }
    }
    )
    res.json(clients)
  } catch (error) {
    res.status(404).json({error: `El cliente con ID ${id} no existe`})
  }

})


app.get('/productos', async (req,res) => {
  const products = await prisma.e01_producto.findMany()
  res.json(products)
})

const server = app.listen(3000, () =>
  console.log(`Server ready at: http://localhost:3000`)
)

