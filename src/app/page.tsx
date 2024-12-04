"use client";

import Header from "@/app/components/common/header";
import SearchBar from "@/app/components/search-bar/search-bar";
import SearchResult from "@/app/components/search-result/search-result";
import { SearchResultData } from "@/app/components/types";
import { SearchContextProvider } from "@/app/search-context";
import { useEffect, useState } from "react";

export default function Home() {
  /* A different state is used to store the text being passed to the SearchResult.
   * This is done so that the result doesn't dynamically change when user changes the search input
   */
  const [highlightText, setHighlightText] = useState<string>("");
  const [searchResultData, setSearchResultData] = useState<SearchResultData>({
    TotalNumberOfResults: 0,
    ResultItems: [],
  });
  const [isClientReady, setClientReady] = useState<boolean>(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const handleSearch = (data: SearchResultData, highlightText: string) => {
    setHighlightText(highlightText);
    setSearchResultData(data);
  };

  return (
    <main>
      {isClientReady && (
        <SearchContextProvider>
          <Header />
          <SearchBar onSearch={handleSearch} />
          <SearchResult
            results={searchResultData}
            highlightText={highlightText}
          />
        </SearchContextProvider>
      )}
    </main>
  );
}
