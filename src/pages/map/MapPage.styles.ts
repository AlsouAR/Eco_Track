import styled from "@emotion/styled";

export const PageContainer = styled.div`
  min-height: 100vh;

  @media (min-width: 1440px) {
    max-width: 1440px;
    margin: 0 auto;
  }
`;

export const ContentWrapper = styled.div`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1b5e20;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #558b2f;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const FilterSection = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(16, 185, 129, 0.12);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  padding: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    border-radius: 1.5rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const MapCard = styled.div`
  width: 100%;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  padding: 0; /* Убираем padding, чтобы карта занимала всё место */

  @media (min-width: 768px) {
    border-radius: 1.5rem;
  }
`;

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media (min-width: 768px) {
    height: 500px;
  }

  @media (min-width: 1024px) {
    height: 600px;
  }
`;

export const GeolocationStatus = styled.div<{ isActive: boolean }>`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: ${(props) => (props.isActive ? "#4CAF50" : "#ff9800")};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);

  @media (min-width: 768px) {
    bottom: 20px;
    right: 20px;
    font-size: 0.875rem;
    padding: 0.5rem 1.25rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;