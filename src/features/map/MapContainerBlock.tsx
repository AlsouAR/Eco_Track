import { MapContainer, TileLayer } from "react-leaflet";
import { MapMarker } from "./MapMarker";
import { EcoLocation } from "../../components/map/types";
import "./MapContainerBlock.css";

export function MapContainerBlock({ locations }: { locations: EcoLocation[] }) {
    return (
        <div className="map-container-block">
            <div className="map-container-block__inner">
                <MapContainer
                    center={[55.7558, 37.6173]}
                    zoom={14}
                    className="map-container-block__map"
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
