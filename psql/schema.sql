--

-- TABLE: E01_CLIENTE

--



CREATE TABLE E01_CLIENTE(

    nro_cliente    INTEGER        NOT NULL,

    nombre         VARCHAR(45)    NOT NULL,

    apellido       VARCHAR(45)    NOT NULL,

    direccion      VARCHAR(45)    NOT NULL,

    activo         SMALLINT       NOT NULL,

    CONSTRAINT PK_E01_CLIENTE PRIMARY KEY (nro_cliente)

)
;


--

-- TABLE: E01_DETALLE_FACTURA

--

CREATE TABLE E01_DETALLE_FACTURA(

    nro_factura        INTEGER    NOT NULL,

    codigo_producto    INTEGER    NOT NULL,

    nro_item           INTEGER    NOT NULL,

    cantidad           FLOAT      NOT NULL,

    CONSTRAINT PK_E01_DETALLE_FACTURA PRIMARY KEY (nro_factura, codigo_producto)

)
;

--

-- TABLE: E01_FACTURA

--


CREATE TABLE E01_FACTURA(

    nro_factura      INTEGER    NOT NULL,

    fecha            DATE       NOT NULL,

    total_sin_iva    DOUBLE PRECISION    NOT NULL,

    iva              DOUBLE PRECISION    NOT NULL,

    total_con_iva    DOUBLE PRECISION,

    nro_cliente      INTEGER    NOT NULL,

    CONSTRAINT PK_E01_FACTURA PRIMARY KEY (nro_factura)

)
;

--

-- TABLE: E01_PRODUCTO

--



CREATE TABLE E01_PRODUCTO(

    codigo_producto    INTEGER        NOT NULL,

    marca              VARCHAR(45)    NOT NULL,

    nombre             VARCHAR(45)    NOT NULL,

    descripcion        VARCHAR(45)    NOT NULL,

    precio             FLOAT          NOT NULL,

    stock              INTEGER        NOT NULL,

    CONSTRAINT PK_E01_PRODUCTO PRIMARY KEY (codigo_producto)

)
;


--

-- TABLE: E01_TELEFONO

--


CREATE TABLE E01_TELEFONO(

    codigo_area     INTEGER    NOT NULL,

    nro_telefono    INTEGER    NOT NULL,

    tipo            CHAR(1)    NOT NULL,

    nro_cliente     INTEGER    NOT NULL,

    CONSTRAINT PK_E01_TELEFONO PRIMARY KEY (codigo_area, nro_telefono)

)
;


--

-- TABLE: E01_DETALLE_FACTURA

--

ALTER TABLE E01_DETALLE_FACTURA ADD CONSTRAINT FK_E01_DETALLE_FACTURA_PRODUCTO
    FOREIGN KEY (codigo_producto)

    REFERENCES E01_PRODUCTO(codigo_producto)

;


ALTER TABLE E01_DETALLE_FACTURA ADD CONSTRAINT FK_E01_DETALLE_FACTURA_FACTURA

    FOREIGN KEY (nro_factura)

    REFERENCES E01_FACTURA(nro_factura)

;


--

-- TABLE: E01_FACTURA

--

ALTER TABLE E01_FACTURA ADD CONSTRAINT FK_E01_FACTURA_CLIENTE

    FOREIGN KEY (nro_cliente)

    REFERENCES E01_CLIENTE(nro_cliente)

;



--

-- TABLE: E01_TELEFONO

--


ALTER TABLE E01_TELEFONO ADD CONSTRAINT FK_E01_TELEFONO_CLIENTE

    FOREIGN KEY (nro_cliente)

    REFERENCES E01_CLIENTE(nro_cliente)

;

CREATE SEQUENCE nro_cliente_seq AS integer START 101 OWNED BY e01_cliente.nro_cliente;
ALTER TABLE e01_cliente ALTER COLUMN nro_cliente SET DEFAULT nextval('nro_cliente_seq');

CREATE SEQUENCE codigo_producto_seq AS integer START 101 OWNED BY e01_producto.codigo_producto;
ALTER TABLE e01_producto ALTER COLUMN codigo_producto SET DEFAULT nextval('codigo_producto_seq');