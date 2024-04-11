const Blueprint = require('../../models/Blueprint');

const createBlueprint = async (req, res) => {
  try {
    
    res.send({ msg: 'this is createblueprint controller' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = createBlueprint;
