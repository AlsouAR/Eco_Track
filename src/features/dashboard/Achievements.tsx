import { Award } from "lucide-react";
import * as S from "./Achievements.styles";

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
}

interface AchievementsProps {
  streak?: number;
  waterSaved?: number;
  treesPlanted?: number;
  co2Saved?: number;
}

const getAchievements = (
  streak = 0,
  waterSaved = 0,
  treesPlanted = 0,
  co2Saved = 0
): Achievement[] => [
  {
    id: 1,
    title: "Эко-новичок",
    description: "Первые 7 дней",
    unlocked: streak >= 7,
  },
  {
    id: 2,
    title: "Хранитель воды",
    description: "1000л сэкономлено",
    unlocked: waterSaved >= 1000,
  },
  {
    id: 3,
    title: "Зелёный воин",
    description: "30 дней подряд",
    unlocked: streak >= 30,
  },
  {
    id: 4,
    title: "Лидер планеты",
    description: "100 дней подряд",
    unlocked: streak >= 100,
  },
  {
    id: 5,
    title: "Посадил лес",
    description: "50 деревьев",
    unlocked: treesPlanted >= 50,
  },
  {
    id: 6,
    title: "Net Zero",
    description: "100кг CO₂",
    unlocked: co2Saved >= 100,
  },
];

// ==================== Компонент ====================

export function Achievements({
  streak = 0,
  waterSaved = 0,
  treesPlanted = 0,
  co2Saved = 0,
}: AchievementsProps) {
  // Пересчитываем список достижений на основе переданных данных
  const achievements = getAchievements(streak, waterSaved, treesPlanted, co2Saved);

  return (
    <S.AchievementsCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <S.HeaderSection>
        <S.IconBox>
          <Award size={24} color="white" />
        </S.IconBox>
        <div>
          <S.Title>Достижения</S.Title>
          <S.Subtitle>Ваши награды за эко-действия</S.Subtitle>
        </div>
      </S.HeaderSection>

      <S.Grid>
        {achievements.map((achievement, index) => (
          <S.AchievementCardStyled
            key={achievement.id}
            unlocked={achievement.unlocked}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={achievement.unlocked ? { scale: 1.05 } : {}}
          >
            <S.AchievementIconBox unlocked={achievement.unlocked}>
              <Award size={32} color={achievement.unlocked ? "white" : "#9CA3AF"} />
            </S.AchievementIconBox>
            <S.AchievementTitle>{achievement.title}</S.AchievementTitle>
            <S.AchievementDesc>{achievement.description}</S.AchievementDesc>
          </S.AchievementCardStyled>
        ))}
      </S.Grid>
    </S.AchievementsCard>
  );
}
export { getAchievements };
export default Achievements;
