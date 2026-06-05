import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const CardWrapper = styled(motion.div)`
  background: linear-gradient(135deg, var(--eco-primary, #4caf50), var(--eco-accent, #66bb6a));
  border-radius: 24px; // rounded-3xl
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.2);
  padding: 3rem; // p-12
  color: white;
  text-align: center;
  overflow: hidden;
  position: relative;
`;

export const Content = styled.div`
  position: relative;
  z-index: 10;
`;

export const IconContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem; // mb-6
`;

export const Title = styled.h2`
  font-size: 1.875rem; // text-3xl
  font-weight: 700;
  margin-bottom: 0.75rem; // mb-3
  color: white;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem; // text-lg
  opacity: 0.9;
  color: white;
  line-height: 1.6;
`;

export const LeafWrapper = styled(motion.div)`
  position: absolute;
  /* координаты задаются инлайн-стилями */
`;
