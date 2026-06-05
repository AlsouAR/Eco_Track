import React from "react";

import { Droplet, Leaf, Recycle, TreeDeciduous, Zap } from "lucide-react";

import * as S from "./EcoImpact.styles";
import { MetricCard } from "./MetricCard";

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
      <S.HeaderSection>
        <div>
          <h1>Ваш экологический вклад</h1>
          <p>Визуализация вашего влияния на планету</p>
        </div>
      </S.HeaderSection>
      <S.MetricsGrid initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
      </S.MetricsGrid>
    </>
  );
}

export default EcoImpact;
