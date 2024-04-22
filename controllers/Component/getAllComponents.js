const Blueprint = require('../../models/Blueprint');

const getAllComponents = async (req, res) => {
  try {
    const results = await Blueprint.aggregate([
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
    res.json(results[0].componentsData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = getAllComponents;
