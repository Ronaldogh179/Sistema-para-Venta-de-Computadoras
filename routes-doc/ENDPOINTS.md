# Endpoints de la API

Base URL: `http://localhost:4000`

## Clientes

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/clientes` | Crear cliente |
| GET | `/api/clientes` | Obtener todos los clientes |
| GET | `/api/clientes/:id` | Obtener cliente por ID |
| PUT | `/api/clientes/:id` | Actualizar cliente completo |
| PATCH | `/api/clientes/:id` | Actualizar cliente parcialmente |
| DELETE | `/api/clientes/:id` | Eliminar cliente |
| GET | `/api/clientes/:id/ventas` | Obtener las ventas de un cliente |

## Productos

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/productos` | Crear producto |
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener producto por ID |
| PUT | `/api/productos/:id` | Actualizar producto completo |
| PATCH | `/api/productos/:id` | Actualizar producto parcialmente |
| DELETE | `/api/productos/:id` | Eliminar producto |

## Ventas

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/ventas` | Crear una venta y calcular el total |
| GET | `/api/ventas` | Obtener todas las ventas ordenadas por fecha descendente |
| GET | `/api/ventas/:id` | Obtener una venta por ID |

## Estado del servicio

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Información general de la API |
| GET | `/health` | Verificación del estado del servicio |

## Cuerpo de una venta

```json
{
  "cliente": "64f1c2a9e4b0a1b2c3d4e5f6",
  "items": [
    {
      "producto": "64f1c2a9e4b0a1b2c3d4e5f7",
      "cantidad": 2
    }
  ]
}
```

El servidor obtiene el precio unitario desde la colección de productos, calcula el total y almacena el detalle de la venta.

## Formato de errores

Las respuestas de error mantienen una estructura uniforme:

```json
{
  "mensaje": "Descripción del error"
}
```

Códigos HTTP utilizados:

| Código | Significado |
|---|---|
| 200 | Operación exitosa |
| 201 | Recurso creado |
| 400 | Datos o identificador no válidos |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |
