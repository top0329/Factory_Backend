const Blueprint = require('../../models/Blueprint');

const searchComponent = async (req, res) => {
  try {
    const { query, sortField, sortOrder } = req.query;
    // const validFields = ['name', 'type', 'usedAmount', 'recentCreated'];
    // if (!validFields.includes(sortField)) {
    //   res.status(400).send('Invalid sort field');
    //   return;
    // }
    const sortOrderNum = sortOrder === 'asc' ? 1 : -1;
    const sort = {
      [sortField]: sortOrderNum,
    };
    let search = {};
    let keywordRegex = '';
    let normalized = query.replace(/[^a-zA-Z0-9\s]/g, ' ');
    let words = normalized.split(/\s+/);
    let keywords = words.filter((word) => word.length > 0);
    if (keywords.length > 0) {
      keywordRegex = new RegExp(keywords.join('|'), 'i');
      search = {
        $or: [
          { name: { $regex: keywordRegex } },
          { type: { $regex: keywordRegex } },
        ],
      };
    }
    const results = await Blueprint.aggregate([
      {
        $match: {
          $or: [
            {
              'data.erc20Data.name': keywordRegex,
            },
            { 'data.erc20Data.type': keywordRegex },
            {
              'data.erc721Data.name': keywordRegex,
            },
            { 'data.erc721Data.type': keywordRegex },
            {
              'data.erc1155Data.name': keywordRegex,
            },
            { 'data.erc1155Data.type': keywordRegex },
          ],
        },
      },
      {
        $facet: {
          erc20Data: [
            { $unwind: '$data.erc20Data' },
            {
              $group: {
                _id: '$data.erc20Data.tokenAddress',
                totalAmount: { $sum: '$data.erc20Data.amount' },
                name: { $first: '$data.erc20Data.name' },
                tokenAddress: { $first: '$data.erc20Data.tokenAddress' },
                uri: { $first: '$data.erc20Data.uri' },
                type: { $first: '$data.erc20Data.type' },
              },
            },
          ],
          erc721Data: [
            { $unwind: '$data.erc721Data' },
            {
              $group: {
                _id: '$data.erc721Data.tokenId',
                tokenId: { $first: '$data.erc721Data.tokenId' },
                name: { $first: '$data.erc721Data.name' },
                tokenAddress: { $first: '$data.erc721Data.tokenAddress' },
                type: { $first: '$data.erc721Data.type' },
              },
            },
          ],
          erc1155Data: [
            { $unwind: '$data.erc1155Data' },
            {
              $group: {
                _id: {
                  tokenId: '$data.erc1155Data.tokenId',
                  tokenAddress: '$data.erc1155Data.tokenAddress',
                },
                totalAmount: { $sum: '$data.erc1155Data.amount' },
                name: { $first: '$data.erc1155Data.name' },
                tokenId: { $first: '$data.erc1155Data.tokenId' },
                tokenAddress: { $first: '$data.erc1155Data.tokenAddress' },
                type: { $first: '$data.erc1155Data.type' },
              },
            },
          ],
        },
      },
      {
        $project: {
          componentsData: {
            $concatArrays: ['$erc20Data', '$erc721Data', '$erc1155Data'],
          },
        },
      },
    ]);
    res.status(200).send(results[0].componentsData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = searchComponent;
