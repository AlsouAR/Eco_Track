import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import {EcoCalendar} from "../../features/calendar/index";


const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 350px; 
    align-items: stretch;
  }
`;

const FullWidthSection = styled.section`
  width: 100%;
`;

const HomePage = () => {
  return (
    <PageContainer>
      <TopRow>
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <EcoCalendar />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
        >
            <div style={{ background: 'white', borderRadius: '30px', padding: '2rem', border: '1px solid #eee', height: '100%' }}>
                Недельный прогресс
            </div>
        </motion.div>
    </TopRow>

      <FullWidthSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ background: 'white', borderRadius: '30px', padding: '2rem', border: '1px solid #eee' }}>
             Сегодняшние действия (полная ширина)
          </div>
        </motion.div>
      </FullWidthSection>
    </PageContainer>
  );
};

export default HomePage;