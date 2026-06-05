import styled from "@emotion/styled";

export const BlockWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const BlockInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const ErrorBanner = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff9800;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  z-index: 1000;
  font-size: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
`;

export const ErrorButton = styled.button`
  background: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  cursor: pointer;
  color: #ff9800;
  font-weight: 600;
  font-size: 0.75rem;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
