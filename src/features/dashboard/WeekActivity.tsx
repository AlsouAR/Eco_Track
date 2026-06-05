import React from "react";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import * as S from "./WeekActivity.styles";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active === true && payload != null && payload.length > 0) {
    return (
      <S.TooltipWrapper>
        <S.TooltipLabel>{label}</S.TooltipLabel>
        <S.TooltipValue>{`value: ${payload[0].value}`}</S.TooltipValue>
      </S.TooltipWrapper>
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
    <S.ActivityCard
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <S.HeaderSection>
        <h2>Активность за неделю</h2>
      </S.HeaderSection>

      <S.StyledResponsiveContainer width="100%" height={280}>
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
      </S.StyledResponsiveContainer>
    </S.ActivityCard>
  );
}

export default WeeklyActivity;
