const mongoose = require('mongoose');

const { Schema } = mongoose;

const SearchHistorySchema = new Schema({
  searchTerm: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SearchHistory = mongoose.model('Search-History', SearchHistorySchema);

module.exports = SearchHistory;
