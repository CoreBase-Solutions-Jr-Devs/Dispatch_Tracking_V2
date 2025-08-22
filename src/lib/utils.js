import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function roleToView(role) {
	switch (role.toLowerCase()) {
		case 'admin':
			return 'admin';
		case 'store':
			return 'store';
		case 'verification':
			return 'verification';
		case 'dispatcher':
			return 'dispatch';
		default:
			return 'user'; 
	}
}

