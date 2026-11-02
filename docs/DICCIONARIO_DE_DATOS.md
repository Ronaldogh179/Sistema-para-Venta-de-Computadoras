# Diccionario de Datos

## Colección: clientes

| Campo | Tipo | Requerido | Validaciones |
|---|---|---|---|
| _id | ObjectId | Sí | Generado por MongoDB |
| nombre | String | Sí | Máximo 100 caracteres, sin espacios sobrantes |
| direccion | String | Sí | Máximo 200 caracteres, sin espacios sobrantes |
| telefono | String | Sí | Entre 7 y 20 caracteres numéricos, `+`, `-` o espacios |

## Colección: productos

| Campo | Tipo | Requerido | Validaciones |
|---|---|---|---|
| _id | ObjectId | Sí | Generado por MongoDB |
| nombre | String | Sí | Máximo 150 caracteres, sin espacios sobrantes |
| precio | Number | Sí | Mayor o igual a 0 |
| marca | String | Sí | Máximo 100 caracteres, sin espacios sobrantes |
| categoria | String | Sí | Máximo 100 caracteres, sin espacios sobrantes |

## Colección: ventas

| Campo | Tipo | Requerido | Validaciones |
|---|---|---|---|
| _id | ObjectId | Sí | Generado por MongoDB |
| cliente | ObjectId (ref: Cliente) | Sí | Debe existir y ser un identificador válido |
| items | Array | Sí | Debe contener al menos un elemento |
| items[].producto | ObjectId (ref: Producto) | Sí | Debe existir y ser un identificador válido |
| items[].cantidad | Number | Sí | Entero mayor o igual a 1 |
| items[].precioUnitario | Number | Sí | Mayor o igual a 0; se toma del producto al registrar la venta |
| fecha | Date | Sí | Valor por defecto: fecha y hora actual |
| total | Number | Sí | Mayor o igual a 0; calculado a partir de los items |
