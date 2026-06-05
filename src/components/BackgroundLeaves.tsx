import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

// Конфигурация листьев: позиция (в процентах от окна), задержка, размер
const leaves = [
  { left: "5%", top: "15%", delay: 0, size: 40 },
  { left: "90%", top: "20%", delay: 0.4, size: 32 },
  { left: "15%", top: "80%", delay: 0.8, size: 36 },
  { left: "85%", top: "70%", delay: 1.2, size: 28 },
];

const LeafWrapper = styled(motion.div)`
  position: fixed; /* фиксированное положение относительно окна */
  z-index: -1; /* под всем контентом */
  pointer-events: none; /* чтобы не мешали кликам */
`;

export const BackgroundLeaves = () => (
  <>
    {leaves.map((leaf, i) => (
      <LeafWrapper
        key={i}
        style={{ left: leaf.left, top: leaf.top }}
        animate={{
          y: [0, -25, 0],
          rotate: [0, 15, 0],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 4 + i * 0.7,
          repeat: Infinity,
          delay: leaf.delay,
          ease: "easeInOut",
        }}
      >
        <Leaf size={leaf.size} color="#4CAF50" />
      </LeafWrapper>
    ))}
  </>
);
