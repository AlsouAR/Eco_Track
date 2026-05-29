import { useState } from "react";
import { motion } from "motion/react";
import { X, Plus, Search, Loader2 } from "lucide-react";
import { EcoLocation, LocationType } from "../../components/map/types";
import "./AddLocationModal.css";

// Тип для данных формы
type FormData = {
  name: string;
  type: LocationType;
  address: string;
  description: string;
  hours: string;
};

export function AddLocationModal({
  close, onAdd
}: {
  close: () => void;
  onAdd: (location: Omit<EcoLocation, 'id'>) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "recycle",
    address: "",
    description: "",
    hours: "Пн-Пт: 9:00-18:00",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState<string>("");

  // Функция для получения координат по адресу (геокодинг)
  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      setIsGeocoding(true);
      setGeocodeError("");
      
      // Используем Nominatim API (OpenStreetMap)
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`
      );
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
      return null;
    } catch (error) {
      console.error("Ошибка геокодинга:", error);
      return null;
    } finally {
      setIsGeocoding(false);
    }
  };

  // Обработчик изменения полей
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Если меняется адрес - очищаем ошибку геокодинга
    if (name === 'address') {
      setGeocodeError("");
    }
    
    // Очищаем ошибку для этого поля
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name as keyof FormData]: undefined }));
    }
  };

  // Валидация формы
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Название обязательно";
    if (!formData.address.trim()) newErrors.address = "Адрес обязателен";
    if (!formData.description.trim()) newErrors.description = "Описание обязательно";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Функция для добавления точки на карту
  const handleAddToMyMap = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    // Получаем координаты по адресу
    const coords = await geocodeAddress(formData.address);
    
    if (!coords) {
      setGeocodeError("Не удалось определить координаты по указанному адресу. Пожалуйста, уточните адрес.");
      return;
    }
    
    // Отправляем данные с полученными координатами
    onAdd({
      name: formData.name,
      type: formData.type,
      address: formData.address,
      hours: formData.hours,
      description: formData.description,
      lat: coords.lat,
      lng: coords.lng,
    });
    
    // Закрываем модальное окно
    close();
  };

  // Функция для отправки предложения (пока не работает)
  const handleSendSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Эта функция пока не работает. Используйте 'Добавить себе'");
  };

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
          <button onClick={close} className="add-location-modal__close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="add-location-modal__form">
          {/* Название места */}
          <div>
            <label className="add-location-modal__field-label">
              Название места <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Например: Пункт приёма пластика"
              className={`add-location-modal__input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Тип */}
          <div>
            <label className="add-location-modal__field-label">
              Тип <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="add-location-modal__select"
            >
              <option value="recycle">♻️ Приём пластика</option>
              <option value="bike">🚲 Велопарковка</option>
              <option value="event">🌿 Эко-ивент</option>
            </select>
          </div>

          {/* Адрес (главное поле) */}
          <div>
            <label className="add-location-modal__field-label">
              Адрес <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="address-input-wrapper">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Например: Москва, ул. Тверская, 15"
                className={`add-location-modal__input ${errors.address || geocodeError ? 'error' : ''}`}
              />
              {isGeocoding && (
                <div className="geocoding-spinner">
                  <Loader2 className="w-4 h-4 spin" />
                </div>
              )}
            </div>
            {errors.address && <span className="error-message">{errors.address}</span>}
            {geocodeError && <span className="error-message geocode-error">{geocodeError}</span>}
            <div className="address-hint">
              <Search className="w-3 h-3" />
              <span>Координаты определятся автоматически по адресу</span>
            </div>
          </div>

          {/* Часы работы */}
          <div>
            <label className="add-location-modal__field-label">
              Часы работы
            </label>
            <input
              type="text"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder="Например: Пн-Пт: 9:00-18:00"
              className="add-location-modal__input"
            />
          </div>

          {/* Описание */}
          <div>
            <label className="add-location-modal__field-label">
              Описание <span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Расскажите подробнее"
              className={`add-location-modal__textarea ${errors.description ? 'error' : ''}`}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Кнопки */}
          <div className="form-buttons">
            <button
              type="button"
              onClick={handleAddToMyMap}
              disabled={isGeocoding}
              className="add-location-modal__submit add-location-modal__submit--primary"
            >
              {isGeocoding ? (
                <>
                  <Loader2 className="w-4 h-4 spin" />
                  Определяем координаты...
                </>
              ) : (
                'Добавить себе'
              )}
            </button>

            <button
              type="button"
              onClick={handleSendSuggestion}
              className="add-location-modal__submit add-location-modal__submit--secondary"
            >
              Отправить предложение
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}