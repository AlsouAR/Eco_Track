import { Marker, Popup } from "react-leaflet";
import { EcoLocation } from "../../features/map/types";
import { getMarkerIcon } from "../../features/map/lib/getMarketIcon";
import { MapPopup } from "./MapPopup";

export function MapMarker({ location }: { location: EcoLocation }) {
  return (
    <Marker
      position={[location.lat, location.lng]}
      icon={getMarkerIcon(location.type)}
    >
      <Popup className="custom-popup">
        <MapPopup location={location} />
      </Popup>
    </Marker>
  );
}
