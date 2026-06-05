import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/store/authSlice";
import habitsReducer from "../features/habits/store/habitsSlice";
import profileReducer from "../features/profile/store/profileSlice";

import type { Middleware } from "@reduxjs/toolkit";

// 1. Создаем Middleware для сохранения данных
const localStorageMiddleware: Middleware = (storeApi) => (next) => (action: any) => {
  // Сначала даем экшену выполниться, чтобы обновить состояние в Redux
  const result = next(action);

  // 2. Проверяем, был ли это экшен сохранения дня
  // Redux Toolkit создает типы экшенов в формате 'имяСлайса/имяРедюсера'
  if (action.type === "habits/saveDay") {
    const state = storeApi.getState();

    // Подготавливаем данные для записи
    const dataToSave = {
      habits: state.habits.habits,
      history: state.habits.history,
    };

    try {
      localStorage.setItem("eco_track_data", JSON.stringify(dataToSave));
    } catch (e) {
      console.warn("Ошибка при записи в LocalStorage:", e);
    }
  }

  return result;
};

// 3. Конфигурируем стор
export const store = configureStore({
  reducer: {
    habits: habitsReducer,
    auth: authReducer,
    profile: profileReducer,
  },
  // Добавляем прослойку к стандартным
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
