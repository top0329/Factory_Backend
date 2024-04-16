const express = require('express');

const BlueprintController = require('../../controllers/Blueprint');

const router = express();

router.get('/', BlueprintController.getAllBlueprints);
router.get('/search', BlueprintController.searchBlueprint);
router.post('/create', BlueprintController.createBlueprint);
router.put('/update', BlueprintController.updateBlueprint);
router.put('/mint', BlueprintController.mintBlueprint);

module.exports = router;
