import L from "leaflet";

import type { LocationType } from "../types";

export const getMarkerIcon = (type: LocationType) => {
  const colors = {
    recycle: "#4FC3F7",
    bike: "#66BB6A",
    event: "#FFA726",
  };

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background: ${colors[type]};
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="transform: rotate(45deg); color: white; font-size: 20px;">
          ${type === "recycle" ? "♻️" : type === "bike" ? "🚲" : "🌿"}
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};
