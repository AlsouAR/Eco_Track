import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { subDays, format, startOfDay, parseISO, startOfToday, isSameDay, addDays } from "date-fns";
import { ru } from "date-fns/locale";

const selectHabitState = (state: RootState) => state.habits;

// 1. Селектор для недельной статистики
export const selectWeeklyStats = createSelector(
  [selectHabitState],
  (habitsState) => {
    const { history, selectedDate, currentDraft } = habitsState;
    const baseDate = startOfDay(parseISO(selectedDate));
    
    return Array.from({ length: 7 }).map((_, index) => {
      const date = subDays(baseDate, 6 - index);
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayName = format(date, 'EEEEEE', { locale: ru }).toUpperCase();
      
      const isSelected = dateKey === selectedDate;
      // Добавили ?. и ?? 0 для защиты от undefined
      const completedCount = isSelected 
        ? currentDraft.length 
        : (history[dateKey]?.length ?? 0);
      
      return {
        day: dayName,
        completed: completedCount,
        dateKey
      };
    }).reverse();
  }
);

// 2. Селектор для расчета серий (Streaks)
export const selectStreakData = createSelector(
  [selectHabitState],
  (habitsState) => {
    const { history } = habitsState;
    const today = startOfToday();
    
    let currentStreak = 0;
    let bestStreak = 0;

    // --- Расчет текущей серии ---
    let checkDate = today;
    const todayKey = format(today, 'yyyy-MM-dd');
    
    // Если за сегодня еще нет записей, начинаем проверку со вчера
    if ((history[todayKey]?.length ?? 0) === 0) {
      checkDate = subDays(today, 1);
    }

    while (true) {
      const dateKey = format(checkDate, 'yyyy-MM-dd');
      if ((history[dateKey]?.length ?? 0) > 0) {
        currentStreak++;
        checkDate = subDays(checkDate, 1);
      } else {
        break;
      }
    }

    // --- Расчет лучшей серии ---
    // Фильтруем только дни с активностью и сортируем их
    const datesWithActivity = Object.keys(history)
      .filter(key => (history[key]?.length ?? 0) > 0)
      .sort();

    if (datesWithActivity.length > 0) {
      let longest = 0;
      let currentLength = 1;

      for (let i = 1; i < datesWithActivity.length; i++) {
        // Извлекаем значения в переменные
        const prevStr = datesWithActivity[i - 1];
        const currStr = datesWithActivity[i];

        if (!prevStr || !currStr) continue;

        const prevDate = startOfDay(parseISO(prevStr));
        const currDate = startOfDay(parseISO(currStr));
        
        if (isSameDay(currDate, addDays(prevDate, 1))) {
          currentLength++;
        } else {
          longest = Math.max(longest, currentLength);
          currentLength = 1;
        }
      }
      // Финальное сравнение
      bestStreak = Math.max(longest, currentLength, currentStreak);
    }

    return {
      currentStreak,
      bestStreak: bestStreak || currentStreak
    };
  }
);

// 3. Селектор для общего прогресса (в %)
export const selectDayProgress = createSelector(
  [selectHabitState],
  (habitsState) => {
    const { habits, currentDraft } = habitsState;
    if (habits.length === 0) return 0;
    return Math.round((currentDraft.length / habits.length) * 100);
  }
);