import type { EcoLocation } from "../../components/map/types";
import { MapPin, Clock } from "lucide-react";
import * as S from "./MapPopup.styles";

export function MapPopup({ location, onDelete }: { location: EcoLocation; onDelete?: () => void }) {
  const handleDelete = () => {
    if (!onDelete) {
      return;
    }

    if (window.confirm("Удалить эту метку? Это действие нельзя отменить.")) {
      onDelete();
    }
  };

  const iconColor = (() => {
    switch (location.type) {
      case "recycle":
        return "#4FC3F7";
      case "bike":
        return "#66BB6A";
      default:
        return "#FFA726";
    }
  })();

  return (
    <>
      <S.PopupGlobalStyles />
      <S.MapPopupWrapper>
        <S.PopupHeader>
          <S.PopupIcon $bgColor={iconColor}>
            {location.type === "recycle" ? "♻️" : location.type === "bike" ? "🚲" : "🌿"}
          </S.PopupIcon>

          <S.PopupInfo>
            <S.PopupTitle>{location.name}</S.PopupTitle>
            <S.PopupDescription>{location.description}</S.PopupDescription>
          </S.PopupInfo>
        </S.PopupHeader>

        <S.PopupDetails>
          <S.PopupDetail>
            <MapPin className="w-4 h-4" />
            <span>{location.address}</span>
          </S.PopupDetail>

          <S.PopupDetail>
            <Clock className="w-4 h-4" />
            <span>{location.hours}</span>
          </S.PopupDetail>
        </S.PopupDetails>

        <S.PopupButton onClick={handleDelete}>Удалить метку</S.PopupButton>
      </S.MapPopupWrapper>
    </>
  );
}
