import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from './store/auth_slice';
import * as S from './auth_styles';

export const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Заполните все поля');
      return;
    }

    const users = JSON.parse(localStorage.getItem('eco_users') || '{}');

    if (isLoginMode) {
      if (users[username] && users[username] === password) {
        dispatch(loginSuccess(username));
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } else {
      if (users[username]) {
        setError('Пользователь с таким именем уже существует');
      } else {
        users[username] = password;
        localStorage.setItem('eco_users', JSON.stringify(users));
        dispatch(loginSuccess(username));
      }
    }
  };

  return (
    <S.AuthContainer>
      <S.LogoWrapper>
        <Leaf />
      </S.LogoWrapper>
      
      <S.Title>
        {isLoginMode ? 'Войти в EcoTrack' : 'Создать аккаунт'}
      </S.Title>

      <S.FormCard 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <form onSubmit={handleSubmit}>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          
          <S.Label>Имя пользователя</S.Label>
          <S.Input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="eco_user"
          />

          <S.Label>Пароль</S.Label>
          <S.Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
          />

          <S.SubmitButton type="submit">
            {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
          </S.SubmitButton>
        </form>
      </S.FormCard>

      <S.ToggleModeCard>
        {isLoginMode ? 'Впервые у нас?' : 'Уже есть аккаунт?'}
        <button type="button" onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}>
          {isLoginMode ? 'Создайте аккаунт.' : 'Войдите в систему.'}
        </button>
      </S.ToggleModeCard>
    </S.AuthContainer>
  );
};

export default AuthForm;