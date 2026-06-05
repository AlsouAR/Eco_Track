import { useState, useEffect } from "react";
import type { EcoLocation } from "../components/map/types";
import { locations as initialLocations } from "../components/map/data/locations";

const STORAGE_KEY = "eco_locations";

export function useLocations() {
  const [locations, setLocations] = useState<EcoLocation[]>([]);

  // Загрузка данных при монтировании
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      // Если есть сохранённые данные - используем их
      setLocations(JSON.parse(saved));
    } else {
      // Иначе сохраняем начальные данные в localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLocations));
      setLocations(initialLocations);
    }
  }, []);

  // Функция добавления новой локации
  const addLocation = (newLocation: Omit<EcoLocation, "id">) => {
    const newId = Math.max(...locations.map((l) => l.id), 0) + 1;

    const locationToAdd: EcoLocation = {
      ...newLocation,
      id: newId,
    };

    const updatedLocations = [...locations, locationToAdd];
    setLocations(updatedLocations);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocations));

    return locationToAdd;
  };

  const deleteLocation = (id: number) => {
    const updatedLocations = locations.filter((l) => l.id !== id);
    setLocations(updatedLocations);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocations));
  };

  return { locations, addLocation, deleteLocation };
}
