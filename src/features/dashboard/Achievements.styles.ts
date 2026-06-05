import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const AchievementsCard = styled(motion.div)`
  background: var(--card, #ffffff);
  border-radius: 40px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--border, #e2e8f0);
  width: 100%;
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

export const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffa726, #ff9800);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--foreground, #1b5e20);
  margin: 0 0 4px 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: var(--muted-foreground, #64748b);
  margin: 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface AchievementCardStyledProps {
  unlocked: boolean;
}

export const AchievementCardStyled = styled(motion.div)<AchievementCardStyledProps>`
  text-align: center;
  padding: 24px 16px;
  border-radius: 16px;
  border: 2px solid ${({ unlocked }) => (unlocked ? "#FFA726" : "#E5E7EB")};
  background: ${({ unlocked }) =>
    unlocked ? "linear-gradient(135deg, #FFF9E6, #FFF3D6)" : "#F9FAFB"};
  opacity: ${({ unlocked }) => (unlocked ? 1 : 0.5)};
  cursor: ${({ unlocked }) => (unlocked ? "pointer" : "default")};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const AchievementIconBox = styled.div<{ unlocked: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ unlocked }) =>
    unlocked ? "linear-gradient(135deg, #FFA726, #FF9800)" : "#D1D5DB"};
  margin: 0 auto;
`;

export const AchievementTitle = styled.h4`
  font-weight: 700;
  font-size: 14px;
  color: var(--foreground);
  margin: 0;
`;

export const AchievementDesc = styled.p`
  font-size: 12px;
  color: var(--muted-foreground);
  margin: 0;
`;