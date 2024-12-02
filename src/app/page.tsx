"use client";

import { useState } from "react";
import SearchBar from "@/app/components/search-bar/search-bar";
import { SearchResultData } from "@/app/components/types";
import SearchResult from "@/app/components/search-result/search-result";
import Header from "@/app/components/common/header";

export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResultData, setSearchResultData] = useState<SearchResultData>({
    TotalNumberOfResults: 0,
    ResultItems: [],
  });

  const handleSearch = (data: SearchResultData, searchText: string) => {
    setSearchText(searchText);
    setSearchResultData(data);
  };

  return (
    <main>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <SearchResult results={searchResultData} searchText={searchText} />
    </main>
  );
}
