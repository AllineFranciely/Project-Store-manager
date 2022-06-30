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

const updateProduct = async ({ id, name }) => {
  if (!name) {
    return { code: 400, message: '"name" is required' };
  }
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }

  const productFounded = await productsModel.productsById(id);
  if (productFounded.length === 0) {
    return { code: 404, message: 'Product not found' };
  }
  await productsModel.updateProduct({ id, name });
  return { code: 200, id, name };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
};