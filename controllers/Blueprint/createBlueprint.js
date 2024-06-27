const Blueprint = require('../../models/Blueprint');

const createBlueprint = async (req, res) => {
  try {
    const data = req.body;
    const { id, chainId } = data;
    const existingBlueprint = await Blueprint.findOne({ id, chainId });
    if (existingBlueprint) {
      return res
        .status(400)
        .send({ msg: 'Blueprint ID already exists for the given chain' });
    }
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
