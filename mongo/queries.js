// QUERIES
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

// 6. Devolver todos los clientes, con la cantidad de facturas que tienen registradas (admitir nulos en valores de Clientes).
db.clientes.aggregate(
  {
    $lookup: {
      from: "facturas",
      localField: "nro_cliente",
      foreignField: "nro_cliente",
      as: "facturas",
    },
  },
  {
    $project: {
      _id: 0,
      nro_cliente: 1,
      cantidad_facturas: { $size: "$facturas" },
    },
  }
);

// 7. Listar todas las Facturas que hayan sido compradas por el cliente de nombre "Pandora" y apellido "Tate".
db.facturas.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "nro_cliente",
      foreignField: "nro_cliente",
      as: "cliente",
    },
  },
  {
    $match: {
      "cliente.nombre": "Pandora",
      "cliente.apellido": "Tate",
    },
  },
  {
    $project: {
      _id: 0,
      nro_factura: 1,
    },
  },
]);

// 8. Listar todas las Facturas que contengan productos de la marca “In Faucibus Inc.”.
db.facturas.aggregate([
  {
    $lookup: {
      from: "productos",
      localField: "detalle_factura.codigo_producto",
      foreignField: "codigo_producto",
      as: "productos",
    },
  },
  {
    $match: {
      "productos.marca": "In Faucibus Inc.",
    },
  },
  {
    $project: {
      _id: 0,
      nro_factura: 1,
    },
  },
]);

// 9.  Mostrar cada teléfono junto con los datos del cliente.
db.clientes.aggregate([
  {
    $match: {
      telefono: { $ne: null },
    },
  },
  {
    $unwind: "$telefono",
  },
  {
    $project: {
      _id: 0,
      nro_cliente: 1,
      nro_telefono: "$telefono.nro_telefono",
      codigo_area: "$telefono.codigo_area",
      tipo: "$telefono.tipo",
    },
  },
]);

// 10.  Mostrar nombre y apellido de cada cliente junto con lo que gastó en total (con IVA incluido).
db.facturas.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "nro_cliente",
      foreignField: "nro_cliente",
      as: "cliente",
    },
  },
  {
    $unwind: "$cliente",
  },
  {
    $group: {
      _id: {
        nro_cliente: "$cliente.nro_cliente",
        nombre: "$cliente.nombre",
        apellido: "$cliente.apellido",
      },
      gasto_total: { $sum: "$total_con_iva" },
    },
  },
  {
    $project: {
      _id: 0,
      nombre: "$_id.nombre",
      apellido: "$_id.apellido",
      gasto_total: 1,
    },
  },
]);

// VISTAS
// 1. Se debe realizar una vista que devuelva las facturas ordenadas por fecha.
db.createView("facturas_ordenadas_por_fecha", "e01_factura", [
  {
    $sort: { fecha: 1 },
  },
]);

// 2. Se necesita una vista que devuelva todos los productos que aún no han sido facturados.
db.createView("productos_no_facturados", "e01_productos", [
  {
    $lookup: {
      from: "facturas",
      localField: "_id",
      foreignField: "codigo_producto",
      as: "facturas",
    },
  },
  {
    $match: {
      facturas: { $size: 0 },
    },
  },
  {
    $project: {
      facturas: 0,
    },
  },
]);
