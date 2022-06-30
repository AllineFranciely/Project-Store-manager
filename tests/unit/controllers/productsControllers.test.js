const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsControllers');
const productsMocks = require('../mocks/productsMocks');

describe('Testa a rota "/products"', () => {
  describe('Testa a função getProducts', () => {
    const request = {};
    const response = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAllProducts').resolves({ code: 200, products: productsMocks })
    });
    after(() => {
      sinon.restore();
    });

    it('retorna o status 200', async () => {
      await productsController.getProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it('retorna o array de produtos em json', async () => {
      await productsController.getProducts(request, response);
      expect(response.json.calledWith({ products: productsMocks }));
    });
  });

  describe('Testa a rota "/products/id"', () => {
    describe('Quando o produto existe', () => {
      const request = {};
      const response = {};
      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProductsById').resolves({ code: 200, product: productsMocks[0] });
      });
      after(() => {
        sinon.restore();
      });

      it('retorna o status 200', async () => {
        await productsController.getProductsId(request, response);
        expect(response.status.calledWith(200)).to.be.true
      });

      it('retorna o produto correto em json', async () => {
        await productsController.getProductsId(request, response);
        expect(response.json.calledWith(productsMocks[0]));
      });
    });

    describe('Quando o produto não existe na rota "/products"', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = { id: 4 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getAllProducts').resolves([]);
      });
      afterEach(() => {
        sinon.restore();
      });

      it('retorna o status 404 para todos os produtos', async () => {
        await productsController.getProducts(request, response);
        expect(response.status.calledWith(404));
      });

      it('retorna um json com a menssagem correta de todos os produtos', async () => {
        await productsController.getProducts(request, response);
        expect(response.json.calledWith({ message: 'Product not found' }));
      });
    });

    describe('Quando o produto não existe na rota "/products:id"', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = { id: 4 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProductsById').resolves([]);
      });
      afterEach(() => {
        sinon.restore();
      });

      it('retorna o status 404', async () => {
        await productsController.getProductsId(request, response);
        expect(response.status.calledWith(404));
      });

      it('retorna um json com a menssagem correta', async () => {
        await productsController.getProductsId(request, response);
        expect(response.json.calledWith({ message: 'Product not found' }));
      });
    });
  });
});