import { Habit } from '../habits/store/habits_slice';

// Коэффициенты пересчёта действий в экологические показатели
const COEFFICIENTS = {
  water: 50,    // литров за 1 выполнение "Экономия воды"
  bike: 2.5,    // кг CO₂ за 1 поездку на велосипеде
  sort: 0.04,   // эквивалент сохранённых деревьев за 1 сортировку
  plastic: 3,   // кВт·ч сэкономленной энергии за 1 отказ от пластика
};

export interface MetricCardData {
  title: string;
  value: string;
  unit: string;
  description: string;
  iconId: string;   // ключ привычки, чтобы подставить иконку
  color: string;
}

export interface MonthlyProgressData {
  month: string;   // "Янв", "Фев" и т.д.
  value: number;   // суммарное количество выполненных привычек за месяц
}

export interface WeeklyActivityData {
  day: string;     // "ПН", "ВТ", ...
  value: number;   // количество выполнений в этот день недели (текущая неделя)
}

// Вспомогательная функция: подсчитать, сколько раз за всё время выполнена привычка с id
const countTotalExecutions = (habitId: string, history: Record<string, string[]>): number => {
  let total = 0;
  Object.values(history).forEach(dayHabits => {
    if (dayHabits.includes(habitId)) total++;
  });
  return total;
};

export const calculateMetrics = (
  habits: Habit[],
  history: Record<string, string[]>
) => {
  // --- Карточки EcoImpact ---
  const waterCount = countTotalExecutions('water', history);
  const bikeCount = countTotalExecutions('bike', history);
  const sortCount = countTotalExecutions('sort', history);
  const plasticCount = countTotalExecutions('plastic', history);

  const metricsCards: MetricCardData[] = [
    {
      title: 'Сэкономлено воды',
      value: (waterCount * COEFFICIENTS.water).toLocaleString('ru-RU'),
      unit: 'литров',
      description: 'Экономия воды в быту',
      iconId: 'water',
      color: '#4FC3F7',
    },
    {
      title: 'Сокращено CO₂',
      value: (bikeCount * COEFFICIENTS.bike).toLocaleString('ru-RU'),
      unit: 'кг',
      description: 'Поездки на велосипеде',
      iconId: 'bike',
      color: '#4CAF50',
    },
    {
      title: 'Сохранено деревьев',
      value: (sortCount * COEFFICIENTS.sort).toFixed(2),
      unit: 'эквивалентов',
      description: 'Сортировка отходов',
      iconId: 'sort',
      color: '#66BB6A',
    },
    {
      title: 'Энергия сэкономлена',
      value: (plasticCount * COEFFICIENTS.plastic).toLocaleString('ru-RU'),
      unit: 'кВт·ч',
      description: 'Отказ от пластика',
      iconId: 'plastic',
      color: '#FFA726',
    },
  ];

  // --- Прогресс по месяцам (последние 4) ---
  const today = new Date();
  const monthlyProgress: MonthlyProgressData[] = [];
  const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

  for (let i = 3; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth(); // 0..11
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`; // "2026-04"

    let total = 0;
    Object.entries(history).forEach(([dateStr, ids]) => {
      if (dateStr.startsWith(prefix)) {
        total += ids.length;
      }
    });

    monthlyProgress.push({
      month: monthNames[month] ?? 'Неизв',
      value: total,
    });
  }

  // --- Активность за неделю (текущая календарная неделя: ПН–ВС) ---
  const dayNames = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']; // getDay(): 0=ВС, 1=ПН, ..., 6=СБ
  const weeklyActivity: WeeklyActivityData[] = [];

  // Определяем понедельник текущей недели
  const dayOfWeek = today.getDay(); // 0 = ВС, 1 = ПН, ..., 6 = СБ
  // Разница в днях от сегодня до понедельника: если сегодня ПН (1) => 0, ВТ (2) => -1, ..., ВС (0) => -6
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  // Проходим от понедельника по воскресенье (7 дней)
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const dayHabits = history[dateKey] || [];
    weeklyActivity.push({
      day: dayNames[date.getDay()] ?? 'Неизв',
      value: dayHabits.length,
    });
  }

  // --- Деревья для GrowingTreeAnimation ---
  const treesPlanted = sortCount * COEFFICIENTS.sort;

  return {
    metricsCards,
    monthlyProgress,
    weeklyActivity,
    treesPlanted,
  };
};