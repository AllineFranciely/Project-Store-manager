const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');
const productsMocks = require('../../unit/mocks/productsMocks');

describe('Testa a rota "/products"', () => {
  describe('A função allProducts', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([productsMocks]);
    });
    after(() => {
      sinon.restore();
    });
    it('retorna um array', async () => {
      const response = await productsModel.allProducts();
      expect(response).to.be.a('array');
    });

    it('retorna um array de produtos', async () => {
      const response = await productsModel.allProducts();
      expect(response).to.be.equal(productsMocks);
    });
  });
});

describe('Testa a rota "/products/id"', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([productsMocks[0]]);
  });
  after(() => {
    sinon.restore();
  });
  it('retorna um objeto', async () => {
    const response = await productsModel.productsById(1);
    expect(response).to.be.a('object');
  });
  it('o objeto não está vazio', async () => {
    const response = await productsModel.productsById(1);
    expect(response).to.be.not.empty;
  });
});


