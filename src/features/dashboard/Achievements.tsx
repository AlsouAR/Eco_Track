import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

// ==================== Styled-компоненты ====================

const AchievementsCard = styled(motion.div)`
  background: var(--card, #ffffff);
  border-radius: 40px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--border, #e2e8f0);
  width: 100%;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #FFA726, #FF9800);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--foreground, #1b5e20);
  margin: 0 0 4px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--muted-foreground, #64748b);
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);   // 6 колонок по умолчанию
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); // планшет
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr); // телефон
  }
`;

interface AchievementCardStyledProps {
  unlocked: boolean;
}

const AchievementCardStyled = styled(motion.div)<AchievementCardStyledProps>`
  text-align: center;
  padding: 24px 16px;
  border-radius: 16px;
  border: 2px solid ${({ unlocked }) => (unlocked ? '#FFA726' : '#E5E7EB')};
  background: ${({ unlocked }) =>
    unlocked
      ? 'linear-gradient(135deg, #FFF9E6, #FFF3D6)'
      : '#F9FAFB'};
  opacity: ${({ unlocked }) => (unlocked ? 1 : 0.5)};
  cursor: ${({ unlocked }) => (unlocked ? 'pointer' : 'default')};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const AchievementIconBox = styled.div<{ unlocked: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ unlocked }) =>
    unlocked
      ? 'linear-gradient(135deg, #FFA726, #FF9800)'
      : '#D1D5DB'};
  margin: 0 auto;
`;

const AchievementTitle = styled.h4`
  font-weight: 700;
  font-size: 14px;
  color: var(--foreground);
  margin: 0;
`;

const AchievementDesc = styled.p`
  font-size: 12px;
  color: var(--muted-foreground);
  margin: 0;
`;

// ==================== Данные ====================

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  { id: 1, title: 'Эко-новичок', description: 'Первые 7 дней\n1000л сэкономлено', unlocked: true },
  { id: 2, title: 'Хранитель воды', description: '1000л сэкономлено', unlocked: true },
  { id: 3, title: 'Зелёный воин', description: '30 дней подряд', unlocked: false },
  { id: 4, title: 'Лидер планеты', description: '100 дней подряд', unlocked: false },
  { id: 5, title: 'Посадил лес', description: '50 деревьев', unlocked: false },
  { id: 6, title: 'Net Zero', description: '100кг CO₂', unlocked: false },
];

// ==================== Компонент ====================

export function Achievements() {
  return (
    <AchievementsCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <HeaderSection>
        <IconBox>
          <Award size={24} color="white" />
        </IconBox>
        <div>
          <Title>Достижения</Title>
          <Subtitle>Ваши награды за эко-действия</Subtitle>
        </div>
      </HeaderSection>

      <Grid>
        {achievements.map((achievement, index) => (
          <AchievementCardStyled
            key={achievement.id}
            unlocked={achievement.unlocked}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={achievement.unlocked ? { scale: 1.05 } : {}}
          >
            <AchievementIconBox unlocked={achievement.unlocked}>
              <Award
                size={32}
                color={achievement.unlocked ? 'white' : '#9CA3AF'}
              />
            </AchievementIconBox>
            <AchievementTitle>{achievement.title}</AchievementTitle>
            <AchievementDesc>{achievement.description}</AchievementDesc>
          </AchievementCardStyled>
        ))}
      </Grid>
    </AchievementsCard>
  );
}

export default Achievements;