const { mintPriceUnitType } = require('../../constants');
const Blueprint = require('../../models/Blueprint');

const searchBlueprint = async (req, res) => {
  try {
    const {
      query,
      sortField,
      sortOrder,
      minId,
      maxId,
      mintPriceUnit,
      mintPriceMin,
      mintPriceMax,
      mintLimitMin,
      mintLimitMax,
      totalSupplyMin,
      totalSupplyMax,
      mintedAmountMin,
      mintedAmountMax,
    } = req.query;
    const filter = {};
    if (maxId && Number(minId) > Number(maxId)) {
      return res.status(400).send('Blueprint id must be less than max id');
    }
    if (minId) {
      filter.id = {
        $gte: Number(minId),
      };
    }
    if (maxId) {
      filter.id = {
        ...filter.id,
        $lte: Number(maxId),
      };
    }
    if (mintPriceMax && Number(mintPriceMin) > Number(mintPriceMax)) {
      return res.status(400).send('Min price must less than max price');
    }
    if (mintPriceUnit && !mintPriceUnitType.includes(Number(mintPriceUnit))) {
      return res.status(400).send('Invalid unit');
    }
    if ((mintPriceMax || mintPriceMin) && mintPriceUnit) {
      filter.mintPriceUnit = Number(mintPriceUnit);
    }
    if (mintPriceMin) {
      filter.mintPrice = {
        $gte: Number(mintPriceMin),
      };
    }
    if (mintPriceMax) {
      filter.mintPrice = {
        ...filter.mintPrice,
        $lte: Number(mintPriceMax),
      };
    }
    if (mintLimitMax && Number(mintLimitMin) > Number(mintLimitMax)) {
      return res
        .status(400)
        .send('Min mint limit must less than max mint limit');
    }
    if (mintLimitMin) {
      filter.mintLimit = {
        $gte: Number(mintLimitMin),
      };
    }
    if (mintLimitMax) {
      filter.mintLimit = {
        ...filter.mintLimit,
        $lte: Number(mintLimitMax),
      };
    }
    if (totalSupplyMax && Number(totalSupplyMin) > Number(totalSupplyMax)) {
      return res
        .status(400)
        .send('Min total supply must less than max total supply');
    }
    if (totalSupplyMin) {
      filter.totalSupply = {
        $gte: Number(totalSupplyMin),
      };
    }
    if (totalSupplyMax) {
      filter.totalSupply = {
        ...filter.totalSupply,
        $lte: Number(totalSupplyMax),
      };
    }
    if (mintedAmountMax && Number(mintedAmountMin) > Number(mintedAmountMax)) {
      return res
        .status(400)
        .send('Min minted amount must less than max minted amount');
    }
    if (mintedAmountMin) {
      filter.mintedAmount = {
        $gte: Number(mintedAmountMin),
      };
    }
    if (mintedAmountMax) {
      filter.mintedAmount = {
        ...filter.mintedAmount,
        $lte: Number(mintedAmountMax),
      };
    }
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
    let search = {};
    let normalized = query.replace(/[^a-zA-Z0-9\s]/g, ' ');
    let words = normalized.split(/\s+/);
    let keywords = words.filter((word) => word.length > 0);
    if (keywords.length > 0) {
      const keywordRegex = new RegExp(keywords.join('|'), 'i');
      search = {
        $or: [
          { searchId: { $regex: keywordRegex } },
          { name: { $regex: keywordRegex } },
          { creator: { $regex: keywordRegex } },
        ],
      };
    }
    const blueprints = await Blueprint.find(search).sort(sort).where(filter);
    res.json(blueprints);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = searchBlueprint;
