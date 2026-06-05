import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled(motion.div)`
  background: white;
  border-radius: 24px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

export const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff3e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;

  svg {
    color: #ff9800;
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 8px 0;
  color: #1b5e20;
`;

export const Message = styled.p`
  font-size: 14px;
  color: #64748b;
  text-align: center;
  margin: 0 0 20px 0;
  line-height: 1.5;
`;

export const KeepList = styled.div`
  background: #f5f7f0;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;

  p {
    font-size: 13px;
    font-weight: 600;
    color: #1b5e20;
    margin: 0 0 8px 0;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    font-size: 13px;
    color: #4caf50;
    margin: 4px 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #d3e0f1;
  background: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: none;
  background: #dc2626;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(0.98);
  }
`;