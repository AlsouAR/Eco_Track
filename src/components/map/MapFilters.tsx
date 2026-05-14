import { motion } from "motion/react";
import { MapPin, Recycle, Bike, Leaf, Plus } from "lucide-react";
import { LocationType } from "../../features/map/types";

type Props = {
    selectedType: LocationType | "all";
    setSelectedType: (t: LocationType | "all") => void;
    openModal: () => void;
};

export function MapFilters({ selectedType, setSelectedType, openModal }: Props) {
    const filters = [
        { type: "all", label: "Все", icon: MapPin, color: "#4CAF50" },
        { type: "recycle", label: "Приём пластика", icon: Recycle, color: "#4FC3F7" },
        { type: "bike", label: "Велопарковки", icon: Bike, color: "#66BB6A" },
        { type: "event", label: "Эко-ивенты", icon: Leaf, color: "#FFA726" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-4 shadow-lg border"
        >
            <div className="flex flex-wrap gap-3">
                {filters.map((filter, index) => {
                    const Icon = filter.icon;
                    const isActive =
                        filter.type === selectedType || filter.type === "all";

                    return (
                        <motion.button
                            key={filter.type}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedType(filter.type as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${isActive
                                    ? "text-white shadow-lg"
                                    : "bg-[var(--eco-light)]/30 text-[var(--foreground)] hover:bg-[var(--eco-light)]/50"
                                }`}
                            style={{
                                background: isActive
                                    ? `linear-gradient(135deg, ${filter.color}, ${filter.color}dd)`
                                    : undefined,
                            }}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{filter.label}</span>
                        </motion.button>
                    );
                })}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openModal}
                    className="ml-auto flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-500 text-white shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    <span>Предложить точку</span>
                </motion.button>
            </div>
        </motion.div>
    );
}
