import SearchContext from "@/app/search-context";
import { useContext, useEffect, useState } from "react";
import { SEARCH_SUGGESTION_API_ENDPINT } from "../../constants";
import SearchSuggestionItem from "./search-suggestion-item";
import { SearchSuggestionWrapper } from "./search-suggestion.styles";

interface SearchSuggestionProps {
  suggestionIndex: number;
  onSelect: (suggestionIndex: number) => void;
  onShowSuggestions: (suggestions: string[]) => void;
}

const SearchSuggestion = (props: SearchSuggestionProps) => {
  const { showSuggestion = false, setShowSuggestion } =
    useContext(SearchContext);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const { searchText = "", setSearchText } = useContext(SearchContext);
  const { suggestionIndex, onSelect, onShowSuggestions } = props;

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch(SEARCH_SUGGESTION_API_ENDPINT);
      const data = await response.json();
      const suggestions = data.suggestions;
      console.log("fetchSuggestions called");

      if (suggestions) {
        // Show suggestions that matches with the search term when user keys in more than 2 characters
        if (searchText && searchText.length > 2) {
          const filteredSuggestions = suggestions.filter((suggestion: string) =>
            suggestion.toLowerCase().includes(searchText.toLowerCase())
          );

          if (filteredSuggestions.length > 0) {
            setFilteredSuggestions(filteredSuggestions);
            setShowSuggestion(true);
            onShowSuggestions(filteredSuggestions);
          } else {
            setFilteredSuggestions([]);
            setShowSuggestion(false);
          }
        } else {
          setShowSuggestion(false);
        }
      } else {
        console.error("Error: Unable to fetch suggestions");
      }
    };

    fetchSuggestions();
  }, [searchText]);

  useEffect(() => {
    setSelectedSuggestionIndex(suggestionIndex);
  }, [suggestionIndex]);

  const handleClick = (index: number) => {
    setSelectedSuggestionIndex(index);
    onSelect(index);
    setTimeout(() => {
      setShowSuggestion(false);
    }, 100);
  };

  return (
    <SearchSuggestionWrapper $show={showSuggestion}>
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
