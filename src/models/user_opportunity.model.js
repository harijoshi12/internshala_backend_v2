const mongoose = require('mongoose');
const dbCollectionNames = require('../constants/dbCollection.constant');

const userOpportunitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: dbCollectionNames.USER,
    required: true
  },
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: dbCollectionNames.OPPORTUNITY,
    required: true
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'accepted'],
    default: 'applied'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to ensure a user can only apply once to an opportunity
userOpportunitySchema.index({ userId: 1, opportunityId: 1 }, { unique: true });

const UserOpportunity = mongoose.model('UserOpportunity', userOpportunitySchema, 'user_opportunities');

module.exports = UserOpportunity;