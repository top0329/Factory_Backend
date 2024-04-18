const Blueprint = require('../../models/Blueprint');

const createBlueprint = async (req, res) => {
  try {
    const data = req.body;
    const blueprint = new Blueprint(data);
    blueprint.searchId = blueprint.id;
    const savedData = await blueprint.save();
    res.send(savedData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = createBlueprint;
