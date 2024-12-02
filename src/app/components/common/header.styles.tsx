import BREAKPOINTS from "@/app/breakpoints";
import { styled } from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  background: var(--neutral-5);
  padding: 0.25rem 10rem;

  @media (max-width: ${BREAKPOINTS.md}px) {
    padding: 0.25rem 4rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0.25rem 2rem;
  }
`;

export const HeaderText = styled.p`
  margin: 0 0.5rem;
  color: var(--neutral-3);
`;
