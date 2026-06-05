import { Marker, Popup } from "react-leaflet";
import type { EcoLocation } from "../../components/map/types";
import { getMarkerIcon } from "../../components/map/lib/getMarketIcon";
import { MapPopup } from "./MapPopup";

export function MapMarker({
  location,
  onDelete,
}: {
  location: EcoLocation;
  onDelete?: ((id: number) => void) | undefined;
}) {
  return (
    <Marker position={[location.lat, location.lng]} icon={getMarkerIcon(location.type)}>
      <Popup className="custom-popup">
        <MapPopup location={location} onDelete={() => onDelete?.(location.id)} />
      </Popup>
    </Marker>
  );
}
