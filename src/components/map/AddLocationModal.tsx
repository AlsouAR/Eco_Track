import { motion } from "motion/react";
import { X, Plus } from "lucide-react";

export function AddLocationModal({ close }: { close: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      onClick={close}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Предложить точку</h3>
          </div>

          <button
            onClick={close}
            className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4">
          <input className="w-full px-4 py-3 rounded-xl border" placeholder="Название" />
          <select className="w-full px-4 py-3 rounded-xl border">
            <option>Приём пластика</option>
            <option>Велопарковка</option>
            <option>Эко-ивент</option>
          </select>
          <input className="w-full px-4 py-3 rounded-xl border" placeholder="Адрес" />
          <textarea className="w-full px-4 py-3 rounded-xl border" rows={3} placeholder="Описание" />

          <button className="w-full py-3 rounded-xl bg-green-500 text-white font-bold">
            Отправить
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
