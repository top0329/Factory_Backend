const express = require('express');

const ComponentController = require('../../controllers/Component');

const router = express();

router.get('/', ComponentController.getAllComponents);
router.get('/search', ComponentController.searchComponent);

module.exports = router;
