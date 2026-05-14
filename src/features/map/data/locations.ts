import { EcoLocation } from "../types";

export const locations: EcoLocation[] = [
  {
    id: 1,
    name: "Пункт приёма пластика №1",
    type: "recycle",
    lat: 55.7558,
    lng: 37.6173,
    address: "ул. Тверская, 15",
    hours: "Пн-Пт: 9:00-18:00",
    description: "Принимаем пластик, стекло, металл",
  },
  {
    id: 2,
    name: "Велопарковка Central",
    type: "bike",
    lat: 55.7589,
    lng: 37.6201,
    address: "Манежная площадь",
    hours: "Круглосуточно",
    description: "50 мест, охраняемая территория",
  },
  {
    id: 3,
    name: "Эко-маркет Green Life",
    type: "event",
    lat: 55.7541,
    lng: 37.6210,
    address: "Арбат, 25",
    hours: "Вт-Вс: 10:00-20:00",
    description: "Органические продукты, zero waste товары",
  },
];
