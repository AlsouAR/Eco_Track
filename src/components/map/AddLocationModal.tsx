import { motion } from "motion/react";
import { X, Plus } from "lucide-react";
import "./AddLocationModal.css";

export function AddLocationModal({ close }: { close: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="add-location-modal__overlay"
      onClick={close}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="add-location-modal__card"
      >
        {/* Header */}
        <div className="add-location-modal__header">
          <div className="add-location-modal__title-row">
            <div className="add-location-modal__icon">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="add-location-modal__title">Предложить точку</h3>
          </div>
          <button
            onClick={close}
            className="add-location-modal__close"
          >
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Form */}
        <form className="add-location-modal__form">
          {/* Название места */}
          <div>
            <label className="add-location-modal__field-label">
              Название места
            </label>
            <input
              type="text"
              placeholder="Например: Пункт приёма пластика"
              className="add-location-modal__input"
            />
          </div>

          {/* Тип */}
          <div>
            <label className="add-location-modal__field-label">
              Тип
            </label>
            <select className="add-location-modal__select">
              <option value="recycle">Приём пластика</option>
              <option value="bike">Велопарковка</option>
              <option value="event">Эко-ивент</option>
            </select>
          </div>

          {/* Адрес */}
          <div>
            <label className="add-location-modal__field-label">
              Адрес
            </label>
            <input
              type="text"
              placeholder="Укажите точный адрес"
              className="add-location-modal__input"
            />
          </div>

          {/* Описание */}
          <div>
            <label className="add-location-modal__field-label">
              Описание
            </label>
            <textarea
              rows={3}
              placeholder="Расскажите подробнее"
              className="add-location-modal__textarea"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="add-location-modal__submit"
          >
            Отправить предложение
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
