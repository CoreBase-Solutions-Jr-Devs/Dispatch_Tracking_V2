export function getInvoiceFilters(view) {
	const statusFilter = {
		key: 'status',
		label: 'Filter by Status',
		options: [
			{ label: 'Store', value: 'Store' },
			{ label: 'Verification', value: 'Verification' },
			{ label: 'Dispatch', value: 'Dispatch' },
			{ label: 'Delivered', value: 'Delivered' },
		],
	};

	const docTypeFilter = {
		key: 'docType',
		label: 'Filter by Doc Type',
		options: [
			{ label: 'INVOICE', value: 'INVOICE' },
			{ label: 'TRANSFER', value: 'TRANSFER' },
			{ label: 'CREDIT NOTE', value: 'CREDIT_NOTE' },
			{ label: 'DEBIT NOTE', value: 'DEBIT_NOTE' },
		],
	};

	// Different filters per role/view
	switch (view) {
		case 'admin':
			return [statusFilter, docTypeFilter];

		case 'store':
			return [statusFilter, docTypeFilter];

		case 'verification':
			return [statusFilter];

		case 'dispatch':
			return [statusFilter];

		default:
			return [statusFilter];
	}
}
