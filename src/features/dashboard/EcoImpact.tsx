import React, { useState } from 'react';
import styled from '@emotion/styled';

// этот стиль нужно вынести в глобальные стили, но пока так
const Title = styled.h1`
  font-family: sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  color: #1B5E20;
  margin-bottom: 1.5rem;
  text-align: center;
`;
const Subtitle = styled.p`
  font-size: 14px;   
  color: #558B2F;
  line-height: 1.5;
  margin-top: -0.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

export function EcoImpact() {
    return (
        <div>
            <Title>Ваш экологический вклад</Title>
            <Subtitle>Визуализация вашего влияния на планету</Subtitle>
            <h2>Экологический влияние</h2>
            <p>Информация о вашем экологическом влиянии.</p>
        </div>
    );
}

export default EcoImpact;