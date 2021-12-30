import mongoose from 'mongoose';
import { SearchHistoryDocument } from '../types';

const { Schema } = mongoose;

const SearchHistorySchema = new Schema<SearchHistoryDocument>({
  searchTerm: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
});

const SearchHistoryModel = mongoose.model(
  'Search-History',
  SearchHistorySchema,
);

export default SearchHistoryModel;
