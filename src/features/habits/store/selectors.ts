import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { subDays, format, startOfDay, parseISO, startOfToday, isSameDay, addDays } from "date-fns";
import { ru } from "date-fns/locale";
import { getAchievements } from '../../../features/dashboard/Achievements';
import { calculateMetrics } from '../../../features/dashboard/calculateMetrics';

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
// 5. Селектор для эко-уровня
export const selectHighestAchievement = createSelector(
  [selectHabitState, selectStreakData],
  (habitsState, streakData) => {
    const { habits, history } = habitsState;
    const metrics = calculateMetrics(habits, history, habits);
    
    const waterSaved = parseFloat(metrics.metricsCards.find(m => m.title === 'Сэкономлено воды')?.value.replace(/\s/g, '') || '0');
    const co2Saved = parseFloat(metrics.metricsCards.find(m => m.title === 'Сокращено CO₂')?.value.replace(/\s/g, '') || '0');
    const treesPlanted = metrics.treesPlanted;
    const { currentStreak } = streakData;
    
    const achievements = getAchievements(currentStreak, waterSaved, treesPlanted, co2Saved);
    
    // Находим самое высокое разблокированное достижение (с максимальным id)
    const highestUnlocked = achievements
      .filter(a => a.unlocked)
      .sort((a, b) => b.id - a.id)[0];
    
    if (highestUnlocked) {
      return {
        title: highestUnlocked.title,
        description: highestUnlocked.description,
        id: highestUnlocked.id
      };
    }
    return { title: 'Начинающий', description: 'Сделайте первый шаг', id: 0 };
  }
);

// 6. Селектор для статистики за текущий месяц
export const selectMonthlyStats = createSelector(
  [selectHabitState, selectVisibleHabits],
  (habitsState, visibleHabits) => {
    const { history } = habitsState;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    const monthDays = Object.keys(history).filter(dateKey => {
      if (!dateKey) return false;
      const parts = dateKey.split('-');
      if (parts.length < 2) return false;
      
      const year = parts[0];
      const month = parts[1];
      
      if (!year || !month) return false;
      
      return parseInt(year, 10) === currentYear && parseInt(month, 10) - 1 === currentMonth;
    });
    
    let totalActions = 0;
    let bestStreakInMonth = 0;
    let currentStreakInMonth = 0;
    let maxActionsInDay = 0;
    let habitFrequency: Record<string, number> = {};
    
    // Сортируем дни по возрастанию
    const sortedDays = [...monthDays].sort();
    
    // Проходим по дням месяца для расчёта серии
    for (const dateKey of sortedDays) {
      if (!dateKey) continue; // Защита от undefined
      
      const dayHabits = history[dateKey] || [];
      
      // Фильтруем только видимые привычки
      const visibleHabitsCount = dayHabits.filter(id => 
        visibleHabits.some(vh => vh.id === id)
      ).length;
      
      totalActions += visibleHabitsCount;
      
      if (visibleHabitsCount > maxActionsInDay) {
        maxActionsInDay = visibleHabitsCount;
      }
      
      // Подсчёт частоты привычек
      dayHabits.forEach(habitId => {
        if (visibleHabits.some(vh => vh.id === habitId)) {
          habitFrequency[habitId] = (habitFrequency[habitId] || 0) + 1;
        }
      });
      
      // Расчёт серии
      if (visibleHabitsCount > 0) {
        currentStreakInMonth++;
        bestStreakInMonth = Math.max(bestStreakInMonth, currentStreakInMonth);
      } else {
        currentStreakInMonth = 0;
      }
    }
    
    // Находим самую частую привычку
    let mostFrequentHabit: string | null = null;
    let maxCount = 0;
    for (const [habitId, count] of Object.entries(habitFrequency)) {
      if (count > maxCount) {
        maxCount = count;
        const habit = visibleHabits.find(h => h.id === habitId);
        mostFrequentHabit = habit ? habit.label : habitId;
      }
    }
    
    // Метрики за месяц
    let waterCountMonth = 0;
    let bikeCountMonth = 0;
    let sortCountMonth = 0;
    let plasticCountMonth = 0;
    
    for (const dateKey of monthDays) {
      if (!dateKey) continue;
      
      const dayHabits = history[dateKey] || [];
      if (dayHabits.includes('water')) waterCountMonth++;
      if (dayHabits.includes('bike')) bikeCountMonth++;
      if (dayHabits.includes('sort')) sortCountMonth++;
      if (dayHabits.includes('plastic')) plasticCountMonth++;
    }
    
    const COEFFICIENTS = { water: 50, bike: 2.5, sort: 0.04, plastic: 3 };
    
    // Подсчёт активных дней
    let activeDaysCount = 0;
    for (const dateKey of monthDays) {
      if (!dateKey) continue;
      const habits = history[dateKey];
      if (habits && habits.length > 0) {
        activeDaysCount++;
      }
    }
    
    return {
      month: now.toLocaleString('ru-RU', { month: 'long', year: 'numeric' }),
      daysActive: activeDaysCount,
      totalActions,
      bestStreak: bestStreakInMonth,
      maxActionsInDay,
      mostFrequentHabit,
      waterSaved: waterCountMonth * COEFFICIENTS.water,
      co2Reduced: bikeCountMonth * COEFFICIENTS.bike,
      treesPlanted: sortCountMonth * COEFFICIENTS.sort,
      energySaved: plasticCountMonth * COEFFICIENTS.plastic,
    };
  }
);