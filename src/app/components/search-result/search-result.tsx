import {
  SearchResultContent,
  SearchResultHeader,
  SearchResultWrapper,
} from "./search-result.styles";
import { SearchResultData, SearchResultItem } from "../types";
import { useEffect, useState } from "react";
import ResultItem from "./result-item";

interface SearchResultProps {
  searchText: string;
  results: SearchResultData;
}

const SearchResult = (props: SearchResultProps) => {
  const { results, searchText } = props;
  const { TotalNumberOfResults, ResultItems } = results;
  const [filteredResultItems, setFilteredResultItems] = useState<
    SearchResultItem[]
  >([]);

  const renderHeaderText = () => {
    if (filteredResultItems.length > 0) {
      return `Showing ${filteredResultItems.length} of ${TotalNumberOfResults}`;
    } else {
      // Show only when there is user input, as an empty search term will return all the results
      if (searchText.length > 1) {
        return "No result found. You may want to try changing your search term.";
      }
    }
  };

  useEffect(() => {
    setFilteredResultItems(() => {
      /* Title is excluded from the search term
       * This is because user's search term might be included in the title and not the content, but nothing will
       * get highlighted in the content, which makes it look like a bug
       */
      return ResultItems.filter((item) =>
        item.DocumentExcerpt.Text.toLowerCase().includes(
          searchText.toLowerCase()
        )
      );
    });
  }, [ResultItems, searchText]);

  return (
    <SearchResultWrapper>
      <SearchResultHeader>{renderHeaderText()}</SearchResultHeader>
      <SearchResultContent>
        {filteredResultItems &&
          filteredResultItems.map((item) => (
            <ResultItem
              item={item}
              key={item.DocumentId}
              searchText={searchText}
            />
          ))}
      </SearchResultContent>
    </SearchResultWrapper>
  );
};

export default SearchResult;
