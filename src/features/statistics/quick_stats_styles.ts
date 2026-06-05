import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const StatsCard = styled(motion.div)`
  background: linear-gradient(135deg, var(--primary), var(--accent));
  border-radius: 1.875rem;
  padding: 1.5rem;
  color: var(--primary-foreground);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.15);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const IconWrapper = styled.div`
  margin-bottom: 1rem;
  opacity: 0.9;

  svg {
    width: 2rem;
    height: 2rem;
    color: var(--primary-foreground);
  }
`;

export const CurrentValue = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.25rem;
  overflow: hidden;
`;

export const Label = styled.div`
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  opacity: 0.9;
`;

export const Footer = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

export const BestStreakLabel = styled.div`
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  opacity: 0.8;
  margin-bottom: 0.25rem;
`;

export const BestStreakValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;
