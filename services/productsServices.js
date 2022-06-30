const productsModel = require('../models/productsModels');

const getAllProducts = async () => {
  const products = await productsModel.allProducts();
  const productsOrderd = products.sort((a, b) => a.id - b.id);
  return productsOrderd;
};

const getProductsById = async (id) => {
  const productId = await productsModel.productsById(id);
  return productId;
};

const createProduct = async ({ name }) => {
  const { id } = await productsModel.createProduct({ name });
  return {
    id,
    name,
  };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};