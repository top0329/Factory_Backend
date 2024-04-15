const Blueprint = require('../../models/Blueprint');

const mintBlueprint = async (req, res) => {
  try {
    const { id, mintedAmount } = req.body;
    const blueprint = await Blueprint.findOne({ id: id });
    if (blueprint) {
      blueprint.mintedAmount += mintedAmount;
      await blueprint.save();
      res.json(blueprint);
    } else {
      res.status(404).send({ msg: 'Blueprint not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = mintBlueprint;
