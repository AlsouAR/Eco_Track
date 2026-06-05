import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";

export const MapPopupWrapper = styled.div`
  padding: 1rem;
  min-width: 280px;
  color: var(--foreground);
`;

export const PopupHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const PopupIcon = styled.div<{ $bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #ffffff;
  background: ${({ $bgColor }) => $bgColor};
`;

export const PopupInfo = styled.div`
  flex: 1;
`;

export const PopupTitle = styled.h3`
  margin: 0 0 0.25rem;
  font-weight: 700;
  font-size: 1rem;
  color: var(--foreground);
`;

export const PopupDescription = styled.p`
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.95rem;
`;

export const PopupDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.93rem;
  color: var(--muted-foreground);
`;

export const PopupDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PopupButton = styled.button`
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 1rem;
  border: none;
  background: linear-gradient(135deg, var(--eco-primary), var(--eco-accent));
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 15px 30px rgba(76, 175, 80, 0.22);
  }
`;

export const PopupGlobalStyles = () => (
  <Global
    styles={css`
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 1rem;
        padding: 0;
        box-shadow: 0 8px 30px rgba(76, 175, 80, 0.2);
      }

      .custom-popup .leaflet-popup-content {
        margin: 0;
      }

      .custom-popup .leaflet-popup-tip {
        background: white;
      }
    `}
  />
);
