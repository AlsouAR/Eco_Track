import { WeeklyProgress } from "../../features/progressBars/WeeklyProgress";
import { EcoCalendar } from "../../features/calendar/EcoCalendar";
import { QuickStats } from "../../features/statistics/QuickStats";
import { TodayActions } from "../../features/habits/HabitList";
import { motion } from "framer-motion";
import * as S from "./HomePage.styles";

const HomePage = () => {
  return (
    <S.PageContainer>
      <S.MainGrid>
        <S.LeftColumn>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <EcoCalendar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TodayActions />
          </motion.div>
        </S.LeftColumn>

        <S.RightColumn>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <WeeklyProgress />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <QuickStats />
          </motion.div>
        </S.RightColumn>
      </S.MainGrid>
    </S.PageContainer>
  );
};

export default HomePage;
