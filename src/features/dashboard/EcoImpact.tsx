import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { MetricCard } from "./MetricCard";
import { Droplet, Leaf, Recycle, Zap, TreeDeciduous } from "lucide-react";

const HeaderSection = styled.div`
  align-items: center;
  text-align: center;
  gap: 16px;
  margin-bottom: 32px;

  .text-container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-family: sans-serif;
    font-size: 35px;
    font-weight: 700;
    color: #1b5e20;
    text-align: center;
    margin: 0;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1b5e20;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: var(--muted-foreground);
    margin: 0;
  }
`;

const MetricsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 колонки по умолчанию */
  gap: 24px;

  /* Планшет: 2 колонки */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Телефон: 1 колонка */
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// ==================== Вспомогательные данные ====================
// Соответствие iconId (из calculateMetrics) → компонент иконки
const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  water: Droplet,
  bike: Leaf,
  sort: Recycle,
  plastic: Zap,
  trees: TreeDeciduous,
  // для дефолтной карточки "Посажено деревьев" может использоваться TreeDeciduous,
  // но теперь иконка берётся из iconMap по iconId (sort -> Recycle). TreeDeciduous оставим для совместимости.
};

// Статический массив для случая, когда пропс metrics не передан
const defaultMetrics = [
  {
    title: "Сэкономлено воды",
    value: "1,250",
    unit: "литров",
    iconId: "water",
    color: "#4FC3F7",
    description: "Это как 8 дней душа по 5 минут",
  },
  {
    title: "Сокращено CO₂",
    value: "45.8",
    unit: "кг",
    iconId: "bike",
    color: "#4CAF50",
    description: "Эквивалент 120 км на авто",
  },
  {
    title: "Сохранено деревьев",
    value: "12",
    unit: "эквивалентов",
    iconId: "sort",
    color: "#66BB6A",
    description: "Ваш вклад в чистый воздух",
  },
  {
    title: "Энергия сэкономлена",
    value: "340",
    unit: "кВт·ч",
    iconId: "plastic",
    color: "#FFA726",
    description: "Хватит на неделю работы ноутбука",
  },
];

// ==================== Типы для пропсов ====================
interface MetricItem {
  title: string;
  value: string;
  unit: string;
  description: string;
  iconId: string; // ключ для iconMap
  color: string;
}

interface EcoImpactProps {
  metrics?: MetricItem[];
}

// ==================== Компонент ====================
export function EcoImpact({ metrics }: EcoImpactProps) {
  // Если данные переданы из DashboardPage, используем их, иначе – дефолтные
  const metricsData: MetricItem[] = metrics || defaultMetrics;

  return (
    <>
      <HeaderSection>
        <div>
          <h1>Ваш экологический вклад</h1>
          <p>Визуализация вашего влияния на планету</p>
        </div>
      </HeaderSection>
      <MetricsGrid initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {metricsData.map((item) => {
          // Выбираем иконку по iconId, если нет – используем Leaf (запасной вариант)
          const IconComponent = iconMap[item.iconId] || Leaf;
          return (
            <MetricCard
              key={item.title}
              title={item.title}
              value={item.value}
              unit={item.unit}
              icon={IconComponent}
              color={item.color}
              description={item.description}
            />
          );
        })}
      </MetricsGrid>
    </>
  );
}

export default EcoImpact;
