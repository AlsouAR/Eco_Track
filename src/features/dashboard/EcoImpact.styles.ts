import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const HeaderSection = styled.div`
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

export const MetricsGrid = styled(motion.div)`
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