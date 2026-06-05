import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import * as S from "./ExitButton.styles";

const ExitButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <S.LogoutButton onClick={handleLogout}>
      <LogOut size={18} strokeWidth={1.8} />
      <span>Выйти из аккаунта</span>
    </S.LogoutButton>
  );
};

export default ExitButton;
