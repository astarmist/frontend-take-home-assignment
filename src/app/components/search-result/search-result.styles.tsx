import { styled } from "styled-components";
import BREAKPOINTS from "@/app/breakpoints";

export const SearchResultWrapper = styled.div`
  display: flex;
  flex-flow: column;

  padding: 2.5rem 10rem;

  @media (max-width: ${BREAKPOINTS.md}px) {
    padding: 2rem 4rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 2rem;
  }
`;

export const SearchResultHeader = styled.h3`
  color: var(--neutral-1);
  font-size: 22px;
  font-weight: 500;
`;

export const SearchResultContent = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.5rem;
  margin-top: 2.5rem;
  padding-bottom: 4rem;
`;
