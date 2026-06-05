import React from "react";

import { AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import * as S from "./DeleteConfirm.styles";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirm: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <S.Modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.IconWrapper>
              <AlertTriangle size={24} />
            </S.IconWrapper>

            <S.Title>Сброс прогресса</S.Title>
            <S.Message>Вы уверены, что хотите сбросить весь прогресс?</S.Message>

            <S.KeepList>
              <p>Останется только:</p>
              <ul>
                <li>Имя пользователя</li>
                <li>Дата регистрации</li>
              </ul>
            </S.KeepList>

            <S.ButtonGroup>
              <S.CancelButton onClick={onClose}>Отмена</S.CancelButton>
              <S.ConfirmButton onClick={onConfirm}>Сбросить</S.ConfirmButton>
            </S.ButtonGroup>
          </S.Modal>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};
