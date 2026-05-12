"use client";

import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, Bike, Recycle, Droplet, Leaf } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox/checkbox"; 
import { Progress } from "../../components/ui/progress/progress";

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleHabit, saveDay } from './store/habits_slice';

// Маппинг строк из Redux в компоненты Lucide
const IconMap: Record<string, any> = {
  ShoppingBag,
  Bike,
  Recycle,
  Droplet,
  Leaf
};

interface Habit {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  completed: boolean;
}

interface TodayActionsProps {
  habits: Habit[];
  onToggle: (id: string) => void;
}


const Container = styled(motion.div)`
  background: var(--card);
  border-radius: 1.875rem; 
  padding: 1.5rem;
  border: 1px solid var(--border);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.08);

  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: var(--font-weight-medium);
  color: var(--foreground);
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 1024px) {
    gap: 1rem;
  }
`;

const HabitCard = styled(motion.div)<{ $isCompleted: boolean }>`
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

const IconBox = styled.div<{ $isCompleted: boolean }>`
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

const HabitLabel = styled.span<{ $isCompleted: boolean }>`
  flex: 1;
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--foreground);
  transition: opacity 0.2s ease;
  opacity: ${props => props.$isCompleted ? 0.7 : 1};
`;

const CheckBadge = styled(motion.div)`
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

const Footer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 1024px) {
    margin-top: 2rem;
  }
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  
  .label { font-weight: var(--font-weight-medium); color: var(--muted-foreground); }
  .count { font-weight: 700; color: var(--primary); }
`;

const SaveButton = styled(motion.button)<{ progress: number }>`
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


export const TodayActions: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // 1. Берем привычки и ЧЕРНОВИК вместо истории
  const { habits, currentDraft, history, selectedDate } = useAppSelector((state) => state.habits);
  // 2. Определяем список выполненных ID для текущей даты
  const completedIds = history[selectedDate] || [];

  const hasChanges = JSON.stringify(currentDraft) !== JSON.stringify(history[selectedDate] || []);

  // 3. Формируем массив привычек с актуальным статусом completed
  const currentHabits = habits.map(habit => ({
    ...habit,
    completed: currentDraft.includes(habit.id), // Работаем с черновиком
    iconComponent: IconMap[habit.icon] || Leaf 
  }));

  const completedCount = currentHabits.filter((h) => h.completed).length;
  const progressValue = currentHabits.length > 0 ? (completedCount / currentHabits.length) * 100 : 0;

  // 4. Обработчик клика
  const handleToggle = (id: string) => {
    dispatch(toggleHabit(id));
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Title>Сегодняшние действия</Title>

      <List>
        {currentHabits.map((habit, index) => {
          const Icon = habit.iconComponent;
          return (
            <HabitCard
              key={habit.id}
              $isCompleted={habit.completed}
              onClick={() => handleToggle(habit.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Checkbox
                checked={habit.completed}
                onCheckedChange={() => handleToggle(habit.id)}
                onClick={(e) => e.stopPropagation()} 
              />

              <IconBox $isCompleted={habit.completed}>
                <Icon />
              </IconBox>

              <HabitLabel $isCompleted={habit.completed}>
                {habit.label}
              </HabitLabel>

              <AnimatePresence>
                {habit.completed && (
                  <CheckBadge
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check />
                  </CheckBadge>
                )}
              </AnimatePresence>
            </HabitCard>
          );
        })}
      </List>

      <Footer>
        <ProgressInfo>
          <span className="label">Дневная цель</span>
          <span className="count">{completedCount} / {currentHabits.length}</span>
        </ProgressInfo>
        <Progress value={progressValue} />
      </Footer>

      <SaveButton 
        progress={progressValue}
        onClick={() => dispatch(saveDay())}
        disabled={!hasChanges}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
      >
        <span>{hasChanges ? "Сохранить изменения" : "Сохранено"}</span>
        <motion.div
          animate={{
            scale: progressValue === 100 ? [1, 1.2, 1] : 1,
            rotate: progressValue === 100 ? [0, 10, -10, 0] : 0
          }}
          transition={{ 
            repeat: progressValue === 100 ? Infinity : 0, 
            duration: 1.5 
          }}
        >
          <Check size={20} />
        </motion.div>
      </SaveButton>
    </Container>
  );
};

export default TodayActions;