import React, { useState } from 'react';
import styled from '@emotion/styled';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';


const CalendarCard = styled(motion.div)`
  background: var(--card);
  border-radius: 40px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); 
  border: 1px solid var(--border);
  width: 100%;
  max-width: 860px; 
  margin: 0;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;

  .logo-icon-box {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    background: #66bb6a;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-container {
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1b5e20;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: var(--muted-foreground);
    margin: 0;
  }
`;

const CalendarWrapper = styled.div`
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
    margin-bottom: 40px;
    gap: 12px;
    
    button {
      background: none;
      border: none;
      color: #1b5e20;
      cursor: pointer;
      font-size: 20px;
      min-width: 44px;
      
      &:hover { opacity: 0.6; }
    }

    .react-calendar__navigation__label {
      flex-grow: 0 !important;
      font-weight: 700;
      font-size: 18px;
      color: #1b5e20;
      margin: 0 40px; 
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    margin-bottom: 24px;
    abbr {
      text-decoration: none;
      font-weight: 700;
      color: #4caf50;
      font-size: 14px;
      border-bottom: 1px dotted #4caf50;
    }
  }

  .react-calendar__tile {
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #444;
    border-radius: 16px;
    transition: all 0.2s;
    
    &:hover { background: #f1f8e9; }
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d32f2f !important; 
  }

  .react-calendar__tile--active {
    background: #66bb6a !important;
    color: white !important;
    font-weight: 700;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(102, 187, 106, 0.3);
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #bdbdbd !important;
  }
`;

export function EcoCalendar() {
  const [date, setDate] = useState(new Date(2026, 3, 29));

  return (
    <CalendarCard
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <HeaderSection>
        <div className="logo-icon-box">
          <Leaf size={28} color="white" />
        </div>
        <div className="text-container">
          <h2>Календарь привычек</h2>
          <p>Отслеживайте свой прогресс</p>
        </div>
      </HeaderSection>

      <CalendarWrapper>
        <Calendar
          onChange={(val) => setDate(val as Date)}
          value={date}
          locale="ru-RU"
          prevLabel="‹"
          nextLabel="›"
          prev2Label="«"
          next2Label="»"
          formatShortWeekday={(locale, date) => {
            const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
            const index = date.getDay() === 0 ? 6 : date.getDay() - 1;
            return days[index] || '';
          }}
        />
      </CalendarWrapper>
    </CalendarCard>
  );
}
export default EcoCalendar;