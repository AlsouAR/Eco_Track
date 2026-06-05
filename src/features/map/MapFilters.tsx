import { motion } from "motion/react";
import { MapPin, Recycle, Bike, Leaf, Plus } from "lucide-react";
import type { LocationType } from "../../components/map/types";
import * as S from "./MapFilters.styles";

const MotionFilterButton = motion(S.FilterButton);
const MotionActionButton = motion(S.ActionButton);

type FilterType = LocationType | "all";

type Filter = {
  type: FilterType;
  label: string;
  icon: typeof MapPin;
  color: string;
};

type Props = {
  selectedType: FilterType;
  setSelectedType: (t: FilterType) => void;
  openModal: () => void;
};

export function MapFilters({ selectedType, setSelectedType, openModal }: Props) {
  const filters: Filter[] = [
    { type: "all", label: "Все", icon: MapPin, color: "#4CAF50" },
    { type: "recycle", label: "Приём пластика", icon: Recycle, color: "#29B6F6" },
    { type: "bike", label: "Велопарковки", icon: Bike, color: "#66BB6A" },
    { type: "event", label: "Эко-ивенты", icon: Leaf, color: "#FFA726" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <S.FiltersWrapper>
        <S.FilterList>
          {filters.map((filter, index) => {
            const Icon = filter.icon;
            const isActive = filter.type === selectedType;

            return (
              <MotionFilterButton
                key={filter.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(filter.type)}
                $active={isActive}
                $color={filter.color}
              >
                <Icon className="w-5 h-5" />
                <span>{filter.label}</span>
              </MotionFilterButton>
            );
          })}

          <MotionActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
          >
            <Plus className="w-5 h-5" />
            <span>Предложить точку</span>
          </MotionActionButton>
        </S.FilterList>
      </S.FiltersWrapper>
    </motion.div>
  );
}
