-- DDL - Sistema Venta de Computadoras (Referencia Relacional)

CREATE DATABASE IF NOT EXISTS tienda_computadores_relacional;
USE tienda_computadores_relacional;

CREATE TABLE clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  telefono VARCHAR(20) NOT NULL
);

CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  marca VARCHAR(100) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  CONSTRAINT chk_productos_precio CHECK (precio >= 0)
);

CREATE TABLE ventas (
  id_venta INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_ventas_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
  CONSTRAINT chk_ventas_total CHECK (total >= 0)
);

CREATE TABLE detalle_venta (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  id_venta INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precioUnitario DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_detalle_venta FOREIGN KEY (id_venta) REFERENCES ventas(id_venta) ON DELETE CASCADE,
  CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
  CONSTRAINT chk_detalle_cantidad CHECK (cantidad >= 1),
  CONSTRAINT chk_detalle_precio CHECK (precioUnitario >= 0)
);
