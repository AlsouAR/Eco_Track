import { MapContainer, TileLayer } from "react-leaflet";
import { MapMarker } from "./MapMarker";
import { EcoLocation } from "../../features/map/types";

export function MapContainerBlock({ locations }: { locations: EcoLocation[] }) {
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[var(--border)]">
            <div className="rounded-2xl overflow-hidden" style={{ minHeight: 450, height: 450 }}>
                <MapContainer
                    center={[55.7558, 37.6173]}
                    zoom={12}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="© OpenStreetMap contributors"
                    />

                    {locations.map((loc) => (
                        <MapMarker key={loc.id} location={loc} />
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
