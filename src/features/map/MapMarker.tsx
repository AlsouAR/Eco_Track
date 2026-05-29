import { Marker, Popup } from "react-leaflet";
import { EcoLocation } from "../../components/map/types";
import { getMarkerIcon } from "../../components/map/lib/getMarketIcon";
import { MapPopup } from "./MapPopup";
import "./MapMarker.css";

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
