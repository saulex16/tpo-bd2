-- QUERIES
-- 1. Obtener el teléfono y el número de cliente del cliente con nombre “Wanda” y apellido“Baker
SELECT nro_telefono, nro_cliente
FROM e01_telefono NATURAL JOIN e01_cliente
WHERE nombre = 'Wanda' AND apellido = 'Baker';

-- 2. Seleccionar todos los clientes que tengan registrada al menos una factura
SELECT *
FROM e01_cliente c
WHERE EXISTS (
		SELECT 1
		FROM e01_factura f
		WHERE c.nro_cliente = f.cliente
);

-- 3. Seleccionar todos los clientes que no tengan registrada una factura
SELECT *
FROM e01_cliente c
WHERE NOT EXISTS (
		SELECT 1
		FROM e01_factura f
		WHERE c.nro_cliente = f.cliente
);

-- 4. Seleccionar los productos que han sido facturados al menos 1 vez.
SELECT *
FROM e01_producto p
WHERE EXISTS (
		SELECT 1
		FROM e01_detalle_factura df
		WHERE p.codigo_producto = df.codigo_producto
);


-- 5. Seleccionar los datos de los clientes junto con sus teléfonos.
SELECT c.*, t.nro_telefono
FROM e01_cliente c NATURAL JOIN e01_telefono t;

-- 6. Devolver todos los clientes, con la cantidad de facturas que tienen registradas (admitir nulos en valores de Clientes).
SELECT c.nro_cliente, count(nro_factura) as "cantidad_facturas"
FROM e01_cliente c LEFT OUTER JOIN e01_factura f ON c.nro_cliente = f.nro_cliente
GROUP BY c.nro_cliente;

-- 7. Listar todas las Facturas que hayan sido compradas por el cliente de nombre "Pandora" y apellido "Tate".
SELECT f.nro_factura
FROM e01_factura f NATURAL JOIN e01_cliente c
WHERE nombre = 'Pandora' AND apellido = 'Tate';

-- 8. Listar todas las Facturas que contengan productos de la marca “In Faucibus Inc.”.
SELECT nro_factura
FROM e01_factura
WHERE nro_factura IN (
         SELECT nro_factura
         FROM e01_detalle_factura
         WHERE codigo_producto IN (
                     SELECT codigo_producto
                     FROM e01_producto
                     WHERE marca = 'In Faucibus Inc.'
         )
);

-- 9.  Mostrar cada teléfono junto con los datos del cliente.
SELECT t.*
FROM e01_cliente c RIGHT OUTER JOIN public.e01_telefono t on c.nro_cliente = t.nro_cliente;

-- 10.  Mostrar nombre y apellido de cada cliente junto con lo que gastó en total (con IVA incluido).
SELECT c.nombre, c.apellido, coalesce(sum(f.total_con_iva), 0) as "gasto_total"
FROM e01_cliente c NATURAL JOIN e01_factura f
GROUP BY c.nro_cliente;

-- VISTAS
-- 1. Se debe realizar una vista que devuelva las facturas ordenadas por fecha.
CREATE VIEW facturas_por_fecha
AS
SELECT *
FROM e01_facturas
ORDER BY fecha;

-- 2. Se necesita una vista que devuelva todos los productos que aún no han sido facturados.
CREATE VIEW productos_no_facturados
AS
SELECT p.*
FROM e01_productos p
WHERE NOT EXISTS (
			SELECT 1
			FROM e01_detalle_factura df
			WHERE df.codigo_producto = p.codigo_producto
);