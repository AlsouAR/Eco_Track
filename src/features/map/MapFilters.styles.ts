import styled from "@emotion/styled";

export const FiltersWrapper = styled.div`
  width: 100%;
`;

export const FilterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    gap: 0.75rem;
  }

  @media (min-width: 1024px) {
    gap: 1rem;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean; $color?: string }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 2rem;
  font-size: 0.813rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: ${({ $active, $color }) =>
    $active === true ? `linear-gradient(135deg, ${$color}, ${$color}dd)` : "white"};
  color: ${({ $active }) => ($active === true ? "white" : "#4a5568")};
  box-shadow: ${({ $active }) =>
    $active === true ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "0 1px 3px rgba(0, 0, 0, 0.1)"};
  border: ${({ $active }) => ($active === true ? "none" : "1px solid #e2e8f0")};

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background: ${({ $active }) => ($active === true ? "white" : "#f7fafc")};
    transform: ${({ $active }) => ($active === true ? "none" : "translateY(-2px)")};
  }

  @media (min-width: 768px) {
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  @media (min-width: 1024px) {
    padding: 0.75rem 1.5rem;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 2rem;
  font-size: 0.813rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: #4caf50;
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }

  @media (min-width: 768px) {
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  @media (min-width: 1024px) {
    padding: 0.75rem 1.5rem;
  }
`;
