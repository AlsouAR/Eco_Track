import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const ContentCard = styled.div`
  font-family: sans-serif;
  align-items: left;
  text-align: left;
  gap: 16px;
  margin-bottom: 32px;

  .text-container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 30px;
    font-weight: 700;
    color: var(--secondary-foreground);
    margin: 0;
  }

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--muted-foreground);
    margin: 0;
    font-size: 14px;
    margin-bottom: 8px;
  }

  p {
    font-size: 12px;
    color: var(--muted-foreground); /* #558B2F */
    margin: 0;
  }

  span {
    font-size: 14px;
    font-weight: normal;
    color: var(--muted-foreground); /* #558B2F */
    margin: 0;
  }
`;
export const IconWrapper = styled.div<{ color: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;
export const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--border, #e2e8f0);
  text-align: center;
`;
