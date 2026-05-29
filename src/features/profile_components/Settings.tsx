import React, { useState } from 'react';
import { Moon, Bell, Shield } from 'lucide-react';
import './Settings.css';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}
interface SettingsToggleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isOn: boolean;
  onToggle: (state: boolean) => void;
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

const SettingsToggle = ({ icon, title, description, isOn, onToggle }: SettingsToggleProps) => {
  return (
    <div className="settings-item">
      <div className="settings-icon">{icon}</div>
      <div className="settings-info">
        <div className="settings-item-title">{title}</div>
        <div className="settings-item-description">{description}</div>
      </div>
    </div>
  );
};

function Settings() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);

  return (
    <div className="settings-container">
      <h2 className="settings-title">Настройки</h2>
      <div className="settings-list">
        <SettingsToggle 
          icon={<Bell size={22} />}
          title="Уведомления"
          description="Напоминания о ежедневных действиях"
          isOn={isNotifications}
          onToggle={(state) => {
            setIsNotifications(state);
            console.log('Уведомления:', state);
          }}
        />
        <SettingsItem 
          icon={<Shield size={22} />}
          title="Конфиденциальность"
          description="Управление данными"
          onClick={() => console.log('Конфиденциальность')}
        />
      </div>
    </div>
  );
}

export default Settings;