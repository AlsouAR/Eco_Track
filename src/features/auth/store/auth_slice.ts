import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null;
}

const checkInitialAuth = (): AuthState => {
  if (typeof window === 'undefined') return { isAuthenticated: false, currentUser: null };
  
  const session = localStorage.getItem("eco_session");
  if (session !== null) {
    return { isAuthenticated: true, currentUser: session };
  }
  return { isAuthenticated: false, currentUser: null };
};

const initialState: AuthState = checkInitialAuth();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      localStorage.setItem('eco_session', action.payload); 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem('eco_session'); 
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;