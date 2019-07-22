const express = require('express');

const router = express.Router();

// ImageSearch DB Model
const SearchHistory = require('../../models/SearchHistory');

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

router.post('/', async (req, res) => {
  const { searchTerm } = req.body;

  const newSearchHistory = new SearchHistory({
    searchTerm,
  });
  try {
    const dbResponse = await newSearchHistory.save();

    res.json(dbResponse);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
