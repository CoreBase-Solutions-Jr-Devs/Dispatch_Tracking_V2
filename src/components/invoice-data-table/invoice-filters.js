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
			{ label: 'TRANSFER', value: 'TRANSFER' }
		],
	};

	const deliveryGuyFilter = {
		key: 'deliveryGuy',
		label: 'Filter by Delivery Guy',
		options: [
			{ label: 'John Doe', value: 'john_doe' },
			{ label: 'Jane Smith', value: 'jane_smith' },
			{ label: 'Mike Adams', value: 'mike_adams' },
		],
	};

	// Different filters per role/view
	switch (view) {
		case 'admin':
			return [statusFilter, docTypeFilter, deliveryGuyFilter];

		case 'store':
			return [statusFilter];

		case 'verification':
			return [statusFilter];

		case 'dispatch':
			return [statusFilter, deliveryGuyFilter];

		default:
			return [statusFilter];
	}
}
