import React, { useState } from "react";

import { Eye, EyeOff, Shield, X } from "lucide-react";

import * as S from "./Settings.styles";
import { useAppSelector } from "../../store/hooks";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const SettingsItem = ({ icon, title, description, onClick }: SettingsItemProps) => {
  return (
    <S.SettingsItem onClick={onClick}>
      <S.SettingsIcon>{icon}</S.SettingsIcon>
      <S.SettingsInfo>
        <S.SettingsItemTitle>{title}</S.SettingsItemTitle>
        <S.SettingsItemDescription>{description}</S.SettingsItemDescription>
      </S.SettingsInfo>
    </S.SettingsItem>
  );
};

const ChangePasswordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;
    return passwordRegex.test(password);
  };

  const getPasswordError = (password: string): string | null => {
    if (password.length === 0) {
      return null;
    }
    if (password.length < 5) {
      return "Пароль должен содержать минимум 5 символов";
    }
    if (!/[A-Za-z]/.test(password)) {
      return "Пароль должен содержать хотя бы одну латинскую букву";
    }
    if (!/\d/.test(password)) {
      return "Пароль должен содержать хотя бы одну цифру";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      currentPassword.trim() === "" ||
      newPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError("Заполните все поля");
      return;
    }
    const users = JSON.parse(localStorage.getItem("eco_users") ?? "{}") as Record<string, string>;
    if (currentUser != null && users[currentUser] !== currentPassword) {
      setError("Неверный текущий пароль");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError("Новый пароль: минимум 5 символов, хотя бы одна латинская буква и одна цифра");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Новый пароль и подтверждение не совпадают");
      return;
    }
    if (newPassword === currentPassword) {
      setError("Новый пароль должен отличаться от текущего");
      return;
    }
    if (currentUser != null) {
      users[currentUser] = newPassword;
      localStorage.setItem("eco_users", JSON.stringify(users));
      setSuccess("Пароль успешно изменён!");

      setTimeout(() => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setSuccess("");
        onClose();
      }, 1500);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Смена пароля</S.ModalTitle>
          <S.ModalClose onClick={onClose}>
            <X size={20} />
          </S.ModalClose>
        </S.ModalHeader>

        <form onSubmit={handleSubmit}>
          {error !== "" && <S.ModalError>{error}</S.ModalError>}
          {success !== "" && <S.ModalSuccess>{success}</S.ModalSuccess>}

          <S.ModalField>
            <S.ModalLabel>Текущий пароль</S.ModalLabel>
            <S.PasswordInputWrapper>
              <S.ModalInput
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Введите текущий пароль"
              />
              <S.PasswordToggle
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </S.PasswordToggle>
            </S.PasswordInputWrapper>
          </S.ModalField>
          <S.ModalField>
            <S.ModalLabel>Новый пароль</S.ModalLabel>
            <S.PasswordInputWrapper>
              <S.ModalInput
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Введите новый пароль"
              />
              <S.PasswordToggle type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </S.PasswordToggle>
            </S.PasswordInputWrapper>
            {newPassword.length > 0 && getPasswordError(newPassword) != null && (
              <S.ModalHintError>{getPasswordError(newPassword)}</S.ModalHintError>
            )}
            {newPassword.length > 0 && getPasswordError(newPassword) == null && (
              <S.ModalHintSuccess>✓ Надёжный пароль</S.ModalHintSuccess>
            )}
          </S.ModalField>

          <S.ModalField>
            <S.ModalLabel>Подтверждение нового пароля</S.ModalLabel>
            <S.PasswordInputWrapper>
              <S.ModalInput
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите новый пароль"
              />
              <S.PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </S.PasswordToggle>
            </S.PasswordInputWrapper>
            {confirmPassword.length > 0 && newPassword !== confirmPassword && (
              <S.ModalHintError>Пароли не совпадают</S.ModalHintError>
            )}
          </S.ModalField>

          <S.ModalSubmitButton type="submit">Изменить пароль</S.ModalSubmitButton>
        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

function Settings() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <S.SettingsContainer>
        <S.SettingsTitle>Настройки</S.SettingsTitle>
        <S.SettingsList>
          <SettingsItem
            icon={<Shield size={22} />}
            title="Конфиденциальность"
            description="Cмена пароля"
            onClick={() => setIsPasswordModalOpen(true)}
          />
        </S.SettingsList>
      </S.SettingsContainer>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}

export default Settings;
