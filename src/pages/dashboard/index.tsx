import React from 'react';
import styled from '@emotion/styled';
import { EcoImpact } from '../../features/dashboard/EcoImpact';
import { Progress } from '../../features/dashboard/Progress';
import { WeeklyActivity } from '../../features/dashboard/WeekActivity';
import { GrowingTreeAnimation } from '../../features/dashboard/GrowingTreeAnimation';
import { Achievements } from '../../features/dashboard/Achievements';
import { useAppSelector } from '../../store/hooks';
import { calculateMetrics } from '../../features/dashboard/calculateMetrics';
import { selectStreakData, selectVisibleHabits } from '../../features/habits/store/selectors';

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: transparent;
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardPage = () => {
  //  Получаем данные из Redux
  const habits = useAppSelector(state => state.habits.habits);
  const history = useAppSelector(state => state.habits.history);
  const { bestStreak  } = useAppSelector(selectStreakData); // текущая серия

  // Достаем массив только тех привычек, которые активны в профиле
  const visibleHabits = useAppSelector(selectVisibleHabits);

  // Вычисляем все метрики, передавая массив visibleHabits третьим аргументом
  const { metricsCards, monthlyProgress, weeklyActivity, treesPlanted } = calculateMetrics(
    habits, 
    history, 
    visibleHabits
  );

  // Извлекаем числовые значения для ачивок (из metricsCards)
  const waterSaved = parseFloat(metricsCards.find(m => m.title === 'Сэкономлено воды')?.value.replace(/\s/g, '') || '0');
  const co2Saved = parseFloat(metricsCards.find(m => m.title === 'Сокращено CO₂')?.value.replace(',', '.') || '0');

  return (
    <PageContainer>
      <EcoImpact metrics={metricsCards} />
      <ChartsRow>
        <Progress data={monthlyProgress} />
        <WeeklyActivity data={weeklyActivity} maxTicks={visibleHabits.length} />
      </ChartsRow>
      <GrowingTreeAnimation trees={treesPlanted} />
      <Achievements 
        streak={bestStreak }
        waterSaved={waterSaved}
        treesPlanted={treesPlanted}
        co2Saved={co2Saved}
      />
    </PageContainer>
  );
};

export default DashboardPage;