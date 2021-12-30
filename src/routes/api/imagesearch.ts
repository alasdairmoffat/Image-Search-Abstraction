import express, { Request, Response } from 'express';
import axios from 'axios';
import {
  SearchParams,
  SearchQuery,
  ExternalApiResponse,
  ImagesResponse,
} from '../../types';

const router = express.Router();

// @route GET /api/imagesearch/:searchTerm
// @desc  Get image search results
router.get(
  '/:searchTerm',
  async (
    req: Request<SearchParams, {}, {}, SearchQuery>,
    res: Response<ImagesResponse | Error>,
  ) => {
    const { searchTerm } = req.params;
    const { offset } = req.query;
    const start = offset ? Math.min(parseInt(offset, 10) * 10, 90) + 1 : 1;

    // search for images
    try {
      const params = new URLSearchParams({
        key: process.env.API_KEY!,
        cx: process.env.CSE_ID!,
        q: searchTerm,
        start: String(start),
      });

      const data = await axios.get<ExternalApiResponse>(
        `https://www.googleapis.com/customsearch/v1?${params.toString()}`,
      );

      const items = data.data.items.map((item) => {
        const { title, htmlTitle, link, snippet, htmlSnippet, pagemap } = item;
        const { src } = pagemap.cse_image ? pagemap.cse_image[0] : { src: '' };

        return {
          title,
          htmlTitle,
          link,
          snippet,
          htmlSnippet,
          src,
        };
      });

      const { totalResults } = data.data.searchInformation;

      res.json({
        totalResults,
        page: Math.floor(start / 10) + 1,
        items,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  },
);

export default router;
