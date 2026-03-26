import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/authSlice';

const useAuthExpiration = () => {
	const { accessToken, expiresAt } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!accessToken || !expiresAt) return;

		const timeUntilExpiration = new Date(expiresAt).getTime() - Date.now();

		// If expired or expires in 2 minutes, logout immediately
		if (timeUntilExpiration <= 2 * 60 * 1000) {
			dispatch(logout());
			return;
		}

		// Set timer to logout 2 minutes before expiration
		const timer = setTimeout(
			() => dispatch(logout()),
			timeUntilExpiration - 2 * 60 * 1000
		);

		return () => clearTimeout(timer);
	}, [accessToken, expiresAt, dispatch]);
};

export default useAuthExpiration;
