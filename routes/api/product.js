const express = require('express');

const ProductController = require('../../controllers/Product');

const router = express();

router.get('/', ProductController.getAllProducts);

module.exports = router;
