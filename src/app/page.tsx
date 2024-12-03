"use client";

import Header from "@/app/components/common/header";
import SearchBar from "@/app/components/search-bar/search-bar";
import SearchResult from "@/app/components/search-result/search-result";
import { SearchResultData } from "@/app/components/types";
import SearchContext from "@/app/search-context";
import { useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [highlightText, setHighlightText] = useState<string>("");
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [searchResultData, setSearchResultData] = useState<SearchResultData>({
    TotalNumberOfResults: 0,
    ResultItems: [],
  });

  const handleSearch = (data: SearchResultData, highlightText: string) => {
    setHighlightText(highlightText);
    setSearchResultData(data);
  };

  return (
    <main>
      <Header />
      <SearchContext.Provider
        value={{ showSuggestion, setShowSuggestion, searchText, setSearchText }}
      >
        <SearchBar onSearch={handleSearch} />
        <SearchResult
          results={searchResultData}
          highlightText={highlightText}
        />
      </SearchContext.Provider>
    </main>
  );
}
