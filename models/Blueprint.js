const mongoose = require('mongoose');

const { mintPriceUnitType } = require('../constants');

const Schema = mongoose.Schema;

const BlueprintSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    chainId: {
      type: Number,
      required: true,
    },
    searchId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      maxlength: [20, 'Name cannot exceed 20 characters'],
      required: true,
    },
    imageUri: {
      type: String,
      default:
        'https://ipfs.io/ipfs/bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi',
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    totalSupply: {
      type: Number,
      required: true,
    },
    mintPrice: {
      type: Number,
      required: true,
    },
    mintPriceUnit: {
      type: Number,
      enum: mintPriceUnitType,
      required: true,
    },
    mintLimit: {
      type: Number,
      required: true,
    },
    mintedAmount: {
      type: Number,
      default: 0,
      required: true,
    },
    data: {
      erc20Data: [
        {
          name: {
            type: String,
            required: true,
          },
          tokenAddress: {
            type: String,
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
          uri: {
            type: String,
            default:
              'https://ipfs.io/ipfs/bafybeigzqwt7uavnlrj3nq44hyoicf3jcbfxi2iih6uaguj3za5t3aqxoi',
            required: true,
          },
          type: {
            type: String,
            default: 'erc20',
            required: true,
          }
        },
      ],
      erc721Data: [
        {
          name: {
            type: String,
            required: true,
          },
          tokenAddress: {
            type: String,
            required: true,
          },
          tokenId: {
            type: Number,
            required: true,
          },
          type: {
            type: String,
            default: 'erc721',
            required: true,
          }
        },
      ],
      erc1155Data: [
        {
          name: {
            type: String,
            required: true,
          },
          tokenAddress: {
            type: String,
            required: true,
          },
          tokenId: {
            type: Number,
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
          type: {
            type: String,
            default: 'erc1155',
            required: true,
          }
        },
      ],
    },
  },
  { timestamps: true }
);

// BlueprintSchema.index({ id: 1 });
// BlueprintSchema.index({ name: 'text', creator: 'text' });

module.exports = mongoose.model('blueprint', BlueprintSchema);
