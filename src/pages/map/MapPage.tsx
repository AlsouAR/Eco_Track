import { useState } from "react";
import { MapFilters } from "../../components/map/MapFilters";
import { MapContainerBlock } from "../../components/map/MapContainerBlock";
import { AddLocationModal } from "../../components/map/AddLocationModal";
import { locations } from "../../features/map/data/locations";
import { LocationType } from "../../features/map/types";
import MapHeader from "../../components/map/MapHeader";

export default function MapPage() {
    const [selectedType, setSelectedType] = useState<LocationType | "all">("all");
    const [showModal, setShowModal] = useState(false);

    const filtered = selectedType === "all"
        ? locations
        : locations.filter((l) => l.type === selectedType);

    return (
        <main className="page-wrapper">
            <div className="mx-auto max-w-6xl space-y-6">
                <div className="rounded-[2rem] border border-[rgba(16,185,129,0.18)] bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                    <MapHeader />
                    <MapFilters
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        openModal={() => setShowModal(true)}
                    />
                </div>

                <section className="map-frame rounded-[2rem] border border-[rgba(16,185,129,0.14)] bg-white/95 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.07)]">
                    <MapContainerBlock locations={filtered} />
                </section>

                {showModal && <AddLocationModal close={() => setShowModal(false)} />}
            </div>
        </main>
    );
}
