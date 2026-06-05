import * as S from "./DashboardPage.styles";
import { Achievements } from "../../features/dashboard/Achievements";
import { calculateMetrics } from "../../features/dashboard/calculateMetrics";
import { EcoImpact } from "../../features/dashboard/EcoImpact";
import { GrowingTreeAnimation } from "../../features/dashboard/GrowingTreeAnimation";
import { Progress } from "../../features/dashboard/Progress";
import { WeeklyActivity } from "../../features/dashboard/WeekActivity";
import { selectStreakData, selectVisibleHabits } from "../../features/habits/store/selectors";
import { useAppSelector } from "../../store/hooks";

const DashboardPage = () => {
  //  Получаем данные из Redux
  const habits = useAppSelector((state) => state.habits.habits);
  const history = useAppSelector((state) => state.habits.history);
  const { bestStreak } = useAppSelector(selectStreakData); // текущая серия

  // Достаем массив только тех привычек, которые активны в профиле
  const visibleHabits = useAppSelector(selectVisibleHabits);

  // Вычисляем все метрики, передавая массив visibleHabits третьим аргументом
  const { metricsCards, monthlyProgress, weeklyActivity, treesPlanted } = calculateMetrics(
    habits,
    history,
    visibleHabits
  );

  // Извлекаем числовые значения для ачивок (из metricsCards)
  const waterSaved = parseFloat(
    metricsCards.find((m) => m.title === "Сэкономлено воды")?.value.replace(/\s/g, "") ?? "0"
  );
  const co2Saved = parseFloat(
    metricsCards.find((m) => m.title === "Сокращено CO₂")?.value.replace(",", ".") ?? "0"
  );

  return (
    <S.PageContainer>
      <EcoImpact metrics={metricsCards} />
      <S.ChartsRow>
        <Progress data={monthlyProgress} />
        <WeeklyActivity data={weeklyActivity} maxTicks={visibleHabits.length} />
      </S.ChartsRow>
      <GrowingTreeAnimation trees={treesPlanted} />
      <Achievements
        streak={bestStreak}
        waterSaved={waterSaved}
        treesPlanted={treesPlanted}
        co2Saved={co2Saved}
      />
    </S.PageContainer>
  );
};

export default DashboardPage;
