const express = require('express');

const router = express.Router();

const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.getProducts);

router.get('/:id', productsControllers.getProductsId);

router.post('/', productsControllers.createProduct);

router.put('/:id', productsControllers.updateProduct);

module.exports = router;