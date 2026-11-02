-- DML - Datos de prueba

USE tienda_computadores_relacional;

INSERT INTO clientes (nombre, direccion, telefono) VALUES
('Juan Pérez', 'Av. Central 123', '77712345'),
('María López', 'Calle Secundaria 456', '77767890');

INSERT INTO productos (nombre, precio, marca, categoria) VALUES
('Laptop HP 15"', 8500.00, 'HP', 'Laptops'),
('Mouse Logitech M185', 250.00, 'Logitech', 'Periféricos'),
('Teclado Mecánico Redragon', 650.00, 'Redragon', 'Periféricos'),
('Monitor LG 24"', 3200.00, 'LG', 'Monitores');

-- Venta de prueba para Juan Pérez (id_cliente = 1)
INSERT INTO ventas (id_cliente, fecha, total) VALUES (1, NOW(), 9000.00);
INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precioUnitario) VALUES
(1, 1, 1, 8500.00),
(1, 2, 2, 250.00);
