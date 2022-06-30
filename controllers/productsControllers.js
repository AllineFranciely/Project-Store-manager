const productsService = require('../services/productsServices');

const getProducts = async (_req, res) => {
  const itens = await productsService.getAllProducts();

  if (itens.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(itens);
};

const getProductsId = async (req, res) => {
  const { id } = req.params;
  const itens = await productsService.getProductsById(id);

  if (itens.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(itens[0]);
};

const createProduct = async (req, res, _next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const newProduct = await productsService.createProduct({ name });
  
  return res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { code, message } = await productsService.updateProduct({ id, name });
  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json({ id, name });
};

module.exports = {
  getProducts,
  getProductsId,
  createProduct,
  updateProduct,
};