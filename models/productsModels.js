const connection = require('./connection');

const allProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [products] = await connection.execute(query);
  return products;
};

const productsById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [productsId] = await connection.execute(query, [id]);
  return productsId;
};

module.exports = {
  allProducts,
  productsById,
};
