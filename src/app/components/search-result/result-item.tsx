import { SearchResultItem } from "../types";
import {
  ItemContent,
  ItemLink,
  ItemTitle,
  ResultItemWrapper,
} from "./result-item.styles";

import { TextUtils } from "@/app/utils/textUtils";

interface ResultItemProps {
  item: SearchResultItem;
  highlightText: string;
}

const ResultItem = (props: ResultItemProps) => {
  const { item, highlightText } = props;

  return (
    <ResultItemWrapper>
      <ItemTitle>{item.DocumentTitle.Text}</ItemTitle>
      {/* DocumentExcerpt doesn't come from user input, assumed to be safe */}
      <ItemContent
        dangerouslySetInnerHTML={{
          __html: TextUtils.formatMatchedText(
            item.DocumentExcerpt.Text,
            highlightText
          ),
        }}
      />

      <ItemLink href={item.DocumentURI}>{item.DocumentURI}</ItemLink>
    </ResultItemWrapper>
  );
};

export default ResultItem;
