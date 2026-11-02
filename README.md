# Tienda de Computadores API

API REST para la administración de clientes, productos y el proceso de facturación de una tienda de computadores. Construida con Node.js, Express, Mongoose y MongoDB, con una arquitectura por capas y validaciones de entrada.

## Descripción

El sistema permite registrar clientes y productos, generar ventas calculando automáticamente subtotales y totales, y consultar el historial de ventas por cliente. El precio de cada producto se conserva al momento de la venta para mantener el histórico de facturación.

La aplicación está preparada para análisis estático con SonarQube mediante el archivo `sonar-project.properties`.

## Características

- Operaciones CRUD completas para clientes y productos.
- Registro de ventas con cálculo automático del total.
- Validación de datos a nivel de esquema y de controlador.
- Manejo centralizado de errores y respuestas HTTP consistentes.
- Arquitectura por capas: rutas, controladores, modelos y utilidades.
- Prevención de asignación masiva mediante listas de campos permitidos.
- Configuración mediante variables de entorno.
- Seguridad básica con Helmet y CORS.
- Script de datos de prueba (`seed`).
- Cierre ordenado del servidor y de la conexión a MongoDB.

## Tecnologías

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express | Framework HTTP |
| Mongoose | Modelado de datos para MongoDB |
| MongoDB | Base de datos NoSQL |
| Helmet | Cabeceras de seguridad HTTP |
| CORS | Control de acceso entre orígenes |
| Morgan | Registro de peticiones HTTP |
| dotenv | Gestión de variables de entorno |
| Nodemon | Recarga automática en desarrollo |

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- MongoDB 6 o superior en ejecución

## Instalación

1. Clonar el repositorio e ingresar al directorio del proyecto.

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo de configuración a partir de la plantilla:

   ```bash
   cp .env.example .env
   ```

   En Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Ajustar `MONGO_URI` en el archivo `.env` según la instancia de MongoDB disponible.

5. Cargar los datos de prueba (opcional):

   ```bash
   npm run seed
   ```

6. Iniciar el servidor:

   ```bash
   npm run dev
   ```

   Para ejecución en producción:

   ```bash
   npm start
   ```

La API estará disponible en `http://localhost:4000`.

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `NODE_ENV` | Entorno de ejecución (`development`, `production`, `test`) | `development` |
| `PORT` | Puerto del servidor HTTP | `4000` |
| `MONGO_URI` | Cadena de conexión a MongoDB | `mongodb://127.0.0.1:27017/tienda_computadores` |
| `CORS_ORIGIN` | Origen permitido para peticiones CORS | `*` |

El archivo `.env` está excluido del control de versiones. Solo se distribuye `.env.example` como plantilla.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor en modo producción |
| `npm run dev` | Inicia el servidor con recarga automática |
| `npm run seed` | Limpia y carga los datos de prueba |

## Estructura del proyecto

```text
tienda-computadores/
├── app.js
├── index.js
├── seed.js
├── config/
│   ├── database.js
│   └── env.js
├── constants/
│   ├── httpStatus.js
│   └── messages.js
├── controllers/
│   ├── clienteController.js
│   ├── crudControllerFactory.js
│   ├── productoController.js
│   └── ventaController.js
├── middleware/
│   ├── asyncHandler.js
│   ├── errorHandler.js
│   └── notFound.js
├── models/
│   ├── Cliente.js
│   ├── Producto.js
│   └── Venta.js
├── routes/
│   ├── clienteRoutes.js
│   ├── productoRoutes.js
│   └── ventaRoutes.js
├── utils/
│   ├── AppError.js
│   ├── logger.js
│   └── validators.js
├── docs/
├── database/sql/
├── routes-doc/
├── .env.example
├── sonar-project.properties
└── package.json
```

## Arquitectura

La aplicación sigue una separación de responsabilidades por capas:

- **Routes**: define los endpoints y delega la lógica a los controladores.
- **Controllers**: valida la entrada, aplica reglas de negocio y construye la respuesta.
- **Models**: define esquemas, tipos y validaciones de Mongoose.
- **Middleware**: centraliza el manejo de errores, rutas no encontradas y errores asíncronos.
- **Config y utils**: agrupan configuración, constantes, validadores y utilidades reutilizables.

