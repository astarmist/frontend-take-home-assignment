import { styled } from "styled-components";

interface SearchSuggestionWrapperProps {
  $show: boolean;
}

export const SearchSuggestionWrapper = styled.div<SearchSuggestionWrapperProps>`
  position: absolute;
  top: 6.5rem;
  // Minus side margins and Search Button's width
  width: calc(100% - 2 * (10rem) - 10rem);
  border-radius: 0 0 10px 10px;
  background-color: var(--neutral-8);
  box-shadow: 0px 4px 8px 4px rgba(224, 228, 229, 0.35);
  z-index: 1000;
  display: none;

  ${(props) => (props.$show ? "display: block;" : "")}
`;
