import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from './store/auth_slice';
import './exit_button.css';

const ExitButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Вызываем action из Redux
    console.log('Выход из аккаунта');
    //window.location.href = '/tracker';
  };
  

  return (
    <button className="logout-btn" onClick={handleLogout}>
      <LogOut size={18} strokeWidth={1.8} />
      <span>Выйти из аккаунта</span>
    </button>
  );
};

export default ExitButton;