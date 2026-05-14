import { motion } from "motion/react";
export default function MapHeader() {

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
                Карта эко-инициатив
            </h1>
            <p className="text-[var(--muted-foreground)]">
                Найдите ближайшие точки для эко-действий или предложите свою!
            </p>
        </motion.div>
    )
}