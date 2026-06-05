import styled from "@emotion/styled";

export const LogoutButton = styled.button`
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
  background: #f5f7f0;
  color: #dc2626;
  border: 1px solid #fecaca;

  svg,
  span {
    transition: transform 0.2s ease;
  }

  &:hover {
    background: #fef2f2;
    border-color: #fca5a5;
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
`;
