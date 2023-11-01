// 1. Obtener el teléfono y el número de cliente del cliente con nombre “Wanda” y apellido“Baker
db.clientes.aggregate([
    {
        $match: {
            $and: [{ nombre: "Wanda" }, { apellido: "Baker" }],
        },
    },
    {
        $unwind: "$telefono",
    },
    {
        $project: {
            _id: 0,
            nro_cliente: "$_id",
            nro_telefono: { $toInt: "$telefono.nro_telefono" },
        },
    },
]);

// 2. Seleccionar todos los clientes que tengan registrada al menos una factura
db.facturas.aggregate([
    {
        $lookup: {
            from: "clientes",
            localField: "nro_cliente",
            foreignField: "_id",
            as: "clientes",
        },
    },
    {
        $unwind: "$clientes",
    },
    {
        $group: {
            _id: "$nro_cliente",
            nombre: { $first: "$clientes.nombre" },
            apellido: { $first: "$clientes.apellido" },
            direccion: { $first: "$clientes.direccion" },
            activo: { $first: "$clientes.activo" },
        },
    },
    {
        $project: {
            _id: 0,
            nro_cliente: "$_id",
            nombre: 1,
            apellido: 1,
            direccion: 1,
            activo: 1,
        },
    },
]);

// 3. Seleccionar todos los clientes que no tengan registrada una factura
db.clientes.aggregate([
    {
        $lookup: {
            from: "facturas",
            localField: "_id",
            foreignField: "nro_cliente",
            as: "facturas",
        },
    },
    {
        $unwind: { path: "$facturas", preserveNullAndEmptyArrays: true },
    },
    {
        $match: {
            $or: [
                { facturas: { $eq: [] } },
                { facturas: { $exists: false } },
                { facturas: { $eq: null } },
            ],
        },
    },
    {
        $project: {
            _id: 0,
            nro_cliente: "$_id",
            nombre: 1,
            apellido: 1,
            direccion: 1,
            activo: 1,
        },
    },
]);

// 4. Seleccionar los productos que han sido facturados al menos 1 vez.
db.facturas.aggregate([
    {
        $unwind: "$detalle_factura",
    },
    {
        $project: {
            _id: 0,
            codigo_producto: { $toInt: "$detalle_factura.codigo_producto" },
        },
    },
    {
        $group: {
            _id: "$codigo_producto",
        },
    },
    {
        $lookup: {
            from: "productos",
            localField: "_id",
            foreignField: "_id",
            as: "productos_facturados",
        },
    },
    {
        $unwind: "$productos_facturados",
    },
    {
        $project: {
            _id: 0,
            codigo_producto: "$_id",
            marca: "$productos_facturados.marca",
            nombre: "$productos_facturados.nombre",
            descripcion: "$productos_facturados.descripcion",
            precio: "$productos_facturados.precio",
            stock: "$productos_facturados.stock",
        },
    },
]);

// 5. Seleccionar los datos de los clientes junto con sus teléfonos.
db.clientes.aggregate([
    {
        $match: { telefono: { $ne: null } },
    },
    {
        $unwind: "$telefono",
    },
    {
        $project: {
            _id: 0,
            nro_cliente: "$_id",
            nombre: 1,
            apellido: 1,
            direccion: 1,
            activo: 1,
            nro_telefono: { $toInt: "$telefono.nro_telefono" },
        },
    },
    { $sort: { nro_cliente: 1 } },
]);
