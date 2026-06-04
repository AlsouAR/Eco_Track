import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from './store/auth_slice';
import * as S from './auth_styles';
import { updateUserData } from '../profile_components/userData';

export const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (password: string): boolean => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;
      return passwordRegex.test(password);
    };

    const getPasswordError = (password: string): string | null => {
      if (password.length === 0) return null;
      if (password.length < 5) {
        return 'Пароль должен содержать минимум 5 символов из цифр и латинских букв';
      }
      if (!/[A-Za-z]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну латинскую букву';
      }
      if (!/\d/.test(password)) {
        return 'Пароль должен содержать хотя бы одну цифру';
      }
      return null;
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Заполните все поля');
      return;
    }
    if (!isLoginMode && !validatePassword(password)) {
        setError('Пароль: минимум 5 символов, хотя бы одна латинская буква и одна цифра');
        return;
    }
    const users = JSON.parse(localStorage.getItem('eco_users') || '{}');

    if (isLoginMode) {
      if (users[username] && users[username] === password) {
        updateUserData(username);
        dispatch(loginSuccess(username));
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } else {
      if (users[username]) {
        setError('Пользователь с таким именем уже существует');
      } else {
        users[username] = password;
        updateUserData(username);
        localStorage.setItem('eco_users', JSON.stringify(users));
        dispatch(loginSuccess(username));
      }
    }
  };
  
  const passwordError = !isLoginMode ? getPasswordError(password) : null;
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