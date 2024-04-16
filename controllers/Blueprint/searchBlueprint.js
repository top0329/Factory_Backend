const Blueprint = require('../../models/Blueprint');

const searchBlueprint = async (req, res) => {
  try {
    // const defaultSort = '-createdAt';
    const { query, sortField, sortOrder } = req.query;
    // const sortValue = sort || defaultSort;
    const validFields = [
      'id',
      'name',
      'totalSupply',
      'mintLimit',
      'mintPrice',
      'mintedAmount',
    ];
    if (!validFields.includes(sortField)) {
      res.status(400).send('Invalid sort field');
      return;
    }
    const sortOrderNum = sortOrder === 'asc' ? 1 : -1;
    const sort = {
      [sortField]: sortOrderNum,
    };
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
    }).sort(sort);
    res.json(blueprints);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = searchBlueprint;
