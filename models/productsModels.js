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

const createProduct = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const [result] = await connection.execute(query, [name]);

  return {
    id: result.insertId,
  };
};

module.exports = {
  allProducts,
  productsById,
  createProduct,
};
