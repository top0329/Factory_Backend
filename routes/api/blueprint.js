const express = require('express');

const BlueprintController = require('../../controllers/Blueprint');

const router = express();

router.get('/', (req, res) => {
  res.send({ msg: 'this is blueprint test api' });
});

router.post('/create', BlueprintController.createBlueprint);

module.exports = router;
