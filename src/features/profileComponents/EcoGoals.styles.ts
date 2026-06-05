import styled from "@emotion/styled";

export const EcoGoalsCard = styled.div`
  width: 100%;
  margin: 0;
  padding: 24px 20px 32px;
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

export const GoalsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

export const HeaderIcon = styled.div`
  flex-shrink: 0;
`;

export const HeaderText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const GoalsTitle = styled.h1`
  font-size: 22px;
  font-weight: 650;
  color: #1b5e20;
  margin: 0 0 4px 0;
  line-height: 1.3;
`;

export const GoalsSubtitle = styled.p`
  font-size: 13px;
  color: #6b8c42;
  margin: 0;
  font-weight: 500;
`;

export const TargetActions = styled.div`
  background: #f7faf0;
  padding: 18px 20px;
  border-radius: 28px;
  margin-bottom: 12px;
`;

export const TargetLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TargetLabel = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #1b5e20;
  letter-spacing: -0.2px;
`;

export const TargetValue = styled.span`
  font-size: 32px;
  font-weight: 800;
  color: #4caf50;
  background: #ffffff;
  padding: 4px 14px;
  border-radius: 40px;
  line-height: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0 8px;
`;

export const SliderLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #7b8c6e;
  background: #eff3e6;
  padding: 4px 10px;
  border-radius: 20px;
  min-width: 44px;
  text-align: center;
`;

export const SliderTrack = styled.div`
  flex: 1;
`;

export const EcoSlider = styled.input`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #e8eed9;
  border-radius: 10px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    background: #4caf50;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 2px solid white;
    transition: 0.1s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.18);
    background: #2e7d32;
  }
`;

export const ActionsHint = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 11px;
  font-weight: 500;
  color: #8ba07a;
  letter-spacing: 0.4px;
`;

export const PriorityHabits = styled.div`
  background: #ffffff;
  border-radius: 28px;
  border: 1px solid #eff3e6;
  padding: 6px 0 12px 0;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
`;

export const HabitsTitle = styled.h3`
  font-size: 18px;
  font-weight: 640;
  color: #1b5e20;
  padding: 14px 20px 8px 20px;
  margin: 0;
  border-bottom: 2px solid #eff3e6;
  letter-spacing: -0.2px;
`;

export const HabitsList = styled.div`
  padding: 8px 8px 4px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const HabitItem = styled.label`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: #fcfdf9;
  border-radius: 60px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #edf2e3;

  &:hover {
    background: #f3f8ec;
    border-color: #c8e0b0;
  }
`;

export const HabitCheckbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  background: white;
  border: 2px solid #4caf50;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  &:checked::before {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4caf50;
    font-size: 0.9rem;
    font-weight: 700;
  }
`;

export const HabitName = styled.span`
  font-size: 0.95rem;
`;
