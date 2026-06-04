import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { MapMarker } from "./MapMarker";
import type { EcoLocation } from "../../components/map/types";
import "leaflet/dist/leaflet.css";
import "./MapContainerBlock.css";
import { useEffect } from "react";

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);

  useEffect(() => {
    const handleCenterOnUser = (event: Event) => {
      const customEvent = event as CustomEvent<{ lat: number; lng: number }>;
      if (customEvent.detail != null) {
        map.setView([customEvent.detail.lat, customEvent.detail.lng], 15);
      }
    };

    window.addEventListener("centerOnUser", handleCenterOnUser);
    return () => window.removeEventListener("centerOnUser", handleCenterOnUser);
  }, [map]);

  return null;
}

type MapContainerBlockProps = {
    locations: EcoLocation[];
    userLocation?: { lat: number; lng: number } | null;
    locationError?: string | null;
  deleteLocation?: (id: number) => void;
};

export function MapContainerBlock({ locations, userLocation, locationError, deleteLocation }: MapContainerBlockProps) {
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [55.7558, 37.6173];
  
  const zoom = userLocation ? 15 : 12;

  return (
    <div className="map-container-block">
      <div className="map-container-block__inner">
        {locationError != null && locationError !== "" && (
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
            <MapMarker key={loc.id} location={loc} onDelete={deleteLocation} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}