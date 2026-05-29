import { Download, Trash2 } from 'lucide-react';
import './ActionButtons.css';

function ActionButtons() {
  const handleExport = () => {
    console.log('Экспорт данных');
  };
  const handleReset = () => {
    console.log('Сброс прогресса ');
  };

  return (
    <div className="action-buttons">
      <button className="action-btn" onClick={handleExport}>
        <Download size={18} strokeWidth={1.8} />
        <span>Экспорт данных</span>
      </button>
      
      <button className="action-btn reset-btn" onClick={handleReset}>
        <Trash2 size={18} strokeWidth={1.8} />
        <span>Сбросить прогресс</span>
      </button>
    </div>
  );
}

export default ActionButtons;