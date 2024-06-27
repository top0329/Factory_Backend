const Blueprint = require('../../models/Blueprint');

const updateBlueprint = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const updatedBlueprintData = await Blueprint.findOneAndUpdate(
      { id: data.id, chainId: data.chainId },
      data,
      { new: true }
    );
    res.send(updatedBlueprintData.data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = updateBlueprint;
