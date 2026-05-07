import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import {EcoImpact} from '../../features/dashboard/EcoImpact';
import {Progress} from '../../features/dashboard/Progress';
import {WeeklyActivity} from '../../features/dashboard/WeekActivity';
import {MetricCard} from '../../features/dashboard/MetricCard';

// import {EcoCalendar} from "../../features/calendar/index";
const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DashboardPage = () => {
    return (
        <PageContainer>
            <EcoImpact />
            <Progress />
            <WeeklyActivity />
            <MetricCard />
        </PageContainer>
    );
};

export default DashboardPage;