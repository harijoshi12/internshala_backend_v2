const mongoose = require('mongoose');

/**
 * Converts a string to MongoDB ObjectId
 * @param {string} id - The string to convert to ObjectId
 * @returns {mongoose.Types.ObjectId} The converted ObjectId
 * @author hari prasad joshi
 */
const toObjectId = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  }
  throw new Error('Invalid ObjectId');
};

module.exports = {
  toObjectId
};