// src/features/dashboard/MetricCard.tsx
import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Droplet, Leaf, TreeDeciduous, Award, TrendingUp, Zap } from "lucide-react";

const ContentCard = styled.div`
  align-items: left;
  text-align: left;
  gap: 16px;
  margin-bottom: 32px;

  .text-container {
    display: flex;
    flex-direction: column;
  }
  
//   .IconWrapper {
//    margin-bottom: 16px;
//    display: flex;
//    justify-content: left;
//    }

  h1 {
    font-family: sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: #1B5E20;
    margin: 0;
    }

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: #558B2F;              
    margin: 0;
    font-size: 14px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--muted-foreground);  /* #558B2F */
    margin: 0;
  }

  span {
    font-size: 14px;
    font-weight: normal;
    color: #338B2F;
    margin: 0;
  }
`;
const IconWrapper = styled.div<{ color: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  background: ${({ color }) => color};  
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;
const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--border, #e2e8f0);
  text-align: center;
`;



interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  description: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon:Icon, color, description }) => (
  <Card whileHover={{ scale: 1.02 }}>
    <IconWrapper color={color}>
      <Icon size={32} color="white" />
    </IconWrapper>

    <ContentCard>
    <h3>{title}</h3>
    <h1>{value} <span>{unit}</span></h1>
    <p>{description}</p>
    </ContentCard>
  </Card>
);