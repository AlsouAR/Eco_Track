import { RootState } from '../../../store';
import { createSelector } from '@reduxjs/toolkit';
import { selectWeeklyStats } from '../../habits/store/selectors';

const selectProfileState = (state: RootState) => state.profile;

export const selectPriorityHabits = createSelector(
  [selectProfileState],
  (profile) => profile.priorityHabits
);

export const selectTotalWeeklyActions = createSelector(
  [selectWeeklyStats],
  (weeklyStats) => {
    return weeklyStats.reduce((sum, day) => sum + day.completed, 0);
  }
);

export const selectMaxWeeklyActions = createSelector(
  [(state: RootState) => state.habits.habits],
  (habits) => habits.length * 7 
);

export const selectWeeklyProgressPercent = createSelector(
  [selectTotalWeeklyActions, selectMaxWeeklyActions],
  (total, max) => {
    if (max === 0) return 0;
    return Math.min(100, Math.round((total / max) * 100));
  }
);