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

  it('retorna o objeto correto', async () => {
    const response = await productsModel.productsById(1);
    expect(response).to.be.equal(productsMocks[0]);
  });
});

describe('Testa a função createProduct', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ inserId: 4 }]);
  });
  after(() => {
    sinon.restore();
  });

  it('testa se retorna um objeto', async () => {
    const response = await productsModel.createProduct({ name: 'Luva do Thanos' });
    expect(response).to.be.a('object');
  });
  it('testa se retorna o objeto retornado não está vazio', async () => {
    const response = await productsModel.createProduct({ name: 'Luva do Thanos' });
    expect(response).to.be.not.empty;
  });
});

describe('Testa a função updateProduct', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });
  after(() => {
    sinon.restore();
  });
  it('não retorna undefined', async () => {
    const response = await productsModel.updateProduct({ id: 1, name: 'Luva do Thanos' });
    expect(response).to.be.not.equal(undefined);
  });
  it('retorna true', async () => {
    const response = await productsModel.updateProduct({ id: 1, name: 'Luva do Thanos' });
    expect(response).to.be.equal(true);
  });
});
