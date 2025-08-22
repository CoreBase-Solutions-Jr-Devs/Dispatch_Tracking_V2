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

	const accountFilter = {
		key: 'account',
		label: 'Filter by Account',
		options: [
			{
				label: 'ALFA CHEMIST INVOICE ACCT',
				value: 'ALFA CHEMIST INVOICE ACCT',
			},
			{ label: 'VASCO PHARMACY', value: 'VASCO PHARMACY' },
			{ label: 'MALIBU LTD', value: 'MALIBU LTD' },
			{ label: 'PHARMAPLUS LTD', value: 'PHARMAPLUS LTD' },
			{ label: 'ZETA MEDICAL AGENCIES', value: 'ZETA MEDICAL AGENCIES' },
			{
				label: 'OMEGA PHARMA DISTRIBUTORS',
				value: 'OMEGA PHARMA DISTRIBUTORS',
			},
		],
	};

	// Different filters per role/view
	switch (view) {
		case 'admin':
			return [statusFilter, docTypeFilter, accountFilter];

		case 'store':
			return [statusFilter, docTypeFilter];

		case 'verification':
			return [statusFilter, accountFilter];

		case 'dispatch':
			return [statusFilter, accountFilter];

		default:
			return [statusFilter];
	}
}
