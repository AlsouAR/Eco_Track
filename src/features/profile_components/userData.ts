const getStoredUsername = (): string => {
  if (typeof window === 'undefined') return 'Гость';
  const session = localStorage.getItem('eco_session');
  return session ?? "Гость";
};

const getRegistrationDate = (): string => {
  if (typeof window === 'undefined') return '01.01.2024';
  const saved = localStorage.getItem('user_registered_date');
  if (saved !== null) {return saved;}
  
  const today = new Date();
  const formatted = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
  localStorage.setItem('user_registered_date', formatted);
  return formatted;
};

export const userData = {
  name: getStoredUsername(),
  avatar: null as string | null,
  registeredDate: getRegistrationDate(),
};
export const updateUserData = (username: string) => {
  userData.name = username;
  localStorage.setItem('eco_session', username);
};