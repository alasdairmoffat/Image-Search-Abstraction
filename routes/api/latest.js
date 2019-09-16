const express = require('express');

const router = express.Router();

// ImageSearch DB Model
const SearchHistory = require('../../models/SearchHistory');

// @route GET /api/latest/imagesearch
// @desc  Get 5 most recent searches
router.get('/', async (req, res) => {
  try {
    const history = await SearchHistory.find(
      {},
      { searchTerm: true, date: true, _id: false },
      {
        sort: { date: -1 },
        limit: 5,
      },
    );
    res.json(history);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route POST /api/latest/imagesearch
// @desc  Add search term to database
router.post('/', async (req, res) => {
  const { searchTerm } = req.body;

  const newSearchHistory = new SearchHistory({
    searchTerm,
  });
  try {
    const dbResponse = await newSearchHistory.save();

    res.json({
      searchTerm: dbResponse.searchTerm,
      date: dbResponse.date,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
