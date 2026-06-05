import { useRef } from "react";

import html2pdf from "html2pdf.js";
import { Download, FileText } from "lucide-react";

import * as S from "./ReportPreview.styles";
import { userData } from "./userData";
import { useAppSelector } from "../../store/hooks";
import { getAchievements } from "../dashboard/Achievements";
import { calculateMetrics } from "../dashboard/calculateMetrics";
import {
  selectHighestAchievement,
  selectMonthlyStats,
  selectStreakData,
  selectVisibleHabits,
} from "../habits/store/selectors";

function ReportPreview() {
  const reportRef = useRef<HTMLDivElement>(null);

  const { currentStreak } = useAppSelector(selectStreakData);
  const monthlyStats = useAppSelector(selectMonthlyStats);
  const highestAchievement = useAppSelector(selectHighestAchievement);
  const habits = useAppSelector((state) => state.habits.habits);
  const history = useAppSelector((state) => state.habits.history);
  const visibleHabits = useAppSelector(selectVisibleHabits);

  const metrics = calculateMetrics(habits, history, visibleHabits);

  // Получаем все достижения
  const waterSaved = parseFloat(
    metrics.metricsCards.find((m) => m.title === "Сэкономлено воды")?.value.replace(/\s/g, "") ??
      "0"
  );
  const co2Saved = parseFloat(
    metrics.metricsCards.find((m) => m.title === "Сокращено CO₂")?.value.replace(/\s/g, "") ?? "0"
  );
  const treesPlanted = metrics.treesPlanted;
  const allAchievements = getAchievements(currentStreak, waterSaved, treesPlanted, co2Saved);
  const unlockedAchievements = allAchievements.filter((a) => a.unlocked);

  const handleDownloadPDF = () => {
    const element = reportRef.current;
    if (!element) {
      return;
    }

    const opt: {
      margin: [number, number, number, number];
      filename: string;
      image: { type: "jpeg"; quality: number };
      html2canvas: { scale: number; letterRendering: boolean };
      jsPDF: { unit: "mm"; format: "a4"; orientation: "portrait" };
    } = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `eco_report_${monthlyStats.month.replace(" ", "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <S.ReportPreviewWrapper>
      <S.ReportHeader>
        <S.ReportHeaderIcon>
          <FileText size={28} strokeWidth={1.5} color="#FFFFFF" />
        </S.ReportHeaderIcon>
        <S.ReportHeaderText>
          <S.ReportHeaderTitle>Месячный отчёт</S.ReportHeaderTitle>
          <S.ReportHeaderSubtitle>
            Получайте красивый PDF-отчёт о своих достижениях каждый месяц
          </S.ReportHeaderSubtitle>
        </S.ReportHeaderText>
      </S.ReportHeader>

      <S.HiddenPdfWrapper>
        <div
          ref={reportRef}
          style={{
            width: "210mm",
            padding: "20mm",
            background: "white",
            fontFamily: "Arial, sans-serif",
            color: "#1B5E20",
          }}
        >
          <S.PdfHeader>
            <S.PdfMainTitle>Эко-отчёт</S.PdfMainTitle>
            <S.PdfMonthTitle>{monthlyStats.month}</S.PdfMonthTitle>
            <S.PdfUserSubtitle>{userData.name} - Эко-энтузиаст</S.PdfUserSubtitle>
            <S.PdfDivider />
          </S.PdfHeader>

          <S.StatsSection>
            <S.StatsTitle>Общая статистика</S.StatsTitle>
            <S.StatsTable>
              <tbody>
                <tr>
                  <S.StatsLabel>Уровень:</S.StatsLabel>
                  <S.StatsValue>{highestAchievement.title}</S.StatsValue>
                </tr>
                <tr>
                  <S.StatsLabel>Активных дней в месяце:</S.StatsLabel>
                  <S.StatsValue>{monthlyStats.daysActive}</S.StatsValue>
                </tr>
                <tr>
                  <S.StatsLabel>Всего действий за месяц:</S.StatsLabel>
                  <S.StatsValue>{monthlyStats.totalActions}</S.StatsValue>
                </tr>
                <tr>
                  <S.StatsLabel>Лучшая серия за месяц:</S.StatsLabel>
                  <S.StatsValue>{monthlyStats.bestStreak} подряд</S.StatsValue>
                </tr>
                <tr>
                  <S.StatsLabel>Самая частая привычка:</S.StatsLabel>
                  <S.StatsValue>{monthlyStats.mostFrequentHabit ?? "—"}</S.StatsValue>
                </tr>
              </tbody>
            </S.StatsTable>
          </S.StatsSection>

          <S.StatsSection>
            <S.StatsTitle>Экологический вклад за месяц</S.StatsTitle>
            <S.StatsTable>
              <tbody>
                <tr>
                  <S.StatsLabel>Сэкономлено воды:</S.StatsLabel>
                  <S.StatsValue>{monthlyStats.waterSaved.toLocaleString()} литров</S.StatsValue>
                </tr>
                <tr>
                  <S.StatsLabel>Сокращено CO₂:</S.StatsLabel>
                  <S.StatsValue>{monthlyStats.co2Reduced} кг</S.StatsValue>
                </tr>
                <tr>
                  <S.StatsLabel>Сохранено деревьев:</S.StatsLabel>
                  <S.StatsValue>{monthlyStats.treesPlanted.toFixed(2)}</S.StatsValue>
                </tr>
                <tr>
                  <S.StatsLabel>Сэкономлено энергии:</S.StatsLabel>
                  <S.StatsValue>{monthlyStats.energySaved} кВт·ч</S.StatsValue>
                </tr>
              </tbody>
            </S.StatsTable>
          </S.StatsSection>

          <div style={{ marginBottom: "30px" }}>
            <S.StatsLabel>Достижения</S.StatsLabel>
            <div>
              {unlockedAchievements.map((a) => (
                <S.DValue key={a.id}>{a.title}</S.DValue>
              ))}
              {unlockedAchievements.length === 0 && (
                <S.PdfUserSubtitle>
                  Пока нет достижений. Продолжайте в том же духе!
                </S.PdfUserSubtitle>
              )}
            </div>
          </div>

          <S.PdfFooter>
            <S.PdfFooterTitle>Спасибо, что заботитесь о планете!</S.PdfFooterTitle>
            <S.PdfFooterSubtitle>EcoTrack</S.PdfFooterSubtitle>
          </S.PdfFooter>
        </div>
      </S.HiddenPdfWrapper>

      <S.ReportCard>
        <S.PreviewHeader>
          <S.PreviewMonth>{monthlyStats.month}</S.PreviewMonth>
          <S.PreviewTitle>Ваш Эко-Отчёт</S.PreviewTitle>
        </S.PreviewHeader>
        <S.PreviewStats>
          <S.PreviewStat>
            <S.PreviewStatInfo>
              <S.PreviewStatValue>{monthlyStats.daysActive}</S.PreviewStatValue>
              <S.PreviewStatLabel>дней активности</S.PreviewStatLabel>
            </S.PreviewStatInfo>
          </S.PreviewStat>
          <S.PreviewStat>
            <S.PreviewStatInfo>
              <S.PreviewStatValue>{monthlyStats.totalActions}</S.PreviewStatValue>
              <S.PreviewStatLabel>действий</S.PreviewStatLabel>
            </S.PreviewStatInfo>
          </S.PreviewStat>
          <S.PreviewStat>
            <S.PreviewStatInfo>
              <S.PreviewStatValue>{monthlyStats.co2Reduced} кг</S.PreviewStatValue>
              <S.PreviewStatLabel>CO₂ сокращено</S.PreviewStatLabel>
            </S.PreviewStatInfo>
          </S.PreviewStat>
        </S.PreviewStats>
      </S.ReportCard>

      <S.DownloadButton onClick={handleDownloadPDF}>
        <Download size={18} strokeWidth={1.8} />
        <span>Скачать отчёт</span>
      </S.DownloadButton>
    </S.ReportPreviewWrapper>
  );
}

export default ReportPreview;
