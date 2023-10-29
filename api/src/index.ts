import express from 'express'
import { HttpStatusCodes } from './utils/http-status-codes'

const POSTGRESQL_PORT = 3000
const MONGODB_PORT = 3001

const { PrismaClient: PrismaClientMongo } = require('@prisma/mongodb/client');
const { PrismaClient: PrismaClientPostgres } = require('@prisma/postgresql/client');

const prismaMongo = new PrismaClientMongo();
const prismaPostgres = new PrismaClientPostgres();

const appPostgres = express()
const appMongo = express()

appPostgres.use(express.json())
appMongo.use(express.json())

// Clientes
appPostgres.get('/clientes', async (req, res) => {
    const clients = await prismaPostgres.e01_cliente.findMany()
    res.json(clients)
})

appPostgres.get('/clientes/:id', async (req, res) => {
    const { id } = req.params

    const client = await prismaPostgres.e01_cliente.findUnique({
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

appPostgres.post('/clientes', async (req, res) => {
    const { nombre, apellido, direccion, activo } = req.body
    try {
        const client = await prismaPostgres.e01_cliente.create({
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

appPostgres.put('/clientes/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, direccion, activo } = req.body
    try {
        const client = await prismaPostgres.e01_cliente.update({
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

appPostgres.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params
    try {
        const client = await prismaPostgres.e01_cliente.delete({
            where: { nro_cliente: Number(id) },
        })
        res.json(client)
    } catch (error) {
        res.status(HttpStatusCodes.BadRequest.code).json({
            error: `El cliente con ID ${id} no existe`,
        })
    }
})

appPostgres.get('/productos', async (req, res) => {
    const products = await prismaPostgres.e01_producto.findMany()
    res.json(products)
})

// Productos
appPostgres.get('/productos/:id', async (req, res) => {
    const { id } = req.params

    const product = await prismaPostgres.e01_producto.findUnique({
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

appPostgres.post('/productos', async (req, res) => {
    const { marca, nombre, descripcion, precio, stock } = req.body
    try {
        const product = await prismaPostgres.e01_producto.create({
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

appPostgres.put('/productos/:id', async (req, res) => {
    const { id } = req.params
    const { marca, nombre, descripcion, precio, stock } = req.body
    try {
        const product = await prismaPostgres.e01_producto.update({
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

appPostgres.delete('/productos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await prismaPostgres.e01_producto.delete({
            where: { codigo_producto: Number(id) },
        })
        res.json(product)
    } catch (error) {
        res.status(HttpStatusCodes.NotFound.code).json({
            error: `El producto con ID ${id} no existe`,
        })
    }
})

// MongoDB API configuration
appMongo.get('/clientes', async (req, res) => {
    const clients = await prismaMongo.clientes.findMany()
    res.json(clients)
})

appMongo.get('/clientes/:id', async (req, res) => {
    const { id } = req.params

    const client = await prismaMongo.clientes.findUnique({
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

appMongo.post('/clientes', async (req, res) => {
    const { nombre, apellido, direccion, activo } = req.body
    try {
        const client = await prismaMongo.clientes.create({
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

appMongo.put('/clientes/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, direccion, activo } = req.body
    try {
        const client = await prismaMongo.clientes.update({
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

appMongo.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params
    try {
        const client = await prismaMongo.clientes.delete({
            where: { nro_cliente: Number(id) },
        })
        res.json(client)
    } catch (error) {
        res.status(HttpStatusCodes.BadRequest.code).json({
            error: `El cliente con ID ${id} no existe`,
        })
    }
})

appMongo.get('/productos', async (req, res) => {
    const products = await prismaMongo.clientes.findMany()
    res.json(products)
})

// Productos
appMongo.get('/productos/:id', async (req, res) => {
    const { id } = req.params

    const product = await prismaMongo.productos.findUnique({
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

appMongo.post('/productos', async (req, res) => {
    const { marca, nombre, descripcion, precio, stock } = req.body
    try {
        const product = await prismaMongo.productos.create({
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

appMongo.put('/productos/:id', async (req, res) => {
    const { id } = req.params
    const { marca, nombre, descripcion, precio, stock } = req.body
    try {
        const product = await prismaMongo.productos.update({
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

appMongo.delete('/productos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await prismaMongo.e01_producto.delete({
            where: { codigo_producto: Number(id) },
        })
        res.json(product)
    } catch (error) {
        res.status(HttpStatusCodes.NotFound.code).json({
            error: `El producto con ID ${id} no existe`,
        })
    }
})


const server_psql = appPostgres.listen(POSTGRESQL_PORT, () =>
    console.log(`PostgreSQL server is running on http://localhost:${POSTGRESQL_PORT}`)
)

const server_mongo = appMongo.listen(MONGODB_PORT, () => {
    console.log(`MongoDB server is running on http://localhost:${MONGODB_PORT}`);
});
