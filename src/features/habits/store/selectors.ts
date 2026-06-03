import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { subDays, format, startOfDay, parseISO, startOfToday, isSameDay, addDays } from "date-fns";
import { ru } from "date-fns/locale";

const selectHabitState = (state: RootState) => state.habits;
// Селектор для получения списка настроек отображения из профиля
const selectProfilePriorityHabits = (state: RootState) => state.profile.priorityHabits;

// НОВЫЙ СЕЛЕКТОР: Отдает только те привычки, у которых в профиле стоит чекбокс
export const selectVisibleHabits = createSelector(
  [selectHabitState, selectProfilePriorityHabits],
  (habitsState, profileHabits) => {
    // Находим ID тех привычек, которые активны в профиле (completed === true)
    const activeIds = profileHabits.filter(h => h.completed).map(h => h.id);
    // Возвращаем из глобального списка привычек только выбранные пользователем
    return habitsState.habits.filter(habit => activeIds.includes(habit.id));
  }
);

// 1. Селектор для недельной статистики
export const selectWeeklyStats = createSelector(
  [selectHabitState, selectVisibleHabits],
  (habitsState, visibleHabits) => {
    const { history, selectedDate, currentDraft } = habitsState;
    const baseDate = startOfDay(parseISO(selectedDate));
    
    return Array.from({ length: 7 }).map((_, index) => {
      const date = subDays(baseDate, 6 - index);
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayName = format(date, 'EEEEEE', { locale: ru }).toUpperCase();
      
      const isSelected = dateKey === selectedDate;
      
      // Для выбранного дня берем длину черновика, но фильтруем только те, 
      // которые сейчас активны в профиле (чтобы не перегружать интерфейс старыми скрытыми данными)
      const completedCount = isSelected 
        ? currentDraft.filter(id => visibleHabits.some(vh => vh.id === id)).length 
        : (history[dateKey]?.filter(id => visibleHabits.some(vh => vh.id === id)).length ?? 0);
      
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

    let checkDate = today;
    const todayKey = format(today, 'yyyy-MM-dd');
    
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

    const datesWithActivity = Object.keys(history)
      .filter(key => (history[key]?.length ?? 0) > 0)
      .sort();

    if (datesWithActivity.length > 0) {
      let longest = 0;
      let currentLength = 1;

      for (let i = 1; i < datesWithActivity.length; i++) {
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
      bestStreak = Math.max(longest, currentLength, currentStreak);
    }

    return {
      currentStreak,
      bestStreak: bestStreak || currentStreak
    };
  }
);


// 3. Селектор для общего прогресса (в %) — ТЕПЕРЬ СЧИТАЕТ ОТ КОЛИЧЕСТВА ВЫБРАННЫХ ПРИВЫЧЕК
export const selectDayProgress = createSelector(
  [selectVisibleHabits, selectHabitState],
  (visibleHabits, habitsState) => {
    const { currentDraft } = habitsState;
    if (visibleHabits.length === 0) return 0;
    
    // Считаем только те выполненные привычки, которые сейчас отображаются на экране
    const visibleCompletedCount = currentDraft.filter(id => 
      visibleHabits.some(vh => vh.id === id)
    ).length;

    return Math.round((visibleCompletedCount / visibleHabits.length) * 100);
  }
);

// 4. Селектор для общего количества дней с активностью (всего дней)
export const selectTotalActiveDays = createSelector(
  [selectHabitState],
  (habitsState) => {
    const { history } = habitsState;
    
    const totalDays = Object.keys(history).filter(key => {
      const completions = history[key];
      return completions && completions.length > 0;
    }).length;
    
    return totalDays;
  }
);