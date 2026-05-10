import React, { useState } from 'react';
import './EcoGoals.css';
import { Leaf } from 'lucide-react';

interface Habit {
  id: number;
  name: string;
  completed: boolean;
}
interface TargetActionsProps {
  targetCount: number;
  onTargetChange: (value: number) => void;
  minTarget?: number;
  maxTarget?: number;
}
interface PriorityHabitsProps {
  habits: Habit[];
  onToggleHabit: (id: number) => void;
}

// ==================== КОМПОНЕНТ 1: Заголовок с иконкой ====================
const GoalsHeader = () => {
  return (
    <div className="goals-header">
      <div className="header-icon">
        <Leaf size={40} strokeWidth={1.5} color="#4CAF50" />
      </div>
      <div className="header-text">
        <h1 className="goals-title">Цели на неделю</h1>
        <p className="goals-subtitle">Настройте свои экологические задачи</p>
      </div>
    </div>
  );
};

// ==================== КОМПОНЕНТ 2: Целевое количество действий ====================
const TargetActions = ({ 
  targetCount, 
  onTargetChange, 
  minTarget = 0, 
  maxTarget = 35 
}: TargetActionsProps) => {
  // Вычисляем процент для стилизации ползунка
  const percent = ((targetCount - minTarget) / (maxTarget - minTarget)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTargetChange(Number(e.target.value));
  };

  return (
    <div className="target-actions">
      <div className="target-label-row">
        <span className="target-label">Целевое количество действий в неделю</span>
        <span className="target-value">{targetCount}</span>
      </div>
      
      <div className="slider-container">
        <span className="slider-min">{minTarget}</span>
        <div className="slider-track">
          <input
            type="range"
            min={minTarget}
            max={maxTarget}
            value={targetCount}
            onChange={handleChange}
            className="eco-slider"
            style={{
              background: `linear-gradient(to right, #4CAF50 ${percent}%, #E8EED9 ${percent}%)`
            }}
          />
        </div>
        <span className="slider-max">{maxTarget}</span>
      </div>
      
      <div className="actions-hint">
        <span>{minTarget} действий</span>
        <span>{maxTarget} действий</span>
      </div>
    </div>
  );
};

// ==================== КОМПОНЕНТ 3: Приоритетные привычки ====================
const PriorityHabits = ({ habits, onToggleHabit }: PriorityHabitsProps) => {
  return (
    <div className="priority-habits">
      <h3 className="habits-title">Приоритетные привычки</h3>
      <div className="habits-list">
        {habits.map((habit) => (
          <label key={habit.id} className="habit-item">
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => onToggleHabit(habit.id)}
              className="habit-checkbox"
            />
            <span className="habit-name">{habit.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// ==================== ОСНОВНОЙ КОМПОНЕНТ (собирает всё вместе) ====================
const EcoGoals = () => {
  // Состояния
  const [targetCount, setTargetCount] = useState<number>(27);
  
  // Массив привычек — варианты выбора подтягиваются из массива
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Отказ от пластика', completed: true },
    { id: 2, name: 'Использование велосипеда', completed: true },
    { id: 3, name: 'Экономия воды', completed: true },
    { id: 4, name: 'Местные продукты', completed: true },
    { id: 5, name: 'Раздельный сбор', completed: true },
  ]);

  // Обработчик переключения чекбокса
  const handleToggleHabit = (habitId: number) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === habitId
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  return (
    <div className="eco-goals-card">
      {/* Компонент 1: Заголовок */}
      <GoalsHeader />
      
      {/* Компонент 2: Целевое количество действий + зелёный движок */}
      <TargetActions
        targetCount={targetCount}
        onTargetChange={setTargetCount}
        minTarget={0}
        maxTarget={35}
      />
      
      {/* Компонент 3: Приоритетные привычки */}
      <PriorityHabits
        habits={habits}
        onToggleHabit={handleToggleHabit}
      />
      
    </div>
  );
};

export default EcoGoals;