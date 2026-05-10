import React, { useState } from 'react';
import './ToggleSwitch.css';

interface ToggleSwitchProps {
  isOn?: boolean;                    
  onToggle?: (state: boolean) => void;
}

const ToggleSwitch = ({ isOn, onToggle }:ToggleSwitchProps) => {
  const [internalIsOn, setInternalIsOn] = useState(false);
  
  // Используем внешнее состояние если передано, иначе внутреннее
  const checked = isOn !== undefined ? isOn : internalIsOn;
  
  const handleToggle = () => {
    const newState = !checked;
    if (isOn === undefined) {
      setInternalIsOn(newState);
    }
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div 
      className={`toggle-switch ${checked ? 'toggle-on' : 'toggle-off'}`}
      onClick={handleToggle}
    >
      <div className="toggle-knob"></div>
    </div>
  );
};

export default ToggleSwitch;