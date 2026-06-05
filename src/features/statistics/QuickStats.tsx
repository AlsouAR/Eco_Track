"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";
import { useAppSelector } from "../../store/hooks";
import { selectStreakData } from "../habits/store/selectors";
import * as S from "./QuickStats.styles";

export const QuickStats: React.FC = () => {
  const { currentStreak, bestStreak } = useAppSelector(selectStreakData);

  return (
    <S.StatsCard
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <S.IconWrapper>
        <Leaf />
      </S.IconWrapper>

      <S.CurrentValue>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentStreak}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: "inline-block" }}
          >
            {currentStreak}
          </motion.span>
        </AnimatePresence>
      </S.CurrentValue>

      <S.Label>{getDaysLabel(currentStreak)} подряд</S.Label>

      <S.Footer>
        <S.BestStreakLabel>Лучшая серия</S.BestStreakLabel>
        <S.BestStreakValue>
          <motion.span
            key={bestStreak}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {bestStreak} {getDaysLabel(bestStreak)}
          </motion.span>
        </S.BestStreakValue>
      </S.Footer>
    </S.StatsCard>
  );
};

const getDaysLabel = (days: number) => {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "дней";
  }
  if (lastDigit === 1) {
    return "день";
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return "дня";
  }
  return "дней";
};

export default QuickStats;
