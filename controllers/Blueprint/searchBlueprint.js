const Blueprint = require('../../models/Blueprint');

const searchBlueprint = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      res.status(400).send({ msg: 'Please provide a query' });
      return;
    }
    let normalized = query.replace(/[^a-zA-Z0-9\s]/g, ' ');
    let words = normalized.split(/\s+/);
    let keywords = words.filter((word) => word.length > 0);
    const keywordRegex = new RegExp(keywords.join('|'), 'i');
    const blueprints = await Blueprint.find({
      $or: [
        { id: { $regex: keywordRegex } },
        { name: { $regex: keywordRegex } },
        { creator: { $regex: keywordRegex } },
      ],
    });
    res.json(blueprints);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = searchBlueprint;
