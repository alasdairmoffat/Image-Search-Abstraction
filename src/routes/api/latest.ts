import express, { Request, Response } from 'express';

// ImageSearch DB Model
import SearchHistoryModel from '../../models/SearchHistory';
import { SearchHistoryResponse } from '../../types';

const router = express.Router();

// @route GET /api/latest/imagesearch
// @desc  Get 5 most recent searches
router.get(
  '/',
  async (req: Request, res: Response<SearchHistoryResponse | Error>) => {
    try {
      const history = await SearchHistoryModel.find(
        {},
        { searchTerm: true, date: true, _id: false },
        {
          sort: { date: -1 },
          limit: 5,
        },
      );

      res.json(history);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json(err);
      }
    }
  },
);

// @route POST /api/latest/imagesearch
// @desc  Add search term to database
router.post(
  '/',
  async (
    req: Request<{ searchTerm: string }>,
    res: Response<{ searchTerm: string; date: number } | Error>,
  ) => {
    const { searchTerm } = req.body;

    const newSearchHistory = new SearchHistoryModel({
      searchTerm,
    });
    try {
      const dbResponse = await newSearchHistory.save();

      res.json({
        searchTerm: dbResponse.searchTerm,
        date: dbResponse.date,
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json(err);
      }
    }
  },
);

export default router;
