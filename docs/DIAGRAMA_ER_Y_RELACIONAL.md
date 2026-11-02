# Diseño de la Base de Datos

## Entidades
- **clientes** (1:N con ventas)
- **productos** (N:M con ventas a través de items)
- **ventas** (cabecera de factura)
- **venta_detalle / items** (embebido en `ventas` en este diseño NoSQL con Mongoose)

## Modelo Conceptual (ER)
Relaciones:
- Un **Cliente** puede tener **muchas Ventas**.
- Una **Venta** pertenece a **un solo Cliente**.
- Una **Venta** puede contener **varios Productos** (mediante `items[]`).
- Se guarda **precioUnitario** al momento de la venta (histórico de precio).

## Modelo Relacional (Referencia)
**clientes**(id_cliente PK, nombre, direccion, telefono)  
**productos**(id_producto PK, nombre, precio, marca, categoria)  
**ventas**(id_venta PK, id_cliente FK -> clientes(id_cliente), fecha, total)  
**detalle_venta**(id_detalle PK, id_venta FK -> ventas(id_venta), id_producto FK -> productos(id_producto), cantidad, precioUnitario)

> En la implementación con **MongoDB/Mongoose** se opta por **documento embebido** (`items[]`) en la colección `ventas`, manteniendo la referencia a `Cliente` y a `Producto` con `ObjectId + ref`.
