"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag, Bike, Recycle, Droplet, Leaf } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox/checkbox";
import { Progress } from "../../components/ui/progress/progress";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { toggleHabit, saveDay } from "./store/habitsSlice";
import { selectVisibleHabits } from "./store/selectors";

import * as S from "./HabitList.styles";

const IconMap: Record<string, any> = {
  ShoppingBag,
  Bike,
  Recycle,
  Droplet,
  Leaf,
};

export const TodayActions: React.FC = () => {
  const dispatch = useAppDispatch();

  // Получаем только видимые (выбранные в профиле) привычки через селектор
  const visibleHabits = useAppSelector(selectVisibleHabits);

  const { currentDraft, history, selectedDate } = useAppSelector((state) => state.habits);

  const hasChanges = JSON.stringify(currentDraft) !== JSON.stringify(history[selectedDate] ?? []);

  const currentHabits = visibleHabits.map((habit) => ({
    ...habit,
    completed: currentDraft.includes(habit.id),
    iconComponent: IconMap[habit.icon] ?? Leaf,
  }));

  const completedCount = currentHabits.filter((h) => h.completed).length;
  const progressValue =
    currentHabits.length > 0 ? (completedCount / currentHabits.length) * 100 : 0;

  const handleToggle = (id: string) => {
    dispatch(toggleHabit(id));
  };

  return (
    <S.Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <S.Title>Сегодняшние действия</S.Title>

      <S.List>
        {currentHabits.map((habit, index) => {
          const Icon = habit.iconComponent;
          return (
            <S.HabitCard
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

              <S.IconBox $isCompleted={habit.completed}>
                <Icon />
              </S.IconBox>

              <S.HabitLabel $isCompleted={habit.completed}>{habit.label}</S.HabitLabel>

              <AnimatePresence>
                {habit.completed && (
                  <S.CheckBadge
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check />
                  </S.CheckBadge>
                )}
              </AnimatePresence>
            </S.HabitCard>
          );
        })}
      </S.List>

      <S.Footer>
        <S.ProgressInfo>
          <span className="label">Дневная цель</span>
          <span className="count">
            {completedCount} / {currentHabits.length}
          </span>
        </S.ProgressInfo>
        <Progress value={progressValue} />
      </S.Footer>

      <S.SaveButton
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
            rotate: progressValue === 100 ? [0, 10, -10, 0] : 0,
          }}
          transition={{
            repeat: progressValue === 100 ? Infinity : 0,
            duration: 1.5,
          }}
        >
          <Check size={20} />
        </motion.div>
      </S.SaveButton>
    </S.Container>
  );
};

export default TodayActions;
