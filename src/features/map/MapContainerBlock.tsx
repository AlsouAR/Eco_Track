import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

import { MapContainer, TileLayer, useMap } from "react-leaflet";

import * as S from "./MapContainerBlock.styles";
import { MapMarker } from "./MapMarker";

import type { EcoLocation } from "../../components/map/types";

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

export function MapContainerBlock({
  locations,
  userLocation,
  locationError,
  deleteLocation,
}: MapContainerBlockProps) {
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [55.7558, 37.6173];

  const zoom = userLocation ? 15 : 12;

  return (
    <S.BlockWrapper>
      <S.BlockInner>
        {locationError != null && locationError !== "" && (
          <S.ErrorBanner>
            <span>{locationError}</span>
            <S.ErrorButton onClick={() => window.location.reload()}>
              Попробовать снова
            </S.ErrorButton>
          </S.ErrorBanner>
        )}

        <MapContainer center={center} zoom={zoom} className="map-container-block__map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MapController center={center} zoom={zoom} />

          {locations.map((loc) => (
            <MapMarker key={loc.id} location={loc} onDelete={deleteLocation} />
          ))}
        </MapContainer>
      </S.BlockInner>
    </S.BlockWrapper>
  );
}
