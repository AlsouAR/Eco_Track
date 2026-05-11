import React from 'react';
import styled from '@emotion/styled';
import { EcoImpact } from '../../features/dashboard/EcoImpact';
import { Progress } from '../../features/dashboard/Progress';
import { WeeklyActivity } from '../../features/dashboard/WeekActivity';
import { GrowingTreeAnimation } from '../../features/dashboard/GrowingTreeAnimation';
import { Achievements } from '../../features/dashboard/Achievements';

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
  grid-template-columns: 1fr 1fr;   /* две равные колонки */
  gap: 2rem;

  /* На экранах уже 1024px (планшеты и меньше) — всё в колонку */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardPage = () => {
  return (
    <PageContainer>
      <EcoImpact />
      <ChartsRow>
        <Progress />
        <WeeklyActivity />
      </ChartsRow>
      <GrowingTreeAnimation />
      <Achievements />
    </PageContainer>
  );
};

export default DashboardPage;