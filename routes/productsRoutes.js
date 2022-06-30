const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const productsControllers = require('../controllers/productsControllers');

router.get('/', rescue(productsControllers.getProducts));

router.get('/:id', rescue(productsControllers.getProductsId));

router.post('/', productsControllers.createProduct);

module.exports = router;