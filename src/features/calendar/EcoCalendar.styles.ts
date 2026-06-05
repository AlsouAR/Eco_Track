import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const CalendarCard = styled(motion.div)`
  background: var(--card);
  border-radius: 1.875rem;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--border);
  width: 100%;

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;

  .logo-icon-box {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-container {
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--foreground);
    margin: 0;
  }

  p {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin: 0;
  }
`;

export const CalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
    background: transparent;
    font-family: inherit;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    gap: 8px;

    button {
      background: none;
      border: none;
      color: var(--primary);
      cursor: pointer;
      font-size: 1.25rem;
      min-width: 44px;
      border-radius: 0.5rem;

      &:hover {
        background: var(--muted);
      }
      &:disabled {
        color: var(--muted-foreground);
      }
    }

    .react-calendar__navigation__label {
      flex-grow: 0 !important;
      font-weight: 700;
      font-size: 1.125rem;
      color: var(--foreground);
      margin: 0 1rem;
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    margin-bottom: 1.5rem;
    abbr {
      text-decoration: none;
      font-weight: 700;
      color: var(--primary);
      font-size: 0.875rem;
    }
  }

  .react-calendar__tile {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: var(--foreground);
    border-radius: 0.75rem;
    transition: all 0.2s;

    &:hover {
      background: var(--muted);
    }
  }

  .react-calendar__month-view__days__day--weekend {
    color: var(--destructive) !important;
  }

  .react-calendar__tile--active {
    background: var(--primary) !important;
    color: var(--primary-foreground) !important;
    font-weight: 700;
    box-shadow: 0 8px 16px rgba(76, 175, 80, 0.2);
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: var(--muted-foreground) !important;
    opacity: 0.5;
  }

  .react-calendar__tile--now {
    background: var(--accent);
    color: var(--foreground);
  }
`;
