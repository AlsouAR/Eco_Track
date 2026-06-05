import React from "react";

import * as S from "./MetricCard.styles";

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  description: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  description,
}) => (
  <S.Card whileHover={{ scale: 1.02 }}>
    <S.IconWrapper color={color}>
      <Icon size={32} color="white" />
    </S.IconWrapper>

    <S.ContentCard>
      <h3>{title}</h3>
      <h1>
        {value} <span>{unit}</span>
      </h1>
      <p>{description}</p>
    </S.ContentCard>
  </S.Card>
);
