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
    if (maxId && minId > maxId) {
      return res.status(400).send('Blueprint id must be less than max id');
    }
    if (minId) {
      filter.id = {
        $gte: minId,
      };
    }
    if (maxId) {
      filter.id = {
        ...filter.id,
        $lte: maxId,
      };
    }
    if (mintPriceMax && mintPriceMin > mintPriceMax) {
      return res.status(400).send('Min price must less than max price');
    }
    if (mintPriceUnit && !mintPriceUnitType.includes(Number(mintPriceUnit))) {
      return res.status(400).send('Invalid unit');
    }
    if ((mintPriceMax || mintPriceMin) && mintPriceUnit) {
      filter.mintPriceUnit = mintPriceUnit;
    }
    if (mintPriceMin) {
      filter.mintPrice = {
        $gte: mintPriceMin,
      };
    }
    if (mintPriceMax) {
      filter.mintPrice = {
        ...filter.mintPrice,
        $lte: mintPriceMax,
      };
    }
    if (mintLimitMax && mintLimitMin > mintLimitMax) {
      return res
        .status(400)
        .send('Min mint limit must less than max mint limit');
    }
    if (mintLimitMin) {
      filter.mintLimit = {
        $gte: mintLimitMin,
      };
    }
    if (mintLimitMax) {
      filter.mintLimit = {
        ...filter.mintLimit,
        $lte: mintLimitMax,
      };
    }
    if (totalSupplyMax && totalSupplyMin > totalSupplyMax) {
      return res
        .status(400)
        .send('Min total supply must less than max total supply');
    }
    if (totalSupplyMin) {
      filter.totalSupply = {
        $gte: totalSupplyMin,
      };
    }
    if (totalSupplyMax) {
      filter.totalSupply = {
        ...filter.totalSupply,
        $lte: totalSupplyMax,
      };
    }
    if (mintedAmountMax && mintedAmountMin > mintedAmountMax) {
      return res
        .status(400)
        .send('Min minted amount must less than max minted amount');
    }
    if (mintedAmountMin) {
      filter.mintedAmount = {
        $gte: mintedAmountMin,
      };
    }
    if (mintedAmountMax) {
      filter.mintedAmount = {
        ...filter.mintedAmount,
        $lte: mintedAmountMax,
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
          { id: { $regex: keywordRegex } },
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
