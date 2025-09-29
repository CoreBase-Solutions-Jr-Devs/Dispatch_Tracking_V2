// --- Helpers ---
import { Badge } from '@/components/ui/badge';


const STATUS_STYLES = {
    Store: "status-store border-status-store/20",
    Verification: "status-verification border-status-verification/20",
    Dispatch: "status-dispatch border-status-dispatch/20",
    Delivery: "status-delivered border-status-delivered/20",
    Muted: "bg-muted text-muted-foreground border-border",
};

const renderStatus = (status) => {
    let statusClass;
    switch (status) {
        case "Pending":
            statusClass = STATUS_STYLES.Store; break;
        case "Processed":
        case "In Verification":
            statusClass = STATUS_STYLES.Verification; break;
        case "Verified":
        case "In Dispatch":
            statusClass = STATUS_STYLES.Dispatch; break;
        case "Return":
        case "Dispatched":
        case "In Delivery":
            statusClass = STATUS_STYLES.Delivery; break;
        case "Recalled":
            statusClass = STATUS_STYLES.Store; break;
        case "Delivered":
            statusClass = STATUS_STYLES.Verification; break;
        default:
            statusClass = STATUS_STYLES.Muted; break;
    }
    return (
        <Badge
            variant="outline"
            className={`${statusClass} w-28 justify-center rounded-md text-xs px-3 py-1 font-medium border`}
        >
            {status}
        </Badge>
    );
};

// -- Column Factory --

export function getDispatchColumns(view){
    const base = {
        invoiceNo: { 
            accessorKey: "invoiceNo", 
            header: "Invoice No", 
            cell: ({ row }) => renderText(row.original.invoiceNo) 
        },
        dispatchId: { 
            accessorKey: "dispatchId", 
            header: "DispId", 
            cell: ({ row }) => renderText(row.original.dispatchId) 
        },
        dispatchNo: { 
            accessorKey: "dispatchNo", 
            header: "DispNo", 
            cell: ({ row }) => renderText(row.original.dispatchNo) 
        },
        dispatchIds: {
            accessorKey: "dispatchIds",
            header: "DispId(s)",
            cell: ({ row }) => renderText((row.original.dispatchIds || 0).toString())
        },
        invoiceNos: {
            accessorKey: "invoiceNumbers",
            header: "InvNo(s)",
            cell: ({ row }) => renderText((row.original.invoiceNumbers || 0).toString())
        },
        docType: { accessorKey: "docType", header: "Doc Type", cell: ({ row }) => renderText(row.original.docType) },
        account: { accessorKey: "account", header: "Account", cell: ({ row }) => renderText(row.original.account) },
        customerName: 
        { 
            accessorKey: "customerName", 
            header: "Customer Name", 
            cell: ({ row }) => renderText(row.original.customerName) 
        },
        customerCode: 
        { 
            accessorKey: "customerCode", 
            header: "Customer Code", 
            cell: ({ row }) => renderText(row.original.customerCode) 
        },
        status: { accessorKey: "status", header: "Status", cell: ({ row }) => renderStatus(row.original.status) },
        items: { accessorKey: "items", header: "Items", cell: ({ row }) => renderText((row.original.items || 0).toString()) },
        docDateTime: { accessorKey: "docDateTime", header: "Doc Date & Time", cell: ({ row }) => renderDateTime(row.original.docDateTime) },
        processedDateTime: { accessorKey: "processedDateTime", header: "Processed Date & Time", cell: ({ row }) => renderDateTime(row.original.processedDateTime) },
        verificationDateTime: { accessorKey: "verificationDateTime", header: "Verification Date & Time", cell: ({ row }) => renderDateTime(row.original.verificationDateTime) },
        dispatchDateTime: { accessorKey: "dispatchDateTime", header: "Dispatch Date & Time", cell: ({ row }) => renderDateTime(row.original.dispatchDateTime) },
        deliveryDateTime: { accessorKey: "deliveryDateTime", header: "Delivery Date & Time", cell: ({ row }) => renderDateTime(row.original.deliveryDateTime) },
        deliveryGuy: { accessorKey: "deliveryGuy", header: "Delivery Guy", cell: ({ row }) => renderText(row.original.deliveryGuy) },
        address: { accessorKey: "address", header: "Address", cell: ({ row }) => renderText(row.original.address) },
        durationSeconds: {
            accessorKey: "durationSeconds",
            id: "durationSeconds",
            header: "Duration",
            cell: ({ row }) => renderDuration(row.original.durationSeconds, avgDurationSeconds),
        },
        paymentTerms: { accessorKey: "paymentTerms", header: "Payment Terms", cell: ({ row }) => renderText(row.original.paymentTerms || "N/A") },
        printCopies: { accessorKey: "printCopies", header: "Print Copies", cell: ({ row }) => renderText(row.original.printCopies ?? 0) },
        branchName: { accessorKey: "branchName", header: "Branch Name", cell: ({ row }) => row.original.docType === "TRANSFER" ? renderText(row.original.branchName) : <span className="text-muted-foreground italic">—</span> },
        actions: { accessorKey: "actions", id: "actions", header: "Actions", cell: ({ row }) => renderActions(row, {}, view), enableSorting: false, enableHiding: false },
    };

    const dispatchViews = {
        dispatchMain: [base.dispatchDateTime, base.dispatchNo, base.items, base.status, base.deliveryGuy],
        dispatchNew: [base.customerCode,base.dispatchIds, base.invoiceNos, base.items, base.verificationDateTime, base.dispatchDateTime, base.durationSeconds, base.status],
        dispatchSelect: [base.dispatchId, base.invoiceNo, base.customerCode, base.customerName, base.items, base.paymentTerms, base.verificationDateTime, base.durationSeconds, base.status],
    }

    return dispatchViews[view.toLowerCase()] || dispatchViews.default;
}