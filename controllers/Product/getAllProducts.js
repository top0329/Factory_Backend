const Blueprint = require('../../models/Blueprint');

const getAllProducts = async (req, res) => {
  try {
    const { ids } = req.query;
    const productIds = ids.split(',');
    const blueprints = await Blueprint.find({
      id: {
        $in: productIds,
      },
    });
    res.json(blueprints);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = getAllProducts;
