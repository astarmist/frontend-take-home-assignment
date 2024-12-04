import { styled } from "styled-components";

interface SearchSuggestionItemWrapperProps {
  $selected: boolean;
}

export const SearchSuggestionItemWrapper = styled.li<SearchSuggestionItemWrapperProps>`
  padding: 0.5rem 0.75rem;
  list-style: none;
  cursor: pointer;

  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }

  &:last-of-type {
    border-radius: 0 0 10px 10px;
  }

  ${(props) => (props.$selected ? "background-color: var(--neutral-5);" : "")}
`;
