#!/bin/sh

echo "Starting migration..."

# For postgres
echo "Generating postgres json files..."

while ! pg_isready -d postgresql://user:pass@psql:5432/db
do
    echo "$(date) - waiting for database to start"
    sleep 5
done

psql postgresql://user:pass@psql:5432/db -c "
    COPY (SELECT row_to_json(results)
        FROM (SELECT nro_cliente,
            nombre,
            apellido,
            direccion,
            activo,
            (SELECT(array_to_json(array_agg(telefono)))
                FROM (SELECT codigo_area, nro_telefono, tipo
                    FROM e01_telefono
            WHERE e01_telefono.nro_cliente = e01_cliente.nro_cliente) telefono) AS telefono
        FROM e01_cliente) results
    ) TO '/tmp/clientes.json' WITH (FORMAT text, HEADER FALSE);

    COPY (SELECT row_to_json(results)
        FROM (SELECT  
            nro_factura,
            fecha,
            total_sin_iva,
            iva,
            total_con_iva,
            nro_cliente,
            (SELECT(array_to_json(array_agg(detalle)))
                FROM (SELECT nro_item, cantidad, codigo_producto
                    FROM e01_detalle_factura
            WHERE e01_factura.nro_factura = e01_detalle_Factura.nro_factura) detalle) AS detalle_factura
        FROM e01_factura) results
    ) TO '/tmp/facturas.json' WITH (FORMAT text, HEADER FALSE);

    COPY (SELECT row_to_json(results)
        FROM (SELECT codigo_producto, marca, nombre, descripcion, precio, stock
        FROM e01_producto) results
    ) TO '/tmp/productos.json' WITH (FORMAT text, HEADER FALSE);

    COPY (SELECT row_to_json(results)
        FROM (SELECT 
            0 AS seq_id,
            (SELECT nro_cliente
                FROM e01_cliente
                ORDER BY nro_cliente DESC
                LIMIT 1) AS nro_cliente_seq,
            (SELECT nro_factura
                FROM e01_factura
                ORDER BY nro_factura DESC
                LIMIT 1) AS nro_factura_seq,
            (SELECT codigo_producto
                FROM e01_producto
                ORDER BY codigo_producto DESC
                LIMIT 1) AS codigo_producto_seq)
        results
    ) TO '/tmp/sequence.json' WITH (FORMAT text, HEADER FALSE);
"

cd /tmp/

echo "Importing into mongo..."
mongoimport -h mongo --db facturacion --collection clientes --file clientes.json --type=json
mongoimport -h mongo --db facturacion --collection productos --file productos.json --type=json
mongoimport -h mongo --db facturacion --collection facturas --file facturas.json --type=json
mongoimport -h mongo --db facturacion --collection sequence --file sequence.json --type=json

echo "Cleaning..."
rm -f clientes.json productos.json facturas.json sequence.json

echo "Done"