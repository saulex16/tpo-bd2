# Base de Datos II - TPO

APIs realizadas con [Express.js](https://expressjs.com/es/) y [Prisma](https://www.prisma.io/) para la modificación de clientes y productos del esquema de Facturación. Las mismas mantienen sus propias bases de datos ([PostgreSQL](https://www.postgresql.org/) y [MongoDB](https://www.mongodb.com/es), respectivamente) Además, se encuentran las consultas SQL y NoSQL pedidas.

## Integrantes

- Saul Castañeda n°62493
- Juan Burda n°62094
- Elian Paredes n°62504
- Nicolás Margenat n°62028

## Estructura del proyecto

- Dentro de `api/` se encuentra la implementación de ambas APIs.
- `psql/`:  
    - `init.sql` se encarga de crear los esquemas y poblarlos
    - `queries.sql` contiene las queries pedidas

## Instalación
1. Ejecutar [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Ejecutar desde la carpeta raíz el siguiente comando:

    ```bash
    docker-compose up
    ```  
3. ¡Listo! Ahora en `localhost:3000` estará corriendo la API con PostgreSQL, mientras que en `localhost:4000` estará la que utiliza MongoDB.

**Nota**: En caso de querer borrar el contenedor ejecutar `docker-compose down --volumes` desde la carpeta raíz del proyecto.

## API Endpoints

Se puede acceder a las APIs del servidor mediante los siguientes endpoints en común:

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
