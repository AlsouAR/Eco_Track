import { EcoLocation } from "../../components/map/types";
import { MapPin, Clock } from "lucide-react";
import "./MapPopup.css";

export function MapPopup({
  location,
  onDelete,
}: {
  location: EcoLocation;
  onDelete?: () => void;
}) {
  const handleDelete = () => {
    if (!onDelete) return;
    if (window.confirm("Удалить эту метку? Это действие нельзя отменить.")) {
      onDelete();
    }
  };

  return (
    <div className="map-popup">
      <div className="map-popup__header">
        <div
          className="map-popup__icon"
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

        <div className="map-popup__info">
          <h3 className="map-popup__title">{location.name}</h3>
          <p className="map-popup__description">{location.description}</p>
        </div>
      </div>

      <div className="map-popup__details">
        <div className="map-popup__detail">
          <MapPin className="w-4 h-4" />
          <span>{location.address}</span>
        </div>

        <div className="map-popup__detail">
          <Clock className="w-4 h-4" />
          <span>{location.hours}</span>
        </div>
      </div>

      <button className="map-popup__button" onClick={handleDelete}>
        Удалить метку
      </button>
    </div>
  );
}
