import BREAKPOINTS from "@/app/breakpoints";
import { styled } from "styled-components";

interface SearchStatusProps {
  $error: boolean;
}

export const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  padding: 3rem 10rem;
  box-shadow: 0px 4px 8px 4px rgba(224, 228, 229, 0.35);

  @media (max-width: ${BREAKPOINTS.md}px) {
    padding: 2rem 4rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 2rem;
  }
`;

export const SearchInput = styled.input`
  padding: 0 1.5rem;
  border-radius: 8px 0 0 8px;
  border: 1px solid var(--neutral-4);
  flex: 1;
  font-size: 18px;
  outline: none;

  &:focus {
    border-color: var(--primary);
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    max-width: calc(100vw - 14rem);
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background-color: var(--primary);
  color: var(--neutral-8);
  border-radius: 8px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  // To overlap with the corners of the text input
  flex: 0 0 calc(10rem - 10px);
  transform: translateX(-10px);
`;

export const SearchStatus = styled.div<SearchStatusProps>`
  position: absolute;
  bottom: 1rem;

  ${(props) => (props.$error ? "color: var(--error);" : "")}
`;
