import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import { HttpStatusCodes } from './utils/http-status-codes'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Clientes
app.get('/clientes', async (req, res) => {
    const clients = await prisma.e01_cliente.findMany()
    res.json(clients)
})

app.get('/clientes/:id', async (req, res) => {
    const { id } = req.params

    const client = await prisma.e01_cliente.findUnique({
        where: { nro_cliente: Number(id) },
    })

    if (!client) {
        res.status(HttpStatusCodes.NotFound.code).json({
            error: `El cliente con ID ${id} no existe`,
        })
        return
    }

    res.json(client)
})

app.post('/clientes', async (req, res) => {
    const { nombre, apellido, direccion, activo } = req.body
    try {
        const client = await prisma.e01_cliente.create({
            data: {
                nombre,
                apellido,
                direccion,
                activo,
            },
        })
        res.json(client)
    } catch (error) {
        res.status(HttpStatusCodes.BadRequest.code).json({
            error: `Parece que hay algo mal con tu consulta`,
        })
    }
})

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, direccion, activo } = req.body
    try {
        const client = await prisma.e01_cliente.update({
            where: { nro_cliente: Number(id) },
            data: {
                nombre: nombre,
                apellido: apellido,
                direccion: direccion,
                activo: activo,
            },
        })

        res.status(HttpStatusCodes.Created.code).json(client)
    } catch (error) {
        res.status(HttpStatusCodes.BadRequest.code).json({
            error: `Parece que hay algo mal en tu consulta`,
        })
    }
})

app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params
    try {
        const client = await prisma.e01_cliente.delete({
            where: { nro_cliente: Number(id) },
        })
        res.json(client)
    } catch (error) {
        res.status(HttpStatusCodes.BadRequest.code).json({
            error: `El cliente con ID ${id} no existe`,
        })
    }
})

app.get('/productos', async (req, res) => {
    const products = await prisma.e01_producto.findMany()
    res.json(products)
})

// Productos
app.get('/productos/:id', async (req, res) => {
    const { id } = req.params

    const product = await prisma.e01_producto.findUnique({
        where: { codigo_producto: Number(id) },
    })

    if (!product) {
        res.status(HttpStatusCodes.NotFound.code).json({
            error: `El producto con ID ${id} no existe`,
        })
        return
    }

    res.json(product)
})

app.post('/productos', async (req, res) => {
    const { marca, nombre, descripcion, precio, stock } = req.body
    try {
        const product = await prisma.e01_producto.create({
            data: {
                marca,
                nombre,
                descripcion,
                precio,
                stock,
            },
        })

        res.status(HttpStatusCodes.Created.code).json(product)
    } catch (error) {
        res.status(HttpStatusCodes.BadRequest.code).json({
            error: `Parece que hay algo mal con tu consulta`,
        })
    }
})

app.put('/productos/:id', async (req, res) => {
    const { id } = req.params
    const { marca, nombre, descripcion, precio, stock } = req.body
    try {
        const product = await prisma.e01_producto.update({
            where: { codigo_producto: Number(id) },
            data: {
                marca: marca,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                stock: stock,
            },
        })

        res.status(HttpStatusCodes.Created.code).json(product)
    } catch (error) {
        res.status(HttpStatusCodes.BadRequest.code).json({
            error: `Parece que hay algo mal con tu consulta`,
        })
    }
})

app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await prisma.e01_producto.delete({
            where: { codigo_producto: Number(id) },
        })
        res.json(product)
    } catch (error) {
        res.status(HttpStatusCodes.NotFound.code).json({
            error: `El producto con ID ${id} no existe`,
        })
    }
})

const server = app.listen(3000, () =>
    console.log(`Server ready at: http://localhost:3000`)
)
