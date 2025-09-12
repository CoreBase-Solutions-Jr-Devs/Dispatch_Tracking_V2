import {
	useFilterStoreInvoicesMutation,
	useFilterVerificationInvoicesMutation,
	// useFilterDispatchInvoicesMutation,
	// useFilterDeliveryInvoicesMutation,
} from '@/features/invoices/invoicesAPI';

export function useRoleInvoiceFilter(role) {
	switch (role) {
		case 'store':
			return useFilterStoreInvoicesMutation();
		case 'verification':
			return useFilterVerificationInvoicesMutation();
		case 'delivery':
			return useFilterVerificationInvoicesMutation();
		// case 'dispatch':
		// 	return useFilterDispatchInvoicesMutation();
		// case 'delivery':
		// 	return useFilterDeliveryInvoicesMutation();
		default:
			throw new Error(`Unknown role: ${role}`);
	}
}
