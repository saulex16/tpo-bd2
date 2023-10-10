# Base de Datos II - TPO

API realizada con [Express.js](https://expressjs.com/es/) y [Prisma](https://www.prisma.io/) para la modificación de clientes y productos del esquema de Facturación. Además, se encuentran las consultas SQL pedidas.

## Integrantes

- Saul Castañeda n°62493
- Juan Burda n°62094
- Elian Paredes n°62504
- Nicolás Margenat n°62028

## Contenidos

- Dentro de `api/` se encuentra la implementación de la API.
- Dentro de `db-queries/` se encuentran las consultas SQL y las vistas pedidas.
- Dentro de `resources/` se encuentra el esquema SQL de Facturación, junto a un script para poblar las tablas de la misma.

## Instalación

1. Para correr este proyecto, se necesita la herramienta [npm](https://www.npmjs.com/) para instalar dependencias:

    ```bash
    sudo apt install npm
    ```

2. Configurar y ejecutar una base de datos que contenga el esquema dado por `schema.sql` en `resources/`.

3. Clonar el repositorio:

    ```bash
    git clone git@github.com:saulex16/tpo-bd2.git
    ```

4. En `api/` crear un archivo `.env` que contenga la url de la base de datos que se usará para ejecutar la API:

    ```
    # PostgreSQL database url
    POSTGRESQL_URL=postgresql://{user}:{pass}@{host}:{port}/{database}

    # MongoDB database url
    MONGODB_URL=
    ```

5. En `api/` ejecutar:

    ```bash
    npm install
    ```

## Ejecución

Para correr el servidor, en `api/` ejecutar:

```bash
npm run dev
```

El servidor está ahora corriendo en `http://localhost:3000`

## Uso de la API

Se puede acceder a la API del servidor mediante los siguientes endpoints:

### `GET`

- `/clientes`: Buscar todos los clientes
- `/clientes/:id`: Buscar un solo cliente por su `id`
- `/productos`: Buscar todos los productos
- `/productos/:id`: Busca un solo producto por su `id`

### `POST`

- `/clientes`: Crear un nuevo cliente
  - Body:
    - `nombre: String` (requerido): El nombre del cliente
    - `apellido: String` (requerido): El apellido del cliente
    - `direccion: String` (requerido): La dirección del cliente
    - `activo: Integer` (requerido): El activo del cliente
- `/productos`: Crear un nuevo producto
  - Body:
    - `marca: String` (requerido): Marca del producto
    - `nombre: String` (requerido): Nombre del producto
    - `descripcion: String` (requerido): Descripción del producto
    - `precio: Float` (requerido): Precio del producto
    - `stock: Integer` (requerido): Stock disponible del producto

### `PUT`

- `/clientes/:id`: Modifica un cliente existente por su `id`
  - Body:
    - `nombre: String` (opcional): El nombre del cliente
    - `apellido: String` (opcional): El apellido del cliente
    - `direccion: String` (opcional): La dirección del cliente
    - `activo: Integer` (opcional): El activo del cliente
- `/productos/:id`: Modifica un producto existente por su `id`
  - Body:
    - `marca: String` (opcional): Marca del producto
    - `nombre: String` (opcional): Nombre del producto
    - `descripcion: String` (opcional): Descripción del producto
    - `precio: Float` (opcional): Precio del producto
    - `stock: Integer` (opcional): Stock disponible del producto

### `DELETE`

- `/clientes/:id`: Borra un cliente existente por su `id`
- `/productos/:id`: Borra un producto existente por su `id`
