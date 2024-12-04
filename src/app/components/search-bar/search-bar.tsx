import {
  SearchBarWrapper,
  SearchButton,
  SearchClear,
  SearchInput,
  SearchStatus,
} from "@/app/components/search-bar/search-bar.styles";
import { SearchContext } from "@/app/search-context";
import { CrossIcon, SearchIcon } from "@/assets/icons";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SEARCH_API_ENDPOINT } from "../constants";
import { SearchResultData } from "../types";
import SearchSuggestion from "./search-suggestion/search-suggestion";

interface SearchBarProps {
  onSearch: (data: SearchResultData, searchText: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const {
    searchText = "",
    setSearchText,
    selectedSuggestionIndex = -1,
    setSelectedSuggestionIndex,
    suggestions,
  } = useContext(SearchContext);
  const { setShowSuggestion } = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { onSearch } = props;

  // To ensure that the search is performed using the updated searchText
  useEffect(() => {
    if (searchText === suggestions[selectedSuggestionIndex]) {
      handleSearch();
    }
  }, [searchText]);

  const handleSearch = async () => {
    setStatusText("Searching...");

    setTimeout(() => {
      hideSuggestion();
    }, 100);

    const response = await fetch(SEARCH_API_ENDPOINT);
    const data = await response.json();

    if (data) {
      setHasError(false);
      setStatusText("");
      onSearch(data, searchText);
    } else {
      // Error handling, i.e due to network failure
      setHasError(true);
      setStatusText("Error: Unable to fetch data");
    }
  };

  const handleInputChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchText(target.value || "");

    if (searchText && searchText.length < 3) {
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleInputKeydown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIndex =
          selectedSuggestionIndex === suggestions.length - 1
            ? selectedSuggestionIndex
            : (selectedSuggestionIndex + 1) % suggestions.length;
        setSelectedSuggestionIndex(nextIndex);
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex =
          selectedSuggestionIndex <= 0
            ? -1
            : (selectedSuggestionIndex - 1) % suggestions.length;
        setSelectedSuggestionIndex(prevIndex);
        break;
      case "Enter":
        e.preventDefault();
        // If user has selected a suggestion, set the search text to be the suggestion
        // Otherwise, the search text will just be from the raw user's input
        if (selectedSuggestionIndex > -1) {
          setSearchText(suggestions[selectedSuggestionIndex]);
        }
        handleSearch();

        break;

      // Not part of the AC, but adding it for a better UX to hide the suggestions when user wants to
      case "Escape":
        e.preventDefault();
        hideSuggestion();
      default:
        break;
    }
  };

  const handleSearchClearClick = () => {
    setSearchText("");
    hideSuggestion();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const hideSuggestion = () => {
    setSelectedSuggestionIndex(-1);
    setShowSuggestion(false);
  };

  return (
    <SearchBarWrapper>
      <SearchInput
        ref={inputRef}
        value={searchText || ""}
        placeholder="Enter your search input"
        onChange={(e: React.ChangeEvent) => handleInputChange(e)}
        onKeyDown={(e: React.KeyboardEvent) => handleInputKeydown(e)}
      />

      <SearchSuggestion />

      <SearchClear
        $show={searchText?.length >= 1}
        src={CrossIcon}
        width={28}
        height={28}
        alt="Clear your search input"
        onClick={handleSearchClearClick}
      />

      <SearchButton onClick={handleSearch}>
        <Image src={SearchIcon} width={24} height={24} alt="Search Icon" />
        <span>Search</span>
      </SearchButton>

      <SearchStatus $error={hasError}> {statusText} </SearchStatus>
    </SearchBarWrapper>
  );
};

export default SearchBar;
