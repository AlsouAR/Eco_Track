import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { WeeklyProgress } from "../../features/progress_bars/weekly_progress";
import { EcoCalendar } from "../../features/calendar/index";
import { QuickStats } from "../../features/statistics/quick_stats";
import { TodayActions } from "../../features/habits/habit_list";

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 350px; 
    align-items: start;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;


const HomePage = () => {
  return (
    <PageContainer>
      <MainGrid>
        <LeftColumn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <EcoCalendar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >

            <TodayActions/>
          </motion.div>
        </LeftColumn>

        <RightColumn>
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
            <QuickStats/>
          </motion.div>
        </RightColumn>
      </MainGrid>
    </PageContainer>
  );
};

export default HomePage;