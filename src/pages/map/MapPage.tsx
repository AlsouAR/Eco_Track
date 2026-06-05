import { useState } from "react";
import { MapFilters } from "../../features/map/MapFilters";
import { MapContainerBlock } from "../../features/map/MapContainerBlock";
import { AddLocationModal } from "../../features/map/AddLocationModal";
import type { LocationType, EcoLocation } from "../../components/map/types";
import { useLocations } from "../../store/useLocations";
import { useGeolocation } from "../../store/useGeolocation";
import * as S from "./MapPage.styles";

export default function MapPage() {
  const [selectedType, setSelectedType] = useState<LocationType | "all">("all");
  const [showModal, setShowModal] = useState(false);

  const { locations, addLocation, deleteLocation } = useLocations();
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();

  const filtered =
    selectedType === "all" ? locations : locations.filter((l) => l.type === selectedType);

  const handleAddLocation = (newLocationData: Omit<EcoLocation, "id">) => {
    addLocation(newLocationData);
    setShowModal(false);
  };

  const userLocation =
    latitude != null && longitude != null ? { lat: latitude, lng: longitude } : null;

  const centerOnUser = () => {
    if (userLocation) {
      window.dispatchEvent(new CustomEvent("centerOnUser", { detail: userLocation }));
    }
  };

  return (
    <S.PageContainer>
      <S.ContentWrapper>
        <S.HeaderSection>
          <S.Title>Карта эко-инициатив</S.Title>
          <S.Subtitle>Найдите ближайшие точки для эко-действий</S.Subtitle>
        </S.HeaderSection>

        <S.FilterSection>
          <MapFilters
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            openModal={() => setShowModal(true)}
          />
        </S.FilterSection>

        <S.MapCard>
          <S.MapWrapper>
            <MapContainerBlock
              locations={filtered}
              userLocation={userLocation}
              locationError={geoError}
              deleteLocation={deleteLocation}
            />

            {!geoLoading && userLocation && (
              <S.GeolocationStatus isActive={true} onClick={centerOnUser}>
                <span>📍</span>
                <span>Моё местоположение</span>
              </S.GeolocationStatus>
            )}

            {!geoLoading && geoError != null && geoError !== "" && (
              <S.GeolocationStatus isActive={false}>
                <span>⚠️</span>
                <span>{geoError}</span>
              </S.GeolocationStatus>
            )}
          </S.MapWrapper>
        </S.MapCard>

        {showModal && (
          <AddLocationModal close={() => setShowModal(false)} onAdd={handleAddLocation} />
        )}
      </S.ContentWrapper>
    </S.PageContainer>
  );
}
