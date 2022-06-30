const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModels');
const productsService = require('../../../services/productsServices');
const productsMocks = require('../mocks/productsMocks');

describe('Testa a rota "/products"', () => {
  describe('Testa a função getAllProducts', () => {
    before(() => {
      sinon.stub(productsModel, 'allProducts').resolves(productsMocks);
    });
    after(() => {
      sinon.restore();
    });

    it('retorna um array', async () => {
      const response = await productsService.getAllProducts();
      expect(response).to.be.a('array');
    });

    it('retorna um objeto de produtos', async () => {
      const response = await productsService.getAllProducts();
      expect(response).to.be.equal(productsMocks);
    });
  });
});

describe('Testa a rota "/products/id"', () => {
  before(() => {
    sinon.stub(productsModel, 'productsById').resolves([productsMocks[0]]);
  });
  after(() => {
    sinon.restore();
  });
  it('retorna um array', async () => {
    const response = await productsService.getProductsById(1);
    expect(response).to.be.a('array');
  });
  it('o objeto não está vazio', async () => {
    const response = await productsService.getProductsById(1);
    expect(response).to.be.not.empty;
  });
  it('retorna o objeto correto', async () => {
    const [response] = await productsService.getProductsById(1);
    expect(response).to.be.equal(productsMocks[0]);
  });
});

describe('Testa a função de createProduct', () => {
  describe('Se o nome é válido', () => {
    before(() => {
      sinon.stub(productsModel, 'createProduct').resolves({ id: 4 });
    });
    after(() => {
      sinon.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.createProduct({ name: 'Luva do Thanos' });
      expect(response).to.be.a('object');
    });
  });
});
