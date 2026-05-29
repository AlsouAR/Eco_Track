import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { MapMarker } from "./MapMarker";
import { EcoLocation } from "../../components/map/types";
import "leaflet/dist/leaflet.css";
import "./MapContainerBlock.css";
import { useEffect } from "react";

// Компонент для управления центром карты
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, zoom);
        }
    }, [center, map, zoom]);

    return null;
}

type MapContainerBlockProps = {
    locations: EcoLocation[];
    userLocation?: { lat: number; lng: number } | null;
    locationError?: string | null;
};

export function MapContainerBlock({ locations, userLocation, locationError }: MapContainerBlockProps) {
  // Центр карты: если есть геолокация - показываем её, иначе Москва по умолчанию
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [55.7558, 37.6173];
  
  const zoom = userLocation ? 15 : 12; // Приближаем ближе, если есть геолокация

  return (
    <div className="map-container-block">
      <div className="map-container-block__inner">
        {locationError && (
          <div className="location-error-banner">
            <span>{locationError}</span>
            <button onClick={() => window.location.reload()}>
              Попробовать снова
            </button>
          </div>
        )}
        
        <MapContainer
          center={center}
          zoom={zoom}
          className="map-container-block__map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <MapController center={center} zoom={zoom} />
          
          {locations.map((loc) => (
            <MapMarker key={loc.id} location={loc} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}