"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import styled from "@emotion/styled";

interface QuickStatsProps {
  currentStreak?: number;
  bestStreak?: number;
}

const StatsCard = styled(motion.div)`
  background: linear-gradient(135deg, var(--primary), var(--accent));
  border-radius: 1.875rem;
  padding: 1.5rem;
  color: var(--primary-foreground); 
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.15);
  display: flex;
  flex-direction: column;
  height: 100%; 
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
  opacity: 0.9;
  
  svg {
    width: 2rem;
    height: 2rem;
    color: var(--primary-foreground);
  }
`;

const CurrentValue = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.25rem;
`;

const Label = styled.div`
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  opacity: 0.9;
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const BestStreakLabel = styled.div`
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  opacity: 0.8;
  margin-bottom: 0.25rem;
`;

const BestStreakValue = styled.div`
  font-size: 1.5rem; 
  font-weight: 700;
`;


export const QuickStats: React.FC<QuickStatsProps> = ({ 
  currentStreak = 24, 
  bestStreak = 31 
}) => {
  return (
    <StatsCard
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <IconWrapper>
        <Leaf />
      </IconWrapper>

      <CurrentValue>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {currentStreak}
        </motion.span>
      </CurrentValue>
      
      <Label>дней подряд</Label>

      <Footer>
        <BestStreakLabel>Лучшая серия</BestStreakLabel>
        <BestStreakValue>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {bestStreak} {getDaysLabel(bestStreak)}
          </motion.span>
        </BestStreakValue>
      </Footer>
    </StatsCard>
  );
};

const getDaysLabel = (days: number) => {
  const lastDigit = days % 10;
  if (days >= 11 && days <= 14) return 'дней';
  if (lastDigit === 1) return 'день';
  if (lastDigit >= 2 && lastDigit <= 4) return 'дня';
  return 'дней';
};

export default QuickStats;