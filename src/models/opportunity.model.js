const mongoose = require('mongoose');
const dbCollectionNames = require('../constants/dbCollection.constant');

const stipendSchema = new mongoose.Schema({
  salary: String,
  tooltip: String,
  salaryValue1: Number,
  salaryValue2: Number,
  salaryType: {
    type: String,
    enum: ['fixed', 'performance_based', 'negotiable']
  },
  currency: String,
  scale: {
    type: String,
    enum: ['permonth', 'lumpsum']
  },
  large_stipend_text: Boolean
});

const opportunitySchema = new mongoose.Schema({
  internshipId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  posted_on: {
    type: String,
  },
  expires_at:{
    type: String,
  },
  employer_name: {
    type: String,
  },
  employment_type:{
    type: String,
  },
  company_name: {
    type: String,
    required: true
  },
  profile_name: {
    type: String,
  },
  start_date: {
    type: String,
  },
  duration: {
    type: String,
  },
  start_date: String,
  stipend: stipendSchema,
  location_names: [String],
}, {
  timestamps: true, // This option adds createdAt and updatedAt fields
  versionKey: false // This option removes the __v field
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema, dbCollectionNames.OPPORTUNITY);

module.exports = Opportunity;