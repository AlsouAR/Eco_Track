import { Leaf, TreeDeciduous } from "lucide-react";

import * as S from "./GrowingTreeAnimation.styles";

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
    <S.CardWrapper
      initial={{ opacity: 0, y: 20 }} // начальное состояние: прозрачный, сдвинут вниз на 20px
      animate={{ opacity: 1, y: 0 }} // конечное состояние: полностью видимый, на своём месте
      transition={{ delay: 0.5 }} // задержка старта 0.5 секунды
    >
      <S.Content>
        {/*Пульсация иконки дерева*/}
        <S.IconContainer
          animate={{ scale: [1, 1.1, 1] }} // ключевые кадры: 100% → 110% → 100%
          transition={{
            duration: 3, // длина одного цикла 3 секунды
            repeat: Infinity, // повторять бесконечно
            ease: "easeInOut", // плавное начало и конец
          }}
        >
          <TreeDeciduous size={96} color="white" />
        </S.IconContainer>
        <S.Title>Вы сохранили эквивалент {trees.toFixed(2)} деревьев! 🌳</S.Title>
        <S.Subtitle>Ваши действия очищают воздух и помогают планете дышать</S.Subtitle>
      </S.Content>

      {/* Парящие декоративные листья */}
      {leafConfigs.map((cfg, i) => (
        <S.LeafWrapper
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
        </S.LeafWrapper>
      ))}
    </S.CardWrapper>
  );
}

export default GrowingTreeAnimation;
