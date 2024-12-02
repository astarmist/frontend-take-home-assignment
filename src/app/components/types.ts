export interface SearchResultData {
  TotalNumberOfResults: number;
  ResultItems: SearchResultItem[];
}

export interface SearchResultItem {
  DocumentId: string;
  DocumentTitle: DocumentTitle;
  DocumentExcerpt: DocumentExcerpt;
  DocumentURI: string;
}

interface DocumentTitle {
  Text: string;
}

interface DocumentExcerpt {
  Text: string;
}
