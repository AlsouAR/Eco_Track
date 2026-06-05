"use client";

import { useEffect } from "react";

import { format, isToday, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Leaf } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import * as S from "./EcoCalendar.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedDate } from "../habits/store/habitsSlice";

export function EcoCalendar() {
  const dispatch = useAppDispatch();

  const selectedDateString = useAppSelector((state) => state.habits.selectedDate);

  const date = parseISO(selectedDateString);

  const handleDateChange = (value: any) => {
    const newDate = value as Date;
    const formattedDate = format(newDate, "yyyy-MM-dd");
    dispatch(setSelectedDate(formattedDate));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const todayFormatted = format(now, "yyyy-MM-dd");

      if (todayFormatted !== selectedDateString && isToday(now)) {
        dispatch(setSelectedDate(todayFormatted));
      }
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, [selectedDateString, dispatch]);

  return (
    <S.CalendarCard initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <S.HeaderSection>
        <div className="logo-icon-box">
          <Leaf size={28} color="white" />
        </div>
        <div className="text-container">
          <h2>Календарь привычек</h2>
          <p>Сегодня: {format(new Date(), "d MMMM yyyy", { locale: ru })}</p>
        </div>
      </S.HeaderSection>

      <S.CalendarWrapper>
        <Calendar
          onChange={handleDateChange}
          value={date}
          locale="ru-RU"
          tileClassName={({ date: tileDate }) => {
            return isToday(tileDate) ? "today-tile" : null;
          }}
          formatShortWeekday={(locale, date) => {
            const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
            const index = date.getDay() === 0 ? 6 : date.getDay() - 1;
            return days[index] ?? "";
          }}
        />
      </S.CalendarWrapper>
    </S.CalendarCard>
  );
}

export default EcoCalendar;
