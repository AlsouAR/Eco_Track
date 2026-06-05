import styled from "@emotion/styled";

export const PageContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;

  & > :first-child {
    align-self: center;
  }

  @media (min-width: 1440px) {
    gap: 32px;
  }
`;

export const TwoColumns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 24px;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 24px;
    align-items: flex-start;
  }

  @media (min-width: 1440px) {
    gap: 32px;
  }
`;

export const LeftColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (min-width: 1024px) {
    flex: 1.2;
    width: auto;
  }

  @media (min-width: 1440px) {
    flex: 1;
  }
`;

export const RightColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 24px;
  }

  @media (min-width: 1024px) {
    flex: 2.2;
    width: auto;
  }

  @media (min-width: 1440px) {
    flex: 2;
  }
`;
