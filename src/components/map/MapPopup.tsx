import { EcoLocation } from "../../features/map/types";
import { MapPin, Clock } from "lucide-react";

export function MapPopup({ location }: { location: EcoLocation }) {
  return (
    <div className="p-3 min-w-[280px]">
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{
            background:
              location.type === "recycle"
                ? "#4FC3F7"
                : location.type === "bike"
                ? "#66BB6A"
                : "#FFA726",
          }}
        >
          {location.type === "recycle"
            ? "♻️"
            : location.type === "bike"
            ? "🚲"
            : "🌿"}
        </div>

        <div className="flex-1">
          <h3 className="font-bold mb-1">{location.name}</h3>
          <p className="text-sm text-gray-500">{location.description}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>{location.address}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{location.hours}</span>
        </div>
      </div>

      <button className="w-full mt-3 py-2 px-4 rounded-lg bg-green-500 text-white font-medium text-sm">
        Проложить маршрут
      </button>
    </div>
  );
}
