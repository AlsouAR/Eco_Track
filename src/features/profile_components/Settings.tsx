import React, { useState } from 'react';
import { Moon, Bell, Shield, X, Eye, EyeOff } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import './Settings.css';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const SettingsItem = ({ icon, title, description, onClick }: SettingsItemProps) => {
  return (
    <div className="settings-item" onClick={onClick}>
      <div className="settings-icon">{icon}</div>
      <div className="settings-info">
        <div className="settings-item-title">{title}</div>
        <div className="settings-item-description">{description}</div>
      </div>
    </div>
  );
};

const ChangePasswordModal = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;
    return passwordRegex.test(password);
  };

  const getPasswordError = (password: string): string | null => {
    if (password.length === 0) return null;
    if (password.length < 5) {
      return 'Пароль должен содержать минимум 5 символов';
    }
    if (!/[A-Za-z]/.test(password)) {
      return 'Пароль должен содержать хотя бы одну латинскую букву';
    }
    if (!/\d/.test(password)) {
      return 'Пароль должен содержать хотя бы одну цифру';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Заполните все поля');
      return;
    }
    const users = JSON.parse(localStorage.getItem('eco_users') || '{}');
    if (currentUser && users[currentUser] !== currentPassword) {
      setError('Неверный текущий пароль');
      return;
    }
    if (!validatePassword(newPassword)) {
      setError('Новый пароль: минимум 5 символов, хотя бы одна латинская буква и одна цифра');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Новый пароль и подтверждение не совпадают');
      return;
    }
    if (newPassword === currentPassword) {
      setError('Новый пароль должен отличаться от текущего');
      return;
    }
    if (currentUser) {
      users[currentUser] = newPassword;
      localStorage.setItem('eco_users', JSON.stringify(users));
      setSuccess('Пароль успешно изменён!');
      
      setTimeout(() => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setSuccess('');
        onClose();
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Смена пароля</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="modal-error">{error}</div>}
          {success && <div className="modal-success">{success}</div>}

          <div className="modal-field">
            <label className="modal-label">Текущий пароль</label>
            <div className="password-input-wrapper">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="modal-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Введите текущий пароль"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="modal-field">
            <label className="modal-label">Новый пароль</label>
            <div className="password-input-wrapper">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="modal-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Введите новый пароль"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {newPassword && getPasswordError(newPassword) && (
              <div className="modal-hint-error">{getPasswordError(newPassword)}</div>
            )}
            {newPassword && !getPasswordError(newPassword) && (
              <div className="modal-hint-success">✓ Надёжный пароль</div>
            )}
          </div>

          <div className="modal-field">
            <label className="modal-label">Подтверждение нового пароля</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="modal-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите новый пароль"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <div className="modal-hint-error">Пароли не совпадают</div>
            )}
          </div>

          <button type="submit" className="modal-submit-btn">
            Изменить пароль
          </button>
        </form>
      </div>
    </div>
  );
};

function Settings() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <div className="settings-container">
        <h2 className="settings-title">Настройки</h2>
        <div className="settings-list">
          <SettingsItem 
            icon={<Shield size={22} />}
            title="Конфиденциальность"
            description="Cмена пароля"
            onClick={() => setIsPasswordModalOpen(true)}
          />
        </div>
      </div>

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}

export default Settings;