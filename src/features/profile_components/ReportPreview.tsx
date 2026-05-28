import React from 'react';
import { FileText, Download } from 'lucide-react';
import './ReportPreview.css';

function ReportPreview() {
  const reportData = {
    month: 'Март 2026',
    title: 'Ваш Эко-Отчёт',
    daysActive: 28,
    actions: 140,
    co2Reduced: 45,
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

      <div className="report-preview-card">
        <div className="preview-header">
          <h3 className="preview-month">{reportData.month}</h3>
          <p className="preview-title">{reportData.title}</p>
        </div>

        <div className="preview-stats">
          <div className="preview-stat">
            <div className="preview-stat-info">
              <span className="preview-stat-value">{reportData.daysActive}</span>
              <span className="preview-stat-label">дней активности</span>
            </div>
          </div>
          <div className="preview-stat">
            <div className="preview-stat-info">
              <span className="preview-stat-value">{reportData.actions}</span>
              <span className="preview-stat-label">действий</span>
            </div>
          </div>
          <div className="preview-stat">
            <div className="preview-stat-info">
              <span className="preview-stat-value">{reportData.co2Reduced} кг</span>
              <span className="preview-stat-label">CO₂ сокращено</span>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка скачивания */}
      <button className="report-download-btn" onClick={() => console.log('Скачать отчёт за март')}>
        <Download size={18} strokeWidth={1.8} />
        <span>Скачать отчёт за март</span>
      </button>
    </div>
  );
}

export default ReportPreview;