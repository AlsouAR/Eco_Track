import React from "react";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import * as S from "./Progress.styles";

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
        <S.TooltipValue>{`co₂: ${payload[0].value} кг`}</S.TooltipValue>
      </S.TooltipWrapper>
    );
  }
  return null;
};

// Статический массив

const staticProgressData = [
  { month: "Янв", co2: 24 },
  { month: "Фев", co2: 40 },
  { month: "Мар", co2: 35 },
  { month: "Апр", co2: 46 },
];

// Интерфейс пропсов

interface ProgressProps {
  data?: { month: string; value: number }[];
}

// Компонент

export function Progress({ data }: ProgressProps) {
  // Преобразуем переданные данные в формат, ожидаемый графиком (поле co2)
  const chartData = data
    ? data.map((item) => ({ month: item.month, co2: item.value }))
    : staticProgressData;

  // Максимальное значение для оси Y: либо из данных, либо 60
  const maxY = Math.max(60, ...chartData.map((d) => d.co2));

  return (
    <S.ProgressCard
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <S.HeaderSection>
        <div>
          <h2>Динамика прогресса</h2>
          <p>Последние 4 месяца</p>
        </div>
        <S.IconBox>
          <TrendingUp size={22} color="var(--accent)" />
        </S.IconBox>
      </S.HeaderSection>

      <S.StyledResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" domain={[0, maxY]} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="co2"
            stroke="#4CAF50"
            strokeWidth={3}
            fill="url(#colorCo2)"
          />
        </AreaChart>
      </S.StyledResponsiveContainer>
    </S.ProgressCard>
  );
}

export default Progress;
