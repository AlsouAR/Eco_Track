import styled from "@emotion/styled";

export const SettingsContainer = styled.div`
  background: #ffffff;
  border-radius: 28px;
  padding: 24px 20px 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

export const SettingsTitle = styled.h2`
  font-size: 22px;
  font-weight: 650;
  color: #1b5e20;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #eff3e6;
`;

export const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SettingsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: #fcfdf9;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #edf2e3;

  &:hover {
    background: #f3f8ec;
    border-color: #c8e0b0;
  }
`;

export const SettingsIcon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7f0;
  border-radius: 50%;
  color: #4caf50;
`;

export const SettingsInfo = styled.div`
  flex: 1;
`;

export const SettingsItemTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1b5e20;
  margin-bottom: 4px;
`;

export const SettingsItemDescription = styled.div`
  font-size: 12px;
  color: #7b8c6e;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 28px;
  padding: 28px 24px 32px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #eff3e6;
`;

export const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 650;
  color: #1b5e20;
  margin: 0;
`;

export const ModalClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #7b8c6e;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f7f0;
    color: #1b5e20;
  }
`;

export const ModalField = styled.div`
  margin-bottom: 20px;
`;

export const ModalLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1b5e20;
  margin-bottom: 8px;
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  font-size: 14px;
  border: 1px solid #edf2e3;
  border-radius: 16px;
  background: #fcfdf9;
  color: #2e3b2c;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #7b8c6e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    color: #4caf50;
  }
`;

export const ModalError = styled.div`
  background: #ffebee;
  border: 1px solid #ffcdd2;
  color: #c62828;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 13px;
  margin-bottom: 20px;
`;

export const ModalSuccess = styled.div`
  background: #e8f5e9;
  border: 1px solid #c8e6c9;
  color: #2e7d32;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 13px;
  margin-bottom: 20px;
`;

export const ModalHintError = styled.div`
  font-size: 11px;
  color: #c62828;
  margin-top: 6px;
  padding-left: 4px;
`;

export const ModalHintSuccess = styled.div`
  font-size: 11px;
  color: #4caf50;
  margin-top: 6px;
  padding-left: 4px;
`;

export const ModalSubmitButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 12px;

  &:hover {
    background: #43a047;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
