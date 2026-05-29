import { useState } from "react";
import styled from '@emotion/styled';
import { MapFilters } from "../../features/map/MapFilters";
import { MapContainerBlock } from "../../features/map/MapContainerBlock";
import { AddLocationModal } from "../../features/map/AddLocationModal";
import { EcoLocation, LocationType } from "../../components/map/types";
import { useLocations } from "../../store/useLocations";


// Container для группировки компонентов
const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1B5E20;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #558B2F;
`;

const FilterSection = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(16, 185, 129, 0.12);
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  padding: 1.5rem;
`;

const MapCard = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(16, 185, 129, 0.12);
  border-radius: 1rem;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.06);
  padding: 1.25rem;
`;

export default function MapPage() {
    const [selectedType, setSelectedType] = useState<LocationType | "all">("all");
    const [showModal, setShowModal] = useState(false);

    const { locations, addLocation } = useLocations();

    const filtered = selectedType === "all"
        ? locations
        : locations.filter((l) => l.type === selectedType);

    const handleAddLocation = (newLocationData: Omit<EcoLocation, 'id'>) => {
      addLocation(newLocationData);
      setShowModal(false);
    }

    return (
        <PageContainer>
            <HeaderSection>
                <Title>Карта эко-инициатив</Title>
                <Subtitle>Найдите ближайшие точки для эко-действий</Subtitle>
            </HeaderSection>

            <FilterSection>
                <MapFilters
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    openModal={() => setShowModal(true)}
                />
            </FilterSection>

            <MapCard>
                <MapContainerBlock locations={filtered} />
            </MapCard>

            {showModal && 
              <AddLocationModal 
              close={() => setShowModal(false)}
              onAdd={handleAddLocation}
              />}
        </PageContainer>
    );
}
