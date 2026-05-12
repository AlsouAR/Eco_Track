import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// 1. Используй useAppDispatch вместо обычного useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 2. Используй useAppSelector вместо обычного useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;