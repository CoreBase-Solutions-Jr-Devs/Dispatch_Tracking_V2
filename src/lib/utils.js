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

/**
 * View metadata (title + subtitle) per role/view
 */
export const viewMeta = {
	admin: {
		title: 'Admin Overview',
		subtitle: 'All invoices across the system.',
	},
	store: {
		title: 'Store Overview',
		subtitle: 'Invoices that are in the store pipeline.',
	},
	verification: {
		title: 'Verifier Overview',
		subtitle: 'Invoices pending or completed verification.',
	},
	dispatch: {
		title: 'Dispatcher Overview',
		subtitle: 'Invoices ready or assigned for dispatch.',
	},
	delivery: {
		title: 'Driver Overview',
		subtitle: 'Invoices you are responsible for delivering.',
	},
	user: {
		title: 'Overview',
		subtitle: 'System invoices overview.',
	},
};
