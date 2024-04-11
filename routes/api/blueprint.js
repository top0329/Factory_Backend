const express = require('express');

const router = express();

router.get('/', (req, res) => {
  res.send({ msg: 'this is blueprint test api' });
});

module.exports = router;
