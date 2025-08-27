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
	const branches = [
		'NAIROBI BRANCH',
		'MOMBASA BRANCH',
		'KISUMU BRANCH',
		'NAKURU BRANCH',
	];
	const deliveryGuys = ['John Doe', 'Jane Smith', 'Mike Wilson', 'Sarah Johnson'];
	const paymentTermsList = ['ON DELIVERY', 'ON ACC', 'CASH', 'ON ORDER'];

	const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
	const randomDocType = docTypes[Math.floor(Math.random() * docTypes.length)];
	const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
	const randomBranch = branches[Math.floor(Math.random() * branches.length)];
	const randomPaymentTerms = paymentTermsList[Math.floor(Math.random() * paymentTermsList.length)];

	const baseDate = new Date('2025-08-20T08:00:00Z');
	baseDate.setMinutes(baseDate.getMinutes() + i * 15);

	return {
		_id: String(id),

		// Core document details
		docNumber: `W1_200${10000 + id}`,
		docType: randomDocType,
		account: `${randomCustomer} ACCT`,

		// Customer fields
		customerCode: `CUS-${1000 + id}`,
		customerName: randomCustomer,

		// Status
		status: randomStatus,

		// Items - Simple number as required
		items: Math.floor(Math.random() * 50) + 1,

		// Dates (raw Date objects)
		postingDate: baseDate,
		docDate: new Date(baseDate.getTime() + 30 * 60000),
		processedDate: i % 2 === 0 ? new Date(baseDate.getTime() + 60 * 60000) : null,
		verificationDate: i % 3 === 0 ? new Date(baseDate.getTime() + 90 * 60000) : null,
		dispatchDate: i % 4 === 0 ? new Date(baseDate.getTime() + 120 * 60000) : null,
		deliveryDate: i % 5 === 0 ? new Date(baseDate.getTime() + 150 * 60000) : null,

		// Delivery details
		deliveryGuy: i % 3 === 0 ? deliveryGuys[Math.floor(Math.random() * deliveryGuys.length)] : null,
		address: i % 4 === 0 ? `${100 + i} Example St, Nairobi, Kenya` : null,

		// Branch info (for Transfer doc types)
		branchName: randomDocType === 'TRANSFER' ? randomBranch : null,

		// Additional fields to match columns
		paymentTerms: randomPaymentTerms,
		printCopies: Math.floor(Math.random() * 5) + 1, // 1-5 copies

		// Metrics
		duration: 60 + (i % 100), // Duration in minutes
	};
});