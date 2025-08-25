import { ROLES } from '@/constant';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function roleToView(role) {
	if (!role) return 'user';

	switch (role) {
		case ROLES.SUPER_ADMIN:
		case ROLES.ADMIN:
			return 'admin';

		case ROLES.STORE_CONTROLLER:
		case ROLES.STORE_PERSON:
			return 'store';

		case ROLES.VERIFICATION_CONTROLLER:
		case ROLES.VERIFICATION_PERSON:
			return 'verification';

		case ROLES.DISPATCH_CONTROLLER:
		case ROLES.DISPATCH_PERSON:
			return 'dispatch';

		case ROLES.DRIVER:
			return 'delivery';

		default:
			return 'user';
	}
}

