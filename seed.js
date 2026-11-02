const { connectDatabase, disconnectDatabase } = require('./config/database');
const logger = require('./utils/logger');
const Cliente = require('./models/Cliente');
const Producto = require('./models/Producto');
const Venta = require('./models/Venta');

const CLIENTES = [
  {
    nombre: 'Juan Pérez',
    direccion: 'Av. Central 123',
    telefono: '77712345',
  },
  {
    nombre: 'María López',
    direccion: 'Calle Secundaria 456',
    telefono: '77767890',
  },
];

const PRODUCTOS = [
  {
    nombre: 'Laptop HP 15"',
    precio: 8500,
    marca: 'HP',
    categoria: 'Laptops',
  },
  {
    nombre: 'Mouse Logitech M185',
    precio: 250,
    marca: 'Logitech',
    categoria: 'Periféricos',
  },
  {
    nombre: 'Teclado Mecánico Redragon',
    precio: 650,
    marca: 'Redragon',
    categoria: 'Periféricos',
  },
  {
    nombre: 'Monitor LG 24"',
    precio: 3200,
    marca: 'LG',
    categoria: 'Monitores',
  },
];

const clearCollections = () =>
  Promise.all([
    Cliente.deleteMany({}),
    Producto.deleteMany({}),
    Venta.deleteMany({}),
  ]);

const buildSaleItems = (laptop, mouse) => [
  {
    producto: laptop._id,
    cantidad: 1,
    precioUnitario: laptop.precio,
  },
  {
    producto: mouse._id,
    cantidad: 2,
    precioUnitario: mouse.precio,
  },
];

const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.precioUnitario * item.cantidad, 0);

const runSeed = async () => {
  await connectDatabase();
  await clearCollections();

  const clientes = await Cliente.insertMany(CLIENTES);
  const productos = await Producto.insertMany(PRODUCTOS);

  const [cliente] = clientes;
  const [laptop, mouse] = productos;
  const items = buildSaleItems(laptop, mouse);
  const total = calculateTotal(items);

  const venta = await Venta.create({ cliente: cliente._id, items, total });

  logger.info(
    `Seed completado: ${clientes.length} clientes, ${productos.length} productos y 1 venta (${venta._id})`,
  );
};

const seed = async () => {
  try {
    await runSeed();
  } catch (error) {
    logger.error(`Error en seed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
};

seed();
