# Tienda de Computadores API

API REST para gestionar clientes, productos y facturación de una tienda de computadores. Desarrollada con Node.js, Express, Mongoose y MongoDB.

## Tecnologías

Node.js · Express · Mongoose · MongoDB · Helmet · CORS · Morgan · dotenv

## Requisitos

- Node.js 18 o superior
- MongoDB 6 o superior

## Instalación

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

La API queda disponible en `http://localhost:4000`.

En Windows PowerShell, usa `Copy-Item .env.example .env` en lugar de `cp`.

## Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `4000` |
| `MONGO_URI` | Conexión a MongoDB | `mongodb://127.0.0.1:27017/tienda_computadores` |
| `CORS_ORIGIN` | Origen permitido para CORS | `*` |

## Scripts

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor |
| `npm run dev` | Inicia con recarga automática |
| `npm run seed` | Carga los datos de prueba |

## Estructura

```text
tienda-computadores/
├── index.js
├── src/
│   ├── app.js
│   ├── seed.js
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── docs/
│   ├── database/
│   ├── DICCIONARIO_DE_DATOS.md
│   ├── DIAGRAMA_ER_Y_RELACIONAL.md
│   └── ENDPOINTS.md
├── .env.example
├── package.json
└── sonar-project.properties
```

## Endpoints

| Recurso | Rutas |
|---|---|
| Clientes | `/api/clientes` y `/api/clientes/:id` |
| Ventas por cliente | `/api/clientes/:id/ventas` |
| Productos | `/api/productos` y `/api/productos/:id` |
| Ventas | `/api/ventas` y `/api/ventas/:id` |
| Resumen de ventas | `/api/ventas/resumen-por-cliente` |
| Estado | `/` y `/health` |

El detalle de métodos y cuerpos de petición está en [`docs/ENDPOINTS.md`](docs/ENDPOINTS.md).

## Calidad y SonarQube

El proyecto aplica separación por capas, validaciones, manejo centralizado de errores y constantes. La configuración para el análisis está en `sonar-project.properties`.

```bash
sonar-scanner
```

## Documentación

- [Endpoints](docs/ENDPOINTS.md)
- [Diccionario de datos](docs/DICCIONARIO_DE_DATOS.md)
- [Diagrama entidad-relación](docs/DIAGRAMA_ER_Y_RELACIONAL.md)
- [Scripts SQL](docs/database/)

## Licencia

ISC
