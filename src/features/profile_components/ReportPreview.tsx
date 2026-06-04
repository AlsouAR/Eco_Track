import React, { useRef } from "react";
import { FileText, Download } from "lucide-react";
import { useAppSelector } from "../../store/hooks";
import { selectStreakData, selectMonthlyStats } from "../habits/store/selectors";
import { selectHighestAchievement } from "../habits/store/selectors";
import { getAchievements } from "../dashboard/Achievements";
import { calculateMetrics } from "../dashboard/calculateMetrics";
import { selectVisibleHabits } from "../habits/store/selectors";
import { userData } from "./userData";
import "./ReportPreview.css";

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
  const waterSaved = parseFloat(metrics.metricsCards.find(m => m.title === "Сэкономлено воды")?.value.replace(/\s/g, "") ?? "0");
  const co2Saved = parseFloat(metrics.metricsCards.find(m => m.title === "Сокращено CO₂")?.value.replace(/\s/g, "") ?? "0");
  const treesPlanted = metrics.treesPlanted;
  const allAchievements = getAchievements(currentStreak, waterSaved, treesPlanted, co2Saved);
  const unlockedAchievements = allAchievements.filter(a => a.unlocked);
  
  const handleDownloadPDF = () => {
    if (reportRef.current == null) {
      return;
    }
    // PDF export via html2pdf.js is not wired yet
  };

  return (
    <div className="report-preview">
      <div className="report-header">
        <div className="report-header-icon">
          <FileText size={28} strokeWidth={1.5} color="#FFFFFF" />
        </div>
        <div className="report-header-text">
          <h2 className="report-header-title">Месячный отчёт</h2>
          <p className="report-header-subtitle">
            Получайте красивый PDF-отчёт о своих достижениях каждый месяц
          </p>
        </div>
      </div>

      {/* Скрытая область для PDF */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div ref={reportRef} style={{ 
          width: "210mm", 
          padding: "20mm", 
          background: "white", 
          fontFamily: "Arial, sans-serif",
          color: "#1B5E20",
        }}>
          
          <div className="pdf-header">
            <h1 className="pdf-main-title"> Эко-отчёт</h1>
            <h2 className="pdf-month-title">{monthlyStats.month}</h2>
            <p className="pdf-user-subtitle">{userData.name} - Эко-энтузиаст</p>
            <hr className="pdf-divider" />
          </div>

          <div className="stats-section">
            <h3 className="stats-title"> Общая статистика</h3>
            <table className="stats-table">
              <tbody>
                <tr>
                  <td className="stats-label"> Уровень:</td>
                  <td className="stats-value">{highestAchievement.title}</td>
                </tr>
                <tr>
                  <td className="stats-label"> Активных дней в месяце:</td>
                  <td className="stats-value">{monthlyStats.daysActive}</td>
                </tr>
                <tr>
                  <td className="stats-label"> Всего действий за месяц:</td>
                  <td className="stats-value">{monthlyStats.totalActions}</td>
                </tr>
                <tr>
                  <td className="stats-label"> Лучшая серия за месяц:</td>
                  <td className="stats-value">{monthlyStats.bestStreak} подряд</td>
                </tr>
                <tr>
                  <td className="stats-label"> Самая частая привычка:</td>
                  <td className="stats-value">{monthlyStats.mostFrequentHabit ?? "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="stats-section">
            <h3 className="stats-title"> Экологический вклад за месяц</h3>
            <table className="stats-table">
              <tbody>
                <tr>
                  <td className="stats-label"> Сэкономлено воды:</td>
                  <td className="stats-value">{monthlyStats.waterSaved.toLocaleString()} литров</td>
                </tr>
                <tr>
                  <td className="stats-label"> Сокращено CO₂:</td>
                  <td className="stats-value">{monthlyStats.co2Reduced} кг</td>
                </tr>
                <tr>
                  <td className="stats-label"> Сохранено деревьев:</td>
                  <td className="stats-value">{monthlyStats.treesPlanted.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="stats-label"> Сэкономлено энергии:</td>
                  <td className="stats-value">{monthlyStats.energySaved} кВт·ч</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 className="stats-label"> Достижения</h3>
            <div>
              {unlockedAchievements.map(a => (
                <div className="d-value" key={a.id} >
                  {a.title}
                </div>
              ))}
              {unlockedAchievements.length === 0 && <p className="report-user-subtitle">Пока нет достижений. Продолжайте в том же духе!</p>}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px", padding: "20px", background: "#F5F7F0", borderRadius: "16px" }}>
            <p style={{ fontSize: "16px", marginBottom: "8px" }}> Спасибо, что заботитесь о планете!</p>
            <p style={{ fontSize: "12px", color: "#7B8C6E" }}> EcoTrack</p>
          </div>
        </div>
      </div>
      <div className="report-preview-card">
        <div className="preview-header">
          <h3 className="preview-month">{monthlyStats.month}</h3>
          <p className="preview-title">Ваш Эко-Отчёт</p>
        </div>
        <div className="preview-stats">
          <div className="preview-stat">
            <div className="preview-stat-info">
              <span className="preview-stat-value">{monthlyStats.daysActive}</span>
              <span className="preview-stat-label">дней активности</span>
            </div>
          </div>
          <div className="preview-stat">
            <div className="preview-stat-info">
              <span className="preview-stat-value">{monthlyStats.totalActions}</span>
              <span className="preview-stat-label">действий</span>
            </div>
          </div>
          <div className="preview-stat">
            <div className="preview-stat-info">
              <span className="preview-stat-value">{monthlyStats.co2Reduced} кг</span>
              <span className="preview-stat-label">CO₂ сокращено</span>
            </div>
          </div>
        </div>
      </div>

      <button className="report-download-btn" onClick={handleDownloadPDF}>
        <Download size={18} strokeWidth={1.8} />
        <span>Скачать отчёт</span>
      </button>
    </div>
  );
}

export default ReportPreview;