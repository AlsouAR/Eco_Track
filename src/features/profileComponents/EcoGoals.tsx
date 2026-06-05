import { useEffect, useState } from "react";

import { Leaf } from "lucide-react";
import { useDispatch } from "react-redux";

import * as S from "./EcoGoals.styles";
import { useAppSelector } from "../../store/hooks";
import { togglePriorityHabit } from "../profile/store/profileSlice";
import {
  selectMaxWeeklyActions,
  selectPriorityHabits,
  selectTotalWeeklyActions,
  selectWeeklyProgressPercent,
} from "../profile/store/selectors";

// Заголовок
const GoalsHeader = () => {
  return (
    <S.GoalsHeader>
      <S.HeaderIcon>
        <Leaf size={40} strokeWidth={1.5} color="#4CAF50" />
      </S.HeaderIcon>
      <S.HeaderText>
        <S.GoalsTitle>Итоги недели</S.GoalsTitle>
        <S.GoalsSubtitle>Ваши экологические достижения</S.GoalsSubtitle>
      </S.HeaderText>
    </S.GoalsHeader>
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
    <S.TargetActions>
      <S.TargetLabelRow>
        <S.TargetLabel>Действий за неделю</S.TargetLabel>
        <S.TargetValue>
          {totalActions} / {maxActions}
        </S.TargetValue>
      </S.TargetLabelRow>

      <S.SliderContainer>
        <S.SliderLabel>0</S.SliderLabel>
        <S.SliderTrack>
          <S.EcoSlider
            type="range"
            min={0}
            max={maxActions}
            value={sliderValue}
            readOnly
            style={{
              background: `linear-gradient(to right, #4CAF50 ${percentForSlider}%, #E8EED9 ${percentForSlider}%)`,
            }}
          />
        </S.SliderTrack>
        <S.SliderLabel>{maxActions}</S.SliderLabel>
      </S.SliderContainer>

      <S.ActionsHint>
        <span>0 действий</span>
        <span>{percent}% выполнено</span>
        <span>{maxActions} действий</span>
      </S.ActionsHint>
    </S.TargetActions>
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
    <S.PriorityHabits>
      <S.HabitsTitle>Приоритетные привычки</S.HabitsTitle>

      <S.HabitsList>
        {habits.map((habit) => (
          <S.HabitItem key={habit.id}>
            <S.HabitCheckbox
              type="checkbox"
              checked={habit.completed}
              onChange={() => handleToggle(habit.id)}
            />
            <S.HabitName>{habit.name}</S.HabitName>
          </S.HabitItem>
        ))}
      </S.HabitsList>
    </S.PriorityHabits>
  );
};

const EcoGoals = () => {
  return (
    <S.EcoGoalsCard>
      <GoalsHeader />
      <TargetActions />
      <PriorityHabits />
    </S.EcoGoalsCard>
  );
};

export default EcoGoals;
