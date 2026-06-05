import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { ResponsiveContainer } from "recharts";

export const ProgressCard = styled(motion.div)`
  background: var(--card, #ffffff);
  border-radius: 40px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--border, #e2e8f0);
  width: 100%;
`;

export const HeaderSection = styled.div`
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

export const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TooltipWrapper = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
`;

export const TooltipLabel = styled.p`
  color: #1b5e20;
  font-weight: normal;
  margin: 0 0 4px;
`;

export const TooltipValue = styled.p`
  color: #4caf50;
  margin: 0;
`;

export const StyledResponsiveContainer = styled(ResponsiveContainer)`
  & :focus {
    outline: none !important;
  }
  .recharts-wrapper:focus {
    outline: none;
  }
`;