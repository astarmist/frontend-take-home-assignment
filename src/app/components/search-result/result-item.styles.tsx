import { styled } from "styled-components";

export const ResultItemWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.75rem;
  word-break: break-word;
`;

export const ItemTitle = styled.h4`
  color: var(--primary);
  font-size: 22px;
  font-weight: 600;
`;

export const ItemContent = styled.p`
  font-size: 16px;
`;

export const ItemLink = styled.a`
  color: var(--neutral-4);
  font-size: 14px;
`;
