import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PriorityHabit {
  id: string;
  name: string;
  completed: boolean;
}

export interface ProfileState {
  priorityHabits: PriorityHabit[];
}

// Загрузка из localStorage
const loadFromLocalStorage = () => {
  if (typeof window === 'undefined') return undefined;
  
  try {
    const saved = localStorage.getItem('eco_profile_habits');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error("Ошибка загрузки привычек", err);
  }
  return undefined;
};

const savedHabits = loadFromLocalStorage();

// Начальные привычки (из вашего habits_slice)
const defaultHabits: PriorityHabit[] = [
  { id: 'plastic', name: 'Отказ от пластика', completed: true },
  { id: 'bike', name: 'Использование велосипеда', completed: true },
  { id: 'water', name: 'Экономия воды', completed: true },
  { id: 'local', name: 'Местные продукты', completed: true },
  { id: 'sort', name: 'Раздельный сбор', completed: true },
];

const initialState: ProfileState = {
  priorityHabits: savedHabits || defaultHabits,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    togglePriorityHabit: (state, action: PayloadAction<string>) => {
      const habitId = action.payload;
      const habit = state.priorityHabits.find(h => h.id === habitId);
      if (habit) {
        habit.completed = !habit.completed;
        // Сохраняем в localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('eco_profile_habits', JSON.stringify(state.priorityHabits));
        }
      }
    },
    resetPriorityHabits: (state) => {
      state.priorityHabits = state.priorityHabits.map(h => ({ ...h, completed: true }));
      if (typeof window !== 'undefined') {
        localStorage.setItem('eco_profile_habits', JSON.stringify(state.priorityHabits));
      }
    },
    // для полного сброса
    resetAllProgress: (state) => {
      state.priorityHabits = state.priorityHabits.map(h => ({ ...h, completed: true }));
      if (typeof window !== 'undefined') {
        localStorage.setItem('eco_profile_habits', JSON.stringify(state.priorityHabits));
      }
    },
  },
});

export const { togglePriorityHabit, resetPriorityHabits, resetAllProgress } = profileSlice.actions;
export default profileSlice.reducer;