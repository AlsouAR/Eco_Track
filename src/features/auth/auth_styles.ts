import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: transparent;
  padding: 1.5rem;
  transition: background-color 0.3s ease;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card);
  padding: 1rem;
  border-radius: 50%;
  box-shadow: 0 4px 20px var(--border);

  svg {
    width: 3.5rem;
    height: 3.5rem;
    color: var(--primary);
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: 1.5rem;
  color: var(--foreground);
  text-align: center;
`;

export const FormCard = styled(motion.div)`
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 10px 25px rgba(76, 175, 80, 0.08);
  box-sizing: border-box;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: 0.5rem;
  color: var(--foreground);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) - 4px);
  outline: none;
  background-color: var(--input-background);
  color: var(--card-foreground);
  margin-bottom: 1.25rem;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 16px;
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--primary-foreground);
  background-color: var(--primary);
  border: none;
  border-radius: calc(var(--radius) - 4px);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background-color: var(--accent);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ToggleModeCard = styled.div`
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  width: 100%;
  max-width: 360px;
  margin-top: 1.25rem;
  box-sizing: border-box;
  color: var(--foreground);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.04);

  button {
    background: none;
    border: none;
    color: var(--primary);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    padding: 0;
    margin-left: 5px;
    font-size: 0.875rem;

    &:hover {
      text-decoration: underline;
      color: var(--accent);
    }
  }
`;

export const ErrorMessage = styled.div`
  background-color: #ffebe9;
  border: 1px solid rgba(212, 24, 61, 0.2);
  color: var(--destructive);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  border-radius: calc(var(--radius) - 4px);
  margin-bottom: 1.25rem;
  font-weight: var(--font-weight-normal);
`;
