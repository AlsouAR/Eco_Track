import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { resetAllProgress as resetHabitsProgress } from "../habits/store/habits_slice";
import { resetAllProgress as resetProfileProgress } from "../profile/store/profile_slice";
import { DeleteConfirm } from "./DeleteConfirm";
import "./ActionButtons.css";

function ActionButtons() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    try {
      dispatch(resetHabitsProgress());
      dispatch(resetProfileProgress());
      alert("Прогресс успешно сброшен!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Ошибка при сбросе:", error);
      alert("Ошибка при сбросе прогресса");
    }
  };

  return (
    <>
      <div className="action-buttons">
        <button className="action-btn" onClick={() => setIsModalOpen(true)}>
          <Trash2 size={18} strokeWidth={1.8} />
          <span>Сбросить прогресс</span>
        </button>
      </div>

      <DeleteConfirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleReset}
      />
    </>
  );
}

export default ActionButtons;
