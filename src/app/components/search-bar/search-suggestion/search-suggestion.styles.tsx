import BREAKPOINTS from "@/app/breakpoints";
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

  @media (max-width: ${BREAKPOINTS.md}px) {
    top: 5.5rem;
    width: calc(100% - 2 * (4rem) - 10rem);
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: calc(100% - 2 * (2rem) - 10rem);
  }

  ${(props) => (props.$show ? "display: block;" : "")}
`;

export const SearchSuggestionInfo = styled.div`
  margin: 0 0.75rem;
  padding: 0.5rem 0;
  color: var(--neutral-4);
  line-height: 1.5rem;
  border-bottom: 1px solid var(--neutral-5);
  font-size: 12px;
  font-weight: 400;

  @media (max-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`;
