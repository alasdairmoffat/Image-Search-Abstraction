import { Document } from 'mongoose';

export interface SearchParams {
  searchTerm: string;
}

export interface SearchQuery {
  offset?: string;
}

export interface Image {
  title: string;
  htmlTitle: string;
  link: string;
  snippet: string;
  htmlSnippet: string;
  src: string;
}

interface Items extends Omit<Image, 'src'> {
  pagemap: {
    cse_image?: {
      src: string;
    }[];
  };
}

export interface ExternalApiResponse {
  items: Items[];
  searchInformation: {
    totalResults: number;
  };
}

export interface ImagesResponse {
  items: Image[];
  totalResults: number;
  page: number;
}

export interface SearchHistory {
  searchTerm: string;
}

export interface SearchHistoryDocument extends SearchHistory, Document {
  date: number;
}

export type SearchHistoryResponse = (SearchHistoryDocument & { _id: any })[];
