import styled from "@emotion/styled";

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 24px 20px 32px;
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  max-width: 360px;
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  background: #4caf50;
  color: #ffffff;

  svg,
  span {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.15);
  }

  &:hover span {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    background: #3d9c41;
  }
`;
