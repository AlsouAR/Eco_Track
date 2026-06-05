import { useState } from "react";

import { Trash2 } from "lucide-react";

import * as S from "./ActionButtons.styles";
import { DeleteConfirm } from "./DeleteConfirm";
import { useAppDispatch } from "../../store/hooks";
import { resetAllProgress as resetHabitsProgress } from "../habits/store/habitsSlice";
import { resetAllProgress as resetProfileProgress } from "../profile/store/profileSlice";

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
      <S.ButtonsWrapper>
        <S.ResetButton onClick={() => setIsModalOpen(true)}>
          <Trash2 size={18} strokeWidth={1.8} />
          <span>Сбросить прогресс</span>
        </S.ResetButton>
      </S.ButtonsWrapper>

      <DeleteConfirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleReset}
      />
    </>
  );
}

export default ActionButtons;
