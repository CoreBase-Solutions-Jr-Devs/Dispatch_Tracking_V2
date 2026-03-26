import { useDispatch, useSelector } from 'react-redux';
import { store } from './store';

// Hook for dispatch
export const useAppDispatch = () => useDispatch();

// Hook for selector
export const useTypedSelector = useSelector;
