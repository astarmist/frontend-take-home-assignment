import { useEffect, useState } from "react";
import { SearchResultData, SearchResultItem } from "../types";
import ResultItem from "./result-item";
import {
  SearchResultContent,
  SearchResultHeader,
  SearchResultWrapper,
} from "./search-result.styles";

interface SearchResultProps {
  highlightText: string;
  results: SearchResultData;
}

const SearchResult = (props: SearchResultProps) => {
  const { results, highlightText } = props;
  const { TotalNumberOfResults, ResultItems } = results;
  const [filteredResultItems, setFilteredResultItems] = useState<
    SearchResultItem[]
  >([]);

  const renderHeaderText = () => {
    if (filteredResultItems.length > 0) {
      return `Showing ${filteredResultItems.length} of ${TotalNumberOfResults}`;
    } else {
      // Show only when there is user input, as an empty search term will return all the results
      if (highlightText && highlightText.length > 1) {
        return "No result found. You may want to try changing your search term.";
      }
    }
  };

  useEffect(() => {
    if (highlightText) {
      setFilteredResultItems(() => {
        /* Title is excluded from the search term
         * This is because user's search term might be included in the title and not the content, but nothing will
         * get highlighted in the content, which makes it look like a bug
         */
        return ResultItems.filter((item) =>
          item.DocumentExcerpt.Text.toLowerCase().includes(
            highlightText.toLowerCase()
          )
        );
      });
    } else {
      // Return all items if search input is empty
      setFilteredResultItems(ResultItems);
    }
  }, [ResultItems, highlightText]);

  return (
    <SearchResultWrapper>
      <SearchResultHeader>{renderHeaderText()}</SearchResultHeader>
      <SearchResultContent>
        {filteredResultItems &&
          filteredResultItems.map((item) => (
            <ResultItem
              item={item}
              key={item.DocumentId}
              highlightText={highlightText}
            />
          ))}
      </SearchResultContent>
    </SearchResultWrapper>
  );
};

export default SearchResult;