## Endpoints

### Clientes

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/clientes` | Crear cliente |
| GET | `/api/clientes` | Listar clientes |
| GET | `/api/clientes/:id` | Obtener cliente por ID |
| PUT | `/api/clientes/:id` | Reemplazar cliente |
| PATCH | `/api/clientes/:id` | Actualizar cliente parcialmente |
| DELETE | `/api/clientes/:id` | Eliminar cliente |
| GET | `/api/clientes/:id/ventas` | Listar ventas de un cliente |

### Productos

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/productos` | Crear producto |
| GET | `/api/productos` | Listar productos |
| GET | `/api/productos/:id` | Obtener producto por ID |
| PUT | `/api/productos/:id` | Reemplazar producto |
| PATCH | `/api/productos/:id` | Actualizar producto parcialmente |
| DELETE | `/api/productos/:id` | Eliminar producto |

### Ventas

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/ventas` | Registrar una venta y calcular el total |
| GET | `/api/ventas` | Listar ventas ordenadas por fecha |
| GET | `/api/ventas/:id` | Obtener venta por ID |

### Estado del servicio

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Información general de la API |
| GET | `/health` | Verificación del estado del servicio |

La documentación detallada de los endpoints está disponible en [`routes-doc/ENDPOINTS.md`](routes-doc/ENDPOINTS.md).

## Ejemplos de uso

Crear un cliente:

```bash
curl -X POST http://localhost:4000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","direccion":"Av. Central 123","telefono":"77712345"}'
```

Crear un producto:

```bash
curl -X POST http://localhost:4000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Laptop HP 15","precio":8500,"marca":"HP","categoria":"Laptops"}'
```

Registrar una venta:

```bash
curl -X POST http://localhost:4000/api/ventas \
  -H "Content-Type: application/json" \
  -d '{"cliente":"<ID_CLIENTE>","items":[{"producto":"<ID_PRODUCTO>","cantidad":1}]}'
```

## Modelo de datos

- `clientes`: nombre, dirección y teléfono.
- `productos`: nombre, precio, marca y categoría.
- `ventas`: cliente, items, fecha y total. Cada item almacena producto, cantidad y precio unitario.

El diccionario de datos y el diseño relacional de referencia están disponibles en [`docs/`](docs/).

## Calidad de código y SonarQube

El proyecto incorpora las siguientes prácticas:

- Separación de responsabilidades y reutilización de lógica CRUD.
- Constantes para estados HTTP y mensajes, evitando literales duplicados.
- Validación de identificadores, campos obligatorios y cantidades.
- Manejo centralizado de errores sin exponer detalles internos en producción.
- Protección contra asignación masiva de campos.
- Configuración externa y ausencia de credenciales en el código.
- Cierre ordenado de conexiones y procesos.

Para ejecutar el análisis:

1. Verificar que SonarQube esté disponible y contar con un token de análisis.
2. Revisar y ajustar `sonar.projectKey`, `sonar.host.url` y `sonar.token` según la instancia.
3. Ejecutar el escáner desde la raíz del proyecto:

   ```bash
   sonar-scanner
   ```

   También puede utilizarse la imagen oficial de Docker:

   ```bash
   docker run --rm \
     -e SONAR_HOST_URL="http://localhost:9000" \
     -e SONAR_TOKEN="<TOKEN>" \
     -v "%cd%:/usr/src" \
     sonarsource/sonar-scanner-cli
   ```

Las exclusiones de análisis (dependencias, documentación y archivos SQL) están definidas en `sonar-project.properties`.

## Documentación adicional

- [Endpoints de la API](routes-doc/ENDPOINTS.md)
- [Diccionario de datos](docs/DICCIONARIO_DE_DATOS.md)
- [Diagrama entidad-relación y modelo relacional](docs/DIAGRAMA_ER_Y_RELACIONAL.md)
- [Scripts SQL de referencia](database/sql/)

## Licencia

Este proyecto se distribuye bajo la licencia ISC.
