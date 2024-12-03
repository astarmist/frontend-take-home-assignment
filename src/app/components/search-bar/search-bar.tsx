import {
  SearchBarWrapper,
  SearchButton,
  SearchClear,
  SearchInput,
  SearchStatus,
} from "@/app/components/search-bar/search-bar.styles";
import SearchContext from "@/app/search-context";
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
  const { searchText = "", setSearchText } = useContext(SearchContext);
  const [statusText, setStatusText] = useState<string>("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showSuggestion = false, setShowSuggestion } =
    useContext(SearchContext);
  const { onSearch } = props;

  // To ensure that the search is performed using the updated searchText
  useEffect(() => {
    if (searchText === suggestions[selectedSuggestionIndex]) {
      handleSearch();
    }
  }, [searchText]);

  const handleSearch = async () => {
    setStatusText("Searching...");

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
        setSelectedSuggestionIndex((prevIndex) => {
          if (prevIndex === suggestions.length - 1) {
            return prevIndex;
          }
          return (prevIndex + 1) % suggestions.length;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prevIndex) => {
          if (prevIndex <= 0) {
            return -1;
          }
          return (prevIndex - 1) % suggestions.length;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex > -1) {
          setSearchText(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearch();
        }

        setTimeout(() => {
          setSelectedSuggestionIndex(-1);
          setShowSuggestion(false);
        }, 100);

        break;

      // Not part of the AC, but adding it for a better UX to hide the suggestions when user wants to
      case "Escape":
        e.preventDefault();
        setSelectedSuggestionIndex(0);
        setShowSuggestion(false);
      default:
        break;
    }
  };

  const handleSuggestionSelect = (index: number) => {
    setSelectedSuggestionIndex(index);
    setSearchText(suggestions[index] || "");
  };

  const handleShowSuggestions = (suggestions: string[]) => {
    setSuggestions(suggestions);
  };

  const handleSearchClearClick = () => {
    setSearchText("");
    setSelectedSuggestionIndex(-1);
    setShowSuggestion(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <SearchBarWrapper>
      <SearchInput
        ref={inputRef}
        value={searchText || ""}
        onChange={(e: React.ChangeEvent) => handleInputChange(e)}
        onKeyDown={(e: React.KeyboardEvent) => handleInputKeydown(e)}
      />
      <SearchSuggestion
        suggestionIndex={selectedSuggestionIndex}
        onSelect={handleSuggestionSelect}
        onShowSuggestions={handleShowSuggestions}
      />

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
