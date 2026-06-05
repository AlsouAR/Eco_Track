import { useState } from "react";

import { Loader2, Plus, Search, X } from "lucide-react";

import * as S from "./AddLocationModal.styles";

import type { EcoLocation, LocationType } from "../../components/map/types";

type FormData = {
  name: string;
  type: LocationType;
  address: string;
  description: string;
  hours: string;
};

export function AddLocationModal({
  close,
  onAdd,
}: {
  close: () => void;
  onAdd: (location: Omit<EcoLocation, "id">) => void;
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

      if (Array.isArray(data) && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "address") {
      setGeocodeError("");
    }

    if (errors[name as keyof FormData] !== undefined) {
      setErrors((prev) => ({ ...prev, [name as keyof FormData]: undefined }));
    }
  };

  const handleAddToMyMap = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Укажите название точки.";
    }
    if (!formData.address.trim()) {
      validationErrors.address = "Укажите адрес.";
    }
    if (!formData.description.trim()) {
      validationErrors.description = "Добавьте краткое описание.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setGeocodeError("");

    const coords = await geocodeAddress(formData.address);

    if (!coords) {
      setGeocodeError(
        "Не удалось определить координаты по указанному адресу. Пожалуйста, уточните адрес."
      );
      return;
    }

    onAdd({
      name: formData.name,
      type: formData.type,
      address: formData.address,
      hours: formData.hours,
      description: formData.description,
      lat: coords.lat,
      lng: coords.lng,
    });

    close();
  };

  const handleSendSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Эта функция пока не работает. Используйте 'Добавить себе'");
  };

  return (
    <S.Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={close}>
      <S.Card
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <S.Header>
          <S.TitleRow>
            <S.IconBox>
              <Plus className="w-6 h-6" />
            </S.IconBox>
            <S.Title>Предложить точку</S.Title>
          </S.TitleRow>
          <S.CloseButton onClick={close}>
            <X className="w-5 h-5" />
          </S.CloseButton>
        </S.Header>

        <S.Form>
          {/* Название места */}
          <div>
            <S.FieldLabel>
              Название места <span style={{ color: "red" }}>*</span>
            </S.FieldLabel>
            <S.Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Например: Пункт приёма пластика"
              $hasError={errors.name != null && errors.name !== ""}
            />
            {errors.name != null && errors.name !== "" && (
              <S.ErrorMessage>{errors.name}</S.ErrorMessage>
            )}
          </div>

          {/* Тип */}
          <div>
            <S.FieldLabel>
              Тип <span style={{ color: "red" }}>*</span>
            </S.FieldLabel>
            <S.Select name="type" value={formData.type} onChange={handleChange}>
              <option value="recycle">♻️ Приём пластика</option>
              <option value="bike">🚲 Велопарковка</option>
              <option value="event">🌿 Эко-ивент</option>
            </S.Select>
          </div>

          {/* Адрес */}
          <div>
            <S.FieldLabel>
              Адрес <span style={{ color: "red" }}>*</span>
            </S.FieldLabel>
            <S.AddressFieldWrapper>
              <S.Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Например: Москва, ул. Тверская, 15"
                $hasError={(errors.address != null && errors.address !== "") || geocodeError !== ""}
              />
              {isGeocoding && (
                <S.GeocodingSpinner>
                  <Loader2 className="w-4 h-4 spin" />
                </S.GeocodingSpinner>
              )}
            </S.AddressFieldWrapper>
            {errors.address != null && errors.address !== "" && (
              <S.ErrorMessage>{errors.address}</S.ErrorMessage>
            )}
            {geocodeError !== "" && <S.GeocodeError>{geocodeError}</S.GeocodeError>}
            <S.AddressHint>
              <Search className="w-3 h-3" />
              <span>Координаты определятся автоматически по адресу</span>
            </S.AddressHint>
          </div>

          {/* Часы работы */}
          <div>
            <S.FieldLabel>Часы работы</S.FieldLabel>
            <S.Input
              type="text"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder="Например: Пн-Пт: 9:00-18:00"
              $hasError={false}
            />
          </div>

          {/* Описание */}
          <div>
            <S.FieldLabel>
              Описание <span style={{ color: "red" }}>*</span>
            </S.FieldLabel>
            <S.Textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Расскажите подробнее"
              $hasError={errors.description != null && errors.description !== ""}
            />
            {errors.description != null && errors.description !== "" && (
              <S.ErrorMessage>{errors.description}</S.ErrorMessage>
            )}
          </div>

          {/* Кнопки */}
          <S.ButtonRow>
            <S.PrimaryButton type="button" onClick={handleAddToMyMap} disabled={isGeocoding}>
              {isGeocoding ? (
                <>
                  <Loader2 className="w-4 h-4 spin" />
                  Определяем координаты...
                </>
              ) : (
                "Добавить себе"
              )}
            </S.PrimaryButton>

            <S.SecondaryButton type="button" onClick={handleSendSuggestion}>
              Отправить предложение
            </S.SecondaryButton>
          </S.ButtonRow>
        </S.Form>
      </S.Card>
    </S.Overlay>
  );
}
