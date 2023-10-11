-- 1
SELECT nro_telefono, nro_cliente
FROM e01_telefono NATURAL JOIN e01_cliente
WHERE nombre = 'Wanda' AND apellido = 'Baker';

-- 2
SELECT *
FROM e01_cliente c
WHERE EXISTS (
		SELECT 1
		FROM e01_factura f
		WHERE c.nro_cliente = f.cliente
);

-- 3
SELECT *
FROM e01_cliente c
WHERE NOT EXISTS (
		SELECT 1
		FROM e01_factura f
		WHERE c.nro_cliente = f.cliente
);

-- 4
SELECT *
FROM e01_producto p
WHERE EXISTS (
		SELECT 1
		FROM e01_detalle_factura df
		WHERE p.codigo_producto = df.codigo_producto
);


-- 5
SELECT c.*, t.nro_telefono
FROM e01_cliente c NATURAL JOIN e01_telefono t;

-- 6
SELECT c.*, count(*)
FROM e01_cliente c NATURAL JOIN e01_factura f
GROUP BY c.*;

-- 7
SELECT f.*
FROM e01_factura f NATURAL JOIN e01_cliente c
WHERE nombre = 'Pandora' AND apellido = 'Tate';

-- 8
SELECT *
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

-- 9
SELECT t.nro_telefono, c.*
FROM e01_cliente c NATURAL JOIN e01_telefono t;

-- 10
SELECT c.*, coalesce(sum(f.total_con_iva), 0)
FROM e01_cliente c NATURAL JOIN e01_factura f
GROUP BY c.*;

------ VIEWS
-- 1
CREATE VIEW facturas_por_fecha
AS
SELECT *
FROM e01_facturas
ORDER BY fecha;

-- 2
CREATE VIEW productos_no_facturados
AS
SELECT p.*
FROM e01_productos p
WHERE NOT EXISTS (
			SELECT 1
			FROM e01_detalle_factura df
			WHERE df.codigo_producto = p.codigo_producto
);