import { SearchContext } from "@/app/search-context";
import { useContext, useEffect, useState } from "react";
import { SEARCH_SUGGESTION_API_ENDPINT } from "../../constants";
import SearchSuggestionItem from "./search-suggestion-item";
import {
  SearchSuggestionInfo,
  SearchSuggestionWrapper,
} from "./search-suggestion.styles";

const SearchSuggestion = () => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const {
    searchText = "",
    setSearchText,
    showSuggestion = false,
    setShowSuggestion,
    selectedSuggestionIndex = -1,
    setSelectedSuggestionIndex,
    suggestions,
    setSuggestions,
  } = useContext(SearchContext);

  useEffect(() => {
    const fetchAndFilterSuggestions = async () => {
      const response = await fetch(SEARCH_SUGGESTION_API_ENDPINT);
      const data = await response.json();
      const suggestions = data.suggestions;
      let showSuggestion = false;

      if (suggestions) {
        // Filter suggestions that matches with the search term when user keys in more than 2 characters
        // If there are no filtered suggestions, hide the whole component
        if (searchText && searchText.length > 2) {
          const filteredSuggestions = suggestions.filter((suggestion: string) =>
            suggestion.toLowerCase().includes(searchText.toLowerCase())
          );

          if (filteredSuggestions.length > 0) {
            showSuggestion = true;
            setFilteredSuggestions(filteredSuggestions);
            setSuggestions(suggestions);
          }
        }
      } else {
        console.error("Error: Unable to fetch suggestions");
      }

      setShowSuggestion(showSuggestion);
    };

    fetchAndFilterSuggestions();
  }, [searchText]);

  const handleClick = (index: number) => {
    setSelectedSuggestionIndex(index);
    setSearchText(suggestions[index] || "");
    setTimeout(() => {
      setShowSuggestion(false);
    }, 100);
  };

  return (
    <SearchSuggestionWrapper $show={showSuggestion}>
      <SearchSuggestionInfo>
        Tip: You can use the Up/Down arrow keys to choose between the options.
        Press "ESC" to close suggestions.
      </SearchSuggestionInfo>
      <ul>
        {filteredSuggestions &&
          filteredSuggestions.map((suggestion: string, index: number) => (
            <SearchSuggestionItem
              key={suggestion}
              suggestion={suggestion}
              selected={selectedSuggestionIndex === index}
              searchText={searchText}
              index={index}
              onClick={handleClick}
            />
          ))}
      </ul>
    </SearchSuggestionWrapper>
  );
};

export default SearchSuggestion;
