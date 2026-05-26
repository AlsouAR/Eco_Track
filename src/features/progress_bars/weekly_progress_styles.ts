import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const StatsContainer = styled.div`
  background: var(--card); 
  width: 100%;
  height: 100%;
  border-radius: 1.875rem;
  padding: 1.5rem;
  border: 1px solid var(--border); 
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.08);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h3`
  font-weight: var(--font-weight-medium);
  color: var(--foreground); 
  margin: 0;
`;

export const DayRow = styled.div`
  margin-bottom: 2rem; 
  &:last-child {
    margin-bottom: 0;
  }
`;

export const DayInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const DayLabel = styled.span`
  color: var(--muted-foreground); 
  font-weight: var(--font-weight-normal);
`;

export const CountLabel = styled.span`
  color: var(--primary); 
  font-weight: 700;
`;

export const ProgressTrack = styled.div`
  height: 0.5rem;
  background: var(--muted);
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #5cb85c, #84cc16);
  border-radius: 9999px;
`;