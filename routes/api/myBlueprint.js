const express = require('express');

const MyBlueprintController = require('../../controllers/MyBlueprint');

const router = express();

router.get('/', MyBlueprintController.getAllMyBlueprints);

module.exports = router;
