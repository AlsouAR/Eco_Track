import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

// 1. Описываем форму данных
export interface Habit {
  id: string;
  label: string;
  icon: string;
}

export interface HabitsState {
  habits: Habit[];
  history: Record<string, string[]>; 
  selectedDate: string;
  currentDraft: string[];
}

// Вспомогательная функция для загрузки данных из памяти браузера
const loadFromLocalStorage = () => {
  if (typeof window === 'undefined') return undefined;
  
  try {
    const serializedState = localStorage.getItem('eco_track_data');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Не удалось загрузить данные из LocalStorage", err);
    return undefined;
  }
};

const savedData = loadFromLocalStorage();

// 2. Начальное состояние (Initial State)
const initialState: HabitsState = {
  // Если есть сохраненные привычки — берем их, иначе стандартный набор
  habits: savedData?.habits || [
    { id: 'plastic', label: 'Отказ от пластика', icon: 'ShoppingBag' },
    { id: 'bike', label: 'Поездка на велосипеде', icon: 'Bike' },
    { id: 'sort', label: 'Сортировка мусора', icon: 'Recycle' },
    { id: 'water', label: 'Экономия воды', icon: 'Droplet' },
    { id: 'local', label: 'Местные продукты', icon: 'Leaf' },
  ],
  // Загружаем сохраненную историю или пустой объект
  history: savedData?.history || {}, 
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  // Инициализируем черновик сразу для сегодняшней даты
  currentDraft: (savedData?.history && savedData.history[format(new Date(), 'yyyy-MM-dd')]) || [],
};

// 3. Создаем Слайс
export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
      state.currentDraft = state.history[action.payload] || [];
    },

    toggleHabit: (state, action: PayloadAction<string>) => {
      const habitId = action.payload;
      const index = state.currentDraft.indexOf(habitId);
      if (index > -1) {
        state.currentDraft.splice(index, 1);
      } else {
        state.currentDraft.push(habitId);
      }
    },
    saveDay: (state) => {
      state.history[state.selectedDate] = [...state.currentDraft];
    },
    // для сброса
    resetAllProgress: (state) => {
      state.history = {};
      state.currentDraft = [];
      
      if (typeof window !== 'undefined') {
        const savedData = { habits: state.habits, history: {} };
        localStorage.setItem('eco_track_data', JSON.stringify(savedData));
      }
    },
    
  },
});


export const { setSelectedDate, toggleHabit, saveDay, resetAllProgress } = habitsSlice.actions;
export default habitsSlice.reducer;