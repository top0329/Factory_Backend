const Blueprint = require('../../models/Blueprint');

const getAllMyBlueprints = async (req, res) => {
  try {
    const { ids } = req.query;
    const ownedBlueprintIds = ids.split(',');
    const blueprints = await Blueprint.find({
      id: {
        $in: ownedBlueprintIds,
      },
    });
    res.json(blueprints);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = getAllMyBlueprints;
