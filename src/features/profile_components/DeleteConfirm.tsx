import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const Overlay = styled(motion.div)`
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

const Modal = styled(motion.div)`
  background: white;
  border-radius: 24px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #FFF3E0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  
  svg {
    color: #FF9800;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: 0 0 8px 0;
  color: #1B5E20;
`;

const Message = styled.p`
  font-size: 14px;
  color: #64748B;
  text-align: center;
  margin: 0 0 20px 0;
  line-height: 1.5;
`;

const KeepList = styled.div`
  background: #F5F7F0;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  
  p {
    font-size: 13px;
    font-weight: 600;
    color: #1B5E20;
    margin: 0 0 8px 0;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
  }
  
  li {
    font-size: 13px;
    color: #4CAF50;
    margin: 4px 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #d3e0f1;
  background: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: none;
  background: #DC2626;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: scale(0.98);
  }
`;

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirm: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconWrapper>
              <AlertTriangle size={24} />
            </IconWrapper>
            
            <Title>Сброс прогресса</Title>
            <Message>Вы уверены, что хотите сбросить весь прогресс?</Message>
            
            <KeepList>
              <p>Останется только:</p>
              <ul>
                <li>Имя пользователя</li>
                <li>Дата регистрации</li>
              </ul>
            </KeepList>
            
            <ButtonGroup>
              <CancelButton onClick={onClose}>Отмена</CancelButton>
              <ConfirmButton onClick={onConfirm}>Сбросить</ConfirmButton>
            </ButtonGroup>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};