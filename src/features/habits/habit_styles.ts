import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background: var(--card);
  border-radius: 1.875rem; 
  padding: 1.5rem;
  border: 1px solid var(--border);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.08);

  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: var(--font-weight-medium);
  color: var(--foreground);
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 1024px) {
    gap: 1rem;
  }
`;

export const HabitCard = styled(motion.div)<{ $isCompleted: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid var(--border);
  cursor: pointer;
  transition: all 0.25s ease;
  background: var(--sidebar-accent);
  user-select: none;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.12);
  }

  ${props => props.$isCompleted && `
    background: var(--muted); 
    border-color: var(--primary);
  `}

  @media (min-width: 1024px) {
    gap: 1rem;
    padding: 1.25rem;
  }
`;

export const IconBox = styled.div<{ $isCompleted: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: ${props => props.$isCompleted ? 'var(--primary)' : 'var(--input-background)'};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: color 0.2s ease;
    color: ${props => props.$isCompleted ? 'var(--primary-foreground)' : 'var(--primary)'};
  }

  @media (min-width: 1024px) {
    width: 3rem;
    height: 3rem;
  }
`;

export const HabitLabel = styled.span<{ $isCompleted: boolean }>`
  flex: 1;
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--foreground);
  transition: opacity 0.2s ease;
  opacity: ${props => props.$isCompleted ? 0.7 : 1};
`;

export const CheckBadge = styled(motion.div)`
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1rem;
    height: 1rem;
    color: var(--primary-foreground);
  }
`;

export const Footer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 1024px) {
    margin-top: 2rem;
  }
`;

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  
  .label { font-weight: var(--font-weight-medium); color: var(--muted-foreground); }
  .count { font-weight: 700; color: var(--primary); }
`;

export const SaveButton = styled(motion.button)<{ progress: number }>`
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem 0;
  border-radius: 1rem;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: var(--primary-foreground);
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.2);

  &:hover {
    opacity: 0.95;
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }

  ${props => props.progress === 100 && `
    background: var(--foreground);
    box-shadow: 0 8px 20px rgba(27, 94, 32, 0.2);
  `}
`;