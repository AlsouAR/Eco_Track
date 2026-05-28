import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './EcoGoals.css';
import { Leaf } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { 
  selectTotalWeeklyActions, 
  selectMaxWeeklyActions, 
  selectWeeklyProgressPercent,
  selectPriorityHabits 
} from '../profile/store/selectors';
import { togglePriorityHabit } from '../profile/store/profile_slice';

// Заголовок 
const GoalsHeader = () => {
  return (
    <div className="goals-header">
      <div className="header-icon">
        <Leaf size={40} strokeWidth={1.5} color="#4CAF50" />
      </div>
      <div className="header-text">
        <h1 className="goals-title">Итоги недели</h1>
        <p className="goals-subtitle">Ваши экологические достижения</p>
      </div>
    </div>
  );
};

//  Ползунок 
const TargetActions = () => {
  const totalActions = useAppSelector(selectTotalWeeklyActions);
  const maxActions = useAppSelector(selectMaxWeeklyActions);
  const percent = useAppSelector(selectWeeklyProgressPercent);
  
  const [sliderValue, setSliderValue] = useState(totalActions);

  useEffect(() => {
    setSliderValue(totalActions);
  }, [totalActions]);

  // Процент 
  const percentForSlider = maxActions > 0 ? (sliderValue / maxActions) * 100 : 0;

  return (
    <div className="target-actions">
      <div className="target-label-row">
        <span className="target-label">Действий за неделю</span>
        <span className="target-value">{totalActions} / {maxActions}</span>
      </div>
      
      <div className="slider-container">
        <span className="slider-min">0</span>
        <div className="slider-track">
          <input
            type="range"
            min={0}
            max={maxActions}
            value={sliderValue}
            readOnly
            className="eco-slider"
            style={{
              background: `linear-gradient(to right, #4CAF50 ${percentForSlider}%, #E8EED9 ${percentForSlider}%)`
            }}
          />
        </div>
        <span className="slider-max">{maxActions}</span>
      </div>
      
      <div className="actions-hint">
        <span>0 действий</span>
        <span>{percent}% выполнено</span>
        <span>{maxActions} действий</span>
      </div>
    </div>
  );
};

//  Приоритетные привычки 
const PriorityHabits = () => {
  const dispatch = useDispatch();
  const habits = useAppSelector(selectPriorityHabits);

  const handleToggle = (habitId: string) => {
    dispatch(togglePriorityHabit(habitId));
  };

  return (
    <div className="priority-habits">
      <h3 className="habits-title">Приоритетные привычки</h3>
      
      <div className="habits-list">
        {habits.map((habit) => (
          <label key={habit.id} className="habit-item">
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => handleToggle(habit.id)}
              className="habit-checkbox"
            />
            <span className="habit-name">
              {habit.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// ==================== ОСНОВНОЙ КОМПОНЕНТ ====================
const EcoGoals = () => {
  return (
    <div className="eco-goals-card">
      <GoalsHeader />
      <TargetActions />
      <PriorityHabits />
    </div>
  );
};

export default EcoGoals;