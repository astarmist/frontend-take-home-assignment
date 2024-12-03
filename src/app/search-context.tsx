import { createContext, useContext, useState } from "react";

interface SearchContextType {
  showSuggestion?: boolean;
  setShowSuggestion: (show: boolean) => void;
  searchText?: string;
  setSearchText: (text: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  showSuggestion: false,
  setShowSuggestion: () => {},
  searchText: "",
  setSearchText: () => {},
});

export default SearchContext;
