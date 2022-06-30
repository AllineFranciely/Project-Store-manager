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

describe('Testa a função updateProduct', () => {
  describe('Se o nome não é válido', () => {
    before(() => {
      sinon.stub(productsModel, 'updateProduct').resolves(true);
    });
    after(() => {
      sinon.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.updateProduct({ id: 1, name: 'Luva de Thanos' });
      expect(response).to.be.a('object');
    });

    it('retorna erro 400 quando o nome é branco', async () => {
      const response = await productsService.updateProduct({ id: 1 });
      expect(response.code).to.be.equal(400);
    });

    it('retorna o erro 422 quando o nome tem menos de 5 letras', async () => {
      const response = await productsService.updateProduct({ id: 1, name: 'luv' });
      expect(response.code).to.be.equal(422);
    });

    it('retorna a menssagem correta do erro 400', async () => {
      const response = await productsService.updateProduct({ id: 1 });
      expect(response.message).to.be.equal('"name" is required');
    });

    it('retorna a menssagem correta do erro 422', async () => {
      const response = await productsService.updateProduct({ id: 1, name: 'luv' });
      expect(response.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });
});
  
describe('Testa a função deleteProduct', () => {
  describe('se o ID é válido', () => {
    before(() => {
      sinon.stub(productsModel, 'deleteProduct').resolves(true);
      sinon.stub(productsModel, 'productsById').resolves([productsMocks[0]]);
    });
    after(() => {
      sinon.restore();
    });
    it('retorna um objeto', async () => {
      const response = await productsService.deleteProduct(99);
      expect(response).to.be.a('object');
    });

    it('retorna o código 204', async () => {
      const response = await productsService.deleteProduct(1);
      expect(response).to.be.deep.equal({ code: 204 });
    });
  });
  describe('se o ID é inválido', () => {
    before(() => {
      sinon.stub(productsModel, 'deleteProduct').resolves(true);
      sinon.stub(productsModel, 'productsById').resolves([]);
    });
    after(() => {
      sinon.restore();
    });

    it('não retorna undefined', async () => {
      const response = await productsService.deleteProduct(10);
      expect(response).to.be.not.equal(undefined);
    });

    it('retorna o código 404', async () => {
      const response = await productsService.deleteProduct(10);
      expect(response.code).to.be.equal(404);
    });

    it('retorna a menssagem correta de erro', async () => {
      const response = await productsService.deleteProduct(10);
      expect(response.message).to.be.equal('Product not found');
    });
  });
});