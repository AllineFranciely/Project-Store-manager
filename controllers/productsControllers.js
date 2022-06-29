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

module.exports = {
  getProducts,
  getProductsId,
};