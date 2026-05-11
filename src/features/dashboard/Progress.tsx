import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ===== Styled компоненты =====

const ProgressCard = styled(motion.div)`
  background: var(--card, #ffffff);
  border-radius: 40px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--border, #e2e8f0);
  width: 100%;
`;

const HeaderSection = styled.div`
  font-family: sans-serif;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--secondary-foreground); 
  }

  p {
    font-size: 14px;
    color: var(--muted-foreground);
    margin: 0;
  }
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// все для тултипа на графике

const TooltipWrapper = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
`;

const TooltipLabel = styled.p`
  color: #1B5E20;
  font-weight: normal;
  margin: 0 0 4px;
`;

const TooltipValue = styled.p`
  color: #4CAF50;
  margin: 0;
`;

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipWrapper>
        <TooltipLabel>{label}</TooltipLabel>
        <TooltipValue>{`co₂: ${payload[0].value} кг`}</TooltipValue>
      </TooltipWrapper>
    );
  }
  return null;
};

// Отключение обводки при фокусе на графике для лучшего UX
const StyledResponsiveContainer = styled(ResponsiveContainer)`
  & :focus {
    outline: none !important;
  }
  .recharts-wrapper:focus {
    outline: none;
  }
`;


const progressData = [
  { month: 'Янв', co2: 24 },
  { month: 'Фев', co2: 40 },
  { month: 'Мар', co2: 35 },
  { month: 'Апр', co2: 46 },
];


export function Progress() {
  return (
    <ProgressCard
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <HeaderSection>
        <div>
          <h2>Динамика прогресса</h2>
          <p>Последние 4 месяца</p>
        </div>
        <IconBox>
          <TrendingUp size={22} color="var(--accent)" />
        </IconBox>
      </HeaderSection>

      <StyledResponsiveContainer width="100%" height={280}>
        <AreaChart data={progressData}>
          <defs>
            <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" domain={[0, 60]} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="co2"
            stroke="#4CAF50"
            strokeWidth={3}
            fill="url(#colorCo2)"
          />
        </AreaChart>
      </StyledResponsiveContainer>
    </ProgressCard>
  );
}

export default Progress;