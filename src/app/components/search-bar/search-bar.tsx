import {
  SearchBarWrapper,
  SearchButton,
  SearchInput,
  SearchStatus,
} from "@/app/components/search-bar/search-bar.styles";
import SearchIcon from "@/assets/icons/search.svg";
import Image from "next/image";
import React, { useState } from "react";
import { SearchResultData } from "../types";

interface SearchBarProps {
  onSearch: (data: SearchResultData, searchText: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [statusText, setStatusText] = useState<string>("");
  const { onSearch } = props;

  const handleSearch = async () => {
    setStatusText("Searching...");

    const response = await fetch(
      "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json"
    );
    const data = await response.json();

    if (data) {
      setStatusText("");
      onSearch(data, searchText);
    }
  };

  const handleInputChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchText(target.value);
  };

  const handleInputKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchBarWrapper>
      <SearchInput
        onChange={(e: React.ChangeEvent) => handleInputChange(e)}
        onKeyDown={(e: React.KeyboardEvent) => handleInputKeydown(e)}
      />
      <SearchButton onClick={handleSearch}>
        <Image src={SearchIcon} width={24} height={24} alt="Search Icon" />
        <span>Search</span>
      </SearchButton>

      <SearchStatus> {statusText} </SearchStatus>
    </SearchBarWrapper>
  );
};

export default SearchBar;
