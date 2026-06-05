import styled from "@emotion/styled";
import { motion } from "motion/react";

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const Card = styled(motion.div)`
  position: relative;
  z-index: 10000;
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 1.75rem;
  box-shadow: 0 30px 90px rgba(15, 23, 42, 0.14);
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--eco-primary), var(--eco-accent));
  box-shadow: 0 18px 50px rgba(76, 175, 80, 0.2);
  color: #ffffff;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--foreground);
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 1rem;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f7f0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FieldLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--foreground);
`;

const inputStyles = `
  width: 100%;
  padding: 1rem 1.1rem;
  border-radius: 1rem;
  border: 2px solid var(--border);
  background: #fbfdf9;
  color: var(--foreground);
  outline: none;
  transition: border 0.2s ease, box-shadow 0.2s ease;
  font-size: 1rem;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  ${inputStyles}
  border-color: ${({ $hasError }) => ($hasError === true ? "#ef4444" : "var(--border)")};
  box-shadow: ${({ $hasError }) =>
    $hasError === true ? "0 0 0 5px rgba(239, 68, 68, 0.1)" : "none"};
`;

export const Select = styled.select<{ $hasError?: boolean }>`
  ${inputStyles}
  border-color: ${({ $hasError }) => ($hasError === true ? "#ef4444" : "var(--border)")};
  background: #fbfdf9;
`;

export const Textarea = styled.textarea<{ $hasError?: boolean }>`
  ${inputStyles}
  resize: none;
  min-height: 120px;
  border-color: ${({ $hasError }) => ($hasError === true ? "#ef4444" : "var(--border)")};
`;

export const AddressFieldWrapper = styled.div`
  position: relative;
`;

export const GeocodingSpinner = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #4caf50;
`;

export const AddressHint = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

export const GeocodeError = styled.span`
  color: #ef4444;
  background-color: #fef2f2;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
`;

export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: block;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const PrimaryButton = styled(SubmitButton)`
  background: #4caf50;
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryButton = styled(SubmitButton)`
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #86efac;
`;
