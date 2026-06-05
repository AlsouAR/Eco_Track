import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { TreeDeciduous, Leaf } from "lucide-react";

const CardWrapper = styled(motion.div)`
  background: linear-gradient(135deg, var(--eco-primary, #4caf50), var(--eco-accent, #66bb6a));
  border-radius: 24px; // rounded-3xl
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.2);
  padding: 3rem; // p-12
  color: white;
  text-align: center;
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
`;

const IconContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem; // mb-6
`;

const Title = styled.h2`
  font-size: 1.875rem; // text-3xl
  font-weight: 700;
  margin-bottom: 0.75rem; // mb-3
  color: white;
`;

const Subtitle = styled.p`
  font-size: 1.125rem; // text-lg
  opacity: 0.9;
  color: white;
  line-height: 1.6;
`;

const LeafWrapper = styled(motion.div)`
  position: absolute;
  /* координаты задаются инлайн-стилями */
`;

// Конфигурация листьев

interface LeafConfig {
  left: string;
  top: string;
  delay: number;
}

const leafConfigs: LeafConfig[] = [
  { left: "20%", top: "30%", delay: 0 },
  { left: "35%", top: "70%", delay: 0.3 },
  { left: "50%", top: "30%", delay: 0.6 },
  { left: "65%", top: "70%", delay: 0.9 },
  { left: "80%", top: "30%", delay: 1.2 },
  { left: "95%", top: "70%", delay: 1.5 },
];

interface GrowingTreeProps {
  trees?: number;
}

export function GrowingTreeAnimation({ trees = 12 }: GrowingTreeProps) {
  return (
    <CardWrapper
      initial={{ opacity: 0, y: 20 }} // начальное состояние: прозрачный, сдвинут вниз на 20px
      animate={{ opacity: 1, y: 0 }} // конечное состояние: полностью видимый, на своём месте
      transition={{ delay: 0.5 }} // задержка старта 0.5 секунды
    >
      <Content>
        {/*Пульсация иконки дерева*/}
        <IconContainer
          animate={{ scale: [1, 1.1, 1] }} // ключевые кадры: 100% → 110% → 100%
          transition={{
            duration: 3, // длина одного цикла 3 секунды
            repeat: Infinity, // повторять бесконечно
            ease: "easeInOut", // плавное начало и конец
          }}
        >
          <TreeDeciduous size={96} color="white" />
        </IconContainer>
        <Title>Вы сохранили эквивалент {trees.toFixed(2)} деревьев! 🌳</Title>
        <Subtitle>Ваши действия очищают воздух и помогают планете дышать</Subtitle>
      </Content>

      {/* Парящие декоративные листья */}
      {leafConfigs.map((cfg, i) => (
        <LeafWrapper
          key={i}
          style={{ left: cfg.left, top: cfg.top }}
          animate={{
            y: [0, -20, 0], // движение вверх-вниз
            rotate: [0, 10, 0], // лёгкое покачивание
            opacity: [0.3, 0.6, 0.3], // изменение прозрачности
          }}
          transition={{
            duration: 3 + i * 0.5, // каждый следующий лист чуть медленнее
            repeat: Infinity,
            delay: i * 0.3, // задержка старта, чтобы листья двигались не синхронно
          }}
        >
          <Leaf size={32} color="rgba(255,255,255,0.2)" /> {/* text-white/20 */}
        </LeafWrapper>
      ))}
    </CardWrapper>
  );
}

export default GrowingTreeAnimation;
