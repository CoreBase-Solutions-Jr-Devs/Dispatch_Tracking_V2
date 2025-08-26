// src/data/mockInvoices.js
export const mockInvoices = Array.from({ length: 25 }, (_, i) => {
	const id = i + 1;
	const statusOptions = ['Store', 'Verification', 'Dispatch', 'Delivered'];
	const docTypes = ['INVOICE', 'TRANSFER'];
	const customers = [
		'ALFA CHEMIST',
		'VASCO PHARMACY',
		'MALIBU LTD',
		'PHARMAPLUS LTD',
	];

	const randomStatus =
		statusOptions[Math.floor(Math.random() * statusOptions.length)];
	const randomDocType = docTypes[Math.floor(Math.random() * docTypes.length)];
	const randomCustomer =
		customers[Math.floor(Math.random() * customers.length)];

	const baseDate = new Date('2025-08-20T08:00:00Z');
	baseDate.setMinutes(baseDate.getMinutes() + i * 15);

	return {
		_id: String(id),
		docNumber: `W1_200${10000 + id}`,
		docType: randomDocType,
		account: `${randomCustomer} ACCT`,
		status: randomStatus,
		customerCode: `CUS-${1000 + id}`,
		items: [
			{
				name: `Item ${String.fromCharCode(65 + (i % 26))}`,
				qty: (i % 5) + 1,
			},
			{
				name: `Item ${String.fromCharCode(66 + (i % 26))}`,
				qty: (i % 10) + 1,
			},
		],
		postingDate: baseDate.toISOString(),
		assignedDate: new Date(baseDate.getTime() + 30 * 60000).toISOString(),
		processedDate:
			i % 2 === 0
				? new Date(baseDate.getTime() + 60 * 60000).toISOString()
				: null,
		verificationDate:
			i % 3 === 0
				? new Date(baseDate.getTime() + 90 * 60000).toISOString()
				: null,
		dispatchDate:
			i % 4 === 0
				? new Date(baseDate.getTime() + 120 * 60000).toISOString()
				: null,
		deliveryDate:
			i % 5 === 0
				? new Date(baseDate.getTime() + 150 * 60000).toISOString()
				: null,
		deliveryGuy:
			i % 5 === 0 ? 'John Doe' : i % 7 === 0 ? 'Jane Smith' : null,
		address: i % 5 === 0 ? `${i} Example St, Nairobi` : null,
		duration: 60 + (i % 100),
	};
});
