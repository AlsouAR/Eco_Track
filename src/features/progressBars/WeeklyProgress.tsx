"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { useAppSelector } from "../../store/hooks";
// Добавляем импорт селектора видимых привычек
import { selectWeeklyStats, selectVisibleHabits } from "../habits/store/selectors";
import * as S from "./WeeklyProgress.styles";

export const WeeklyProgress: React.FC = () => {
  const visibleHabits = useAppSelector(selectVisibleHabits);
  const totalHabits = visibleHabits.length;

  const stats = useAppSelector(selectWeeklyStats);

  return (
    <S.StatsContainer>
      <S.Header>
        <TrendingUp size={20} color="var(--primary)" />
        <S.Title>Неделя</S.Title>
      </S.Header>

      <div>
        {stats.map((stat, index) => {
          const percentage = totalHabits > 0 ? (stat.completed / totalHabits) * 100 : 0;
          return (
            <S.DayRow key={`${stat.day}-${index}`}>
              <S.DayInfo>
                <S.DayLabel>{stat.day}</S.DayLabel>
                <S.CountLabel>
                  {stat.completed}/{totalHabits}
                </S.CountLabel>
              </S.DayInfo>

              <S.ProgressTrack>
                <S.ProgressBar
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />
              </S.ProgressTrack>
            </S.DayRow>
          );
        })}
      </div>
    </S.StatsContainer>
  );
};

export default WeeklyProgress;
