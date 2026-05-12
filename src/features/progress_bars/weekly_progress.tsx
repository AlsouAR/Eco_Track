"use client";

import React from 'react';
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import styled from "@emotion/styled";

import { useAppSelector } from '../../store/hooks';
import { selectWeeklyStats } from '../habits/store/selectors';

interface WeeklyStat {
  day: string;
  completed: number;
}

interface WeeklyProgressProps {
  stats?: WeeklyStat[];
  totalHabits?: number;
}

const StatsContainer = styled.div`
  background: var(--card); 
  width: 100%;
  height: 100%;
  border-radius: 1.875rem;
  padding: 1.5rem;
  border: 1px solid var(--border); 
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.08);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-weight: var(--font-weight-medium);
  color: var(--foreground); 
  margin: 0;
`;

const DayRow = styled.div`
  margin-bottom: 2rem; 
  &:last-child {
    margin-bottom: 0;
  }
`;

const DayInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const DayLabel = styled.span`
  color: var(--muted-foreground); 
  font-weight: var(--font-weight-normal);
`;

const CountLabel = styled.span`
  color: var(--primary); 
  font-weight: 700;
`;

const ProgressTrack = styled.div`
  height: 0.5rem;
  background: var(--muted);
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #5cb85c, #84cc16);
  border-radius: 9999px;
`;

export const WeeklyProgress: React.FC = () => {
  // 1. Достаем общее количество привычек, чтобы считать %
  const totalHabits = useAppSelector((state) => state.habits.habits.length);

  // 2. Достаем вычисленную статистику за неделю
  const stats = useAppSelector(selectWeeklyStats);

  return (
    <StatsContainer>
      <Header>
        <TrendingUp size={20} color="var(--primary)" />
        <Title>Неделя</Title>
      </Header>
      
      <div>
        {stats.map((stat, index) => {
          const percentage = totalHabits > 0 ? (stat.completed / totalHabits) * 100 : 0;
          return (
            <DayRow key={`${stat.day}-${index}`}>
              <DayInfo>
                <DayLabel>{stat.day}</DayLabel>
                <CountLabel>
                  {stat.completed}/{totalHabits}
                </CountLabel>
              </DayInfo>
              
              <ProgressTrack>
                <ProgressBar
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.8, 
                    ease: "easeOut" 
                  }}
                />
              </ProgressTrack>
            </DayRow>
          );
        })}
      </div>
    </StatsContainer>
  );
};

export default WeeklyProgress;