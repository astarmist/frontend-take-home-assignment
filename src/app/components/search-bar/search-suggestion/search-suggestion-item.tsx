import { TextUtils } from "@/app/utils/textUtils";
import { SearchSuggestionItemWrapper } from "./search-suggestion-item.styles";

interface SearchSuggestionItemProps {
  suggestion: string;
  selected: boolean;
  searchText: string;
  index: number;
  onClick: (index: number) => void;
}

const SearchSuggestionItem = (props: SearchSuggestionItemProps) => {
  const { suggestion, selected, searchText, index, onClick } = props;

  const handleClick = () => {
    onClick(index);
  };

  return (
    <SearchSuggestionItemWrapper $selected={selected} onClick={handleClick}>
      <span
        dangerouslySetInnerHTML={{
          __html: TextUtils.formatMatchedText(suggestion, searchText),
        }}
      ></span>
    </SearchSuggestionItemWrapper>
  );
};

export default SearchSuggestionItem;
