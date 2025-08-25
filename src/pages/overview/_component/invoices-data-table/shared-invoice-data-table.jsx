import * as React from "react";
import { DataTable } from "@/components/data-table";
import { useSelector } from "react-redux";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { roleToView } from "@/lib/utils";
import InvoiceToolbar from "@/components/invoice-data-table/invoice-toolbar";

const mockInvoices = [
    {
        _id: "1",
        docNumber: "W1_20022693",
        docType: "INVOICE",
        account: "ALFA CHEMIST INVOICE ACCT",
        status: "Store",
        customerCode: "CUS-1001",
        items: [
            { name: "Item A", qty: 10 },
            { name: "Item B", qty: 5 }
        ],
        postingDate: "2025-08-20T08:00:00Z",
        processedDate: "2025-08-20T09:15:00Z",
        verificationDate: null,
        dispatchDate: null,
        deliveryDate: null,
        deliveryGuy: null,
        address: null,
        duration: 75
    },
    {
        _id: "2",
        docNumber: "W1_20010005",
        docType: "TRANSFER",
        account: "VASCO PHARMACY",
        status: "Verification",
        customerCode: "CUS-1023",
        items: [
            { name: "Item C", qty: 3 },
            { name: "Item D", qty: 7 }
        ],
        postingDate: "2025-08-20T09:00:00Z",
        processedDate: null,
        verificationDate: "2025-08-20T11:00:00Z",
        dispatchDate: null,
        deliveryDate: null,
        deliveryGuy: null,
        address: null,
        duration: 120
    },
    {
        _id: "3",
        docNumber: "W1_20010008",
        docType: "INVOICE",
        account: "MALIBU LTD",
        status: "Dispatch",
        customerCode: "CUS-1045",
        items: [
            { name: "Item E", qty: 2 }
        ],
        postingDate: "2025-08-20T09:30:00Z",
        processedDate: "2025-08-20T10:00:00Z",
        verificationDate: "2025-08-20T11:30:00Z",
        dispatchDate: "2025-08-20T12:30:00Z",
        deliveryDate: "2025-08-20T15:45:00Z",
        deliveryGuy: "John Doe",
        address: "123 Main St, Nairobi",
        duration: 95
    },
    {
        _id: "4",
        docNumber: "W1_20010012",
        docType: "INVOICE",
        account: "PHARMAPLUS LTD",
        status: "Delivered",
        customerCode: "CUS-1056",
        items: [
            { name: "Item F", qty: 4 }
        ],
        postingDate: "2025-08-20T10:00:00Z",
        processedDate: "2025-08-20T11:00:00Z",
        verificationDate: "2025-08-20T12:00:00Z",
        dispatchDate: "2025-08-20T13:30:00Z",
        deliveryDate: "2025-08-20T16:00:00Z",
        deliveryGuy: "Jane Smith",
        address: "456 Riverside Rd, Nairobi",
        duration: 90
    }
];


export default function SharedInvoiceDataTable() {
    const { user } = useSelector((state) => state.auth);

    const columns = getInvoiceColumns(user?.userRole || "User");
    const view = roleToView(user?.userRole || "User");
    const filters = getInvoiceFilters(view);

    return (
        <div className="space-y-4">
            <InvoiceToolbar filters={filters} role={view} />

            <DataTable
                data={mockInvoices}
                columns={columns}
                selection={false}
                isLoading={false}
                emptyTitle="No invoices found"
                isShowPagination={true}
                pagination={{
                    pageNumber: 1,
                    pageSize: 10,
                    totalItems: mockInvoices.length,
                    totalPages: 1,
                }}
            />
        </div>
    );
}
