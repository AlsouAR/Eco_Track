import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ActivityCard = styled(motion.div)`
  background: var(--card, #ffffff);
  border-radius: 40px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--border, #e2e8f0);
  width: 100%;
`;

const HeaderSection = styled.div`
  margin-bottom: 24px;
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1b5e20;
    margin: 0;
  }
`;

// все для тултипа на графике

const TooltipWrapper = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
`;
// День недели на графике
const TooltipLabel = styled.p`
  color: #1b5e20;
  font-weight: normal;
  margin: 0 0 4px;
`;
// значения при наведении на столбец
const TooltipValue = styled.p`
  color: #4caf50;
  margin: 0;
`;
// Отключение обводки при фокусе на графике для лучшего UX
const StyledResponsiveContainer = styled(ResponsiveContainer)`
  & :focus {
    outline: none !important;
  }
  .recharts-wrapper:focus {
    outline: none;
  }
`;

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active === true && payload != null && payload.length > 0) {
    return (
      <TooltipWrapper>
        <TooltipLabel>{label}</TooltipLabel>
        <TooltipValue>{`value: ${payload[0].value}`}</TooltipValue>
      </TooltipWrapper>
    );
  }
  return null;
};

// Статический массив по умолчанию – используется, если пропс data не передан
const defaultWeeklyData = [
  { day: "ПН", value: 85 },
  { day: "ВТ", value: 92 },
  { day: "СР", value: 78 },
  { day: "ЧТ", value: 95 },
  { day: "ПТ", value: 88 },
  { day: "СБ", value: 70 },
  { day: "ВС", value: 65 },
];

interface WeeklyActivityProps {
  data?: { day: string; value: number }[];
  maxTicks?: number;
}

export function WeeklyActivity({ data, maxTicks }: WeeklyActivityProps) {
  const weeklyData = data ?? defaultWeeklyData;

  const yAxisMax = maxTicks != null && maxTicks > 0 ? maxTicks : 5;

  return (
    <ActivityCard
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <HeaderSection>
        <h2>Активность за неделю</h2>
      </HeaderSection>

      <StyledResponsiveContainer width="100%" height={280}>
        <BarChart data={weeklyData}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#66BB6A" />
            </linearGradient>
          </defs>
          {/* Сетка и оси */}
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis dataKey="day" stroke="#888" />
          <YAxis stroke="#888" domain={[0, yAxisMax]} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="url(#barGradient)" radius={[12, 12, 0, 0]} />
        </BarChart>
      </StyledResponsiveContainer>
    </ActivityCard>
  );
}

export default WeeklyActivity;
