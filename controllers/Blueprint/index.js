const getAllBlueprints = require('./getAllBlueprints');
const searchBlueprint = require('./searchBlueprint');
const createBlueprint = require('./createBlueprint');
const mintBlueprint = require('./mintBlueprint');
const updateBlueprint = require('./updateBlueprint');

module.exports = BlueprintController = {
  getAllBlueprints,
  searchBlueprint,
  createBlueprint,
  updateBlueprint,
  mintBlueprint,
};
