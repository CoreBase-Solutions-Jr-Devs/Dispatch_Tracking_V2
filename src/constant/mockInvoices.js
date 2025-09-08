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
    const deliveryGuys = [
        'John Doe',
        'Jane Smith',
        'Mike Wilson',
        'Sarah Johnson',
    ];
    const salesmen = ['SAMIR', 'PAUL NETIA', 'ANNA KIM', 'TOM REID'];
    const paymentTermsList = ['ON DELIVERY', 'ON ACC', 'CASH', 'ON ORDER'];
 
    // Logical status progression
    const randomStatus =
        statusOptions[Math.min(i % 4, statusOptions.length - 1)];
 
    const randomDocType = docTypes[Math.floor(Math.random() * docTypes.length)];
    const randomCustomer =
        customers[Math.floor(Math.random() * customers.length)];
    const randomBranch = branches[Math.floor(Math.random() * branches.length)];
    const randomPaymentTerms =
        paymentTermsList[Math.floor(Math.random() * paymentTermsList.length)];
    const randomSalesman =
        salesmen[Math.floor(Math.random() * salesmen.length)];
    const randomDeliveryGuy =
        deliveryGuys[Math.floor(Math.random() * deliveryGuys.length)];
 
    // Base time: 02/09/2025, starting at 08:00
    const baseDate = new Date('2025-09-02T08:00:00');
    const minutesOffset = i * (10 + Math.floor(Math.random() * 20)); // 10-30 min interval
    baseDate.setMinutes(baseDate.getMinutes() + minutesOffset);
 
    const postingDate = new Date(baseDate);
    const docDateTime = new Date(baseDate.getTime() + 15 * 60000); // +15 min
    const processedDateTime =
        randomStatus !== 'Store'
            ? new Date(baseDate.getTime() + 30 * 60000)
            : null;
    const verificationDateTime = [
        'Verification',
        'Dispatch',
        'Delivered',
    ].includes(randomStatus)
        ? new Date(baseDate.getTime() + 45 * 60000)
        : null;
    const dispatchDateTime = ['Dispatch', 'Delivered'].includes(randomStatus)
        ? new Date(baseDate.getTime() + 60 * 60000)
        : null;
    const deliveryDateTime =
        randomStatus === 'Delivered'
            ? new Date(baseDate.getTime() + 75 * 60000)
            : null;
    const endDateTime =
        randomStatus === 'Delivered'
            ? new Date(baseDate.getTime() + 90 * 60000)
            : null;
 
    // Duration = difference between docDateTime and latest timestamp
    const latestTimestamp =
        endDateTime ||
        deliveryDateTime ||
        dispatchDateTime ||
        verificationDateTime ||
        processedDateTime ||
        docDateTime;
    const duration = Math.floor((latestTimestamp - docDateTime) / 60000); // in minutes
 
    return {
        _id: String(id),
        invoiceNo: `W1_200${10000 + id}`,
        docType: randomDocType,
        account: `${randomCustomer} ACCT`,
        customerCode: `CUS-${1000 + id}`,
        customerName: randomCustomer,
        status: randomStatus,
        items: Math.floor(Math.random() * 50) + 1,
        postingDate,
        docDateTime,
        processedDateTime,
        verificationDateTime,
        dispatchDateTime,
        deliveryDateTime,
        endDateTime,
        deliveryGuy: ['Dispatch', 'Delivered'].includes(randomStatus)
            ? randomDeliveryGuy
            : null,
        salesman: randomSalesman,
        goodsRemovedBy: randomSalesman,
        address:
            randomStatus === 'Delivered'
                ? `${100 + i} Example St, Nairobi, Kenya`
                : null,
        branchName: randomDocType === 'TRANSFER' ? randomBranch : null,
        paymentTerms: randomPaymentTerms,
        printCopies: Math.floor(Math.random() * 5) + 1,
        duration,
    };
});