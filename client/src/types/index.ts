export interface SearchHistory {
  id: string;
  searchTerm: string;
  timeSince: string;
}

export interface SearchHistoryResponse {
  searchTerm: string;
  date: number;
}

export interface Image {
  title: string;
  htmlTitle: string;
  link: string;
  snippet: string;
  htmlSnippet: string;
  src: string;
  id: string;
}

export interface ImageResponse {
  items: Omit<Image, 'id'>[];
  page: number;
  totalResults: number;
}

export interface ImagesState extends ImageResponse {
  items: Image[];
  searchTerm: string;
}
