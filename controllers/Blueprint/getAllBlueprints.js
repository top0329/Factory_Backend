const Blueprint = require('../../models/Blueprint');

const getAllBlueprints = async (req, res) => {
  try {
    const blueprints = await Blueprint.find();
    res.json(blueprints);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = getAllBlueprints;
