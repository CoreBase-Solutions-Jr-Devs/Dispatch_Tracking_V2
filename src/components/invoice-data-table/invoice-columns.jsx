import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Eye } from "lucide-react";
import EditStatusDialog from "@/pages/overview/_component/invoices-data-table/edit-status-dialog/edit-status-dialog.jsx";

// --- Helpers ---
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
      statusClass = STATUS_STYLES.Store;
      break;
    case "Processed":
    case "In Verification":
      statusClass = STATUS_STYLES.Verification;
      break;
    case "Verified":
    case "In Dispatch":
      statusClass = STATUS_STYLES.Dispatch;
      break;
    case "Return":
    case "Dispatched":
    case "In Delivery":
      statusClass = STATUS_STYLES.Delivery;
      break;
    case "Recalled":
      statusClass = STATUS_STYLES.Store;
      break;
    case "Delivered":
      statusClass = STATUS_STYLES.Verification;
      break;
    default:
      statusClass = STATUS_STYLES.Muted;
      break;
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

const renderText = (text) => (
  <span className="text-foreground font-medium">{text || "—"}</span>
);

const formatUKDateTime = (date) => {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d)) return "—";
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()} ${String(d.getHours()).padStart(
    2,
    "0"
  )}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const renderDateTime = (value, position = 1) => {
  const formattedDate = formatUKDateTime(value);
  const baseColor =
    formattedDate === "—"
      ? "text-muted-foreground"
      : position === 1
        ? "text-foreground"
        : "text-muted";
  return (
    <span className={`${baseColor} font-mono text-sm`}>{formattedDate}</span>
  );
};

// const formatDuration = (minutes) => {
//   if (!minutes && minutes !== 0) return "—";
//   const days = Math.floor(minutes / 1440);
//   const hours = Math.floor((minutes % 1440) / 60);
//   const mins = minutes % 60;

//   return [
//     days && `${days}D`,
//     hours && `${hours}H`,
//     (mins || (!days && !hours)) && `${mins}M`,
//   ]
//     .filter(Boolean)
//     .join(" ");
// };

const renderDuration = (durationString) => (
  <span className="font-medium text-foreground">{durationString || "—"}</span>
);


const renderActions = (row, handlers = {}, view) => {
  const { onView } = handlers;
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-accent"
        onClick={(e) => {
          e.stopPropagation();
          onView?.(row.original);
        }}
      >
        <Eye className="h-4 w-4 text-muted-foreground" />
      </Button>
      <EditStatusDialog
        rowData={row.original}
        view={view}
        onSubmit={(updatedData) =>
          console.log("Edited row data:", updatedData)
        }
      >
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-accent"
          onClick={(e) => e.stopPropagation()}
        >
          <Edit2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </EditStatusDialog>
    </div>
  );
};

// --- Column Factory ---
export function getInvoiceColumns(view) {
  const base = {
    invoiceNo: {
      accessorKey: "invoiceNo",
      header: "Invoice No",
      cell: ({ row }) => renderText(row.original.invoiceNo),
    },
    docType: {
      accessorKey: "docType",
      header: "Doc Type",
      cell: ({ row }) => renderText(row.original.docType),
    },
    account: {
      accessorKey: "account",
      header: "Account",
      cell: ({ row }) => renderText(row.original.account),
    },
    customerName: {
      accessorKey: "customerName",
      header: "Customer Name",
      cell: ({ row }) => renderText(row.original.customerName),
    },
    status: {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => renderStatus(row.original.status),
    },
    items: {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => renderText((row.original.items || 0).toString()),
    },
    postingDate: {
      accessorKey: "postingDate",
      header: "Posting Date & Time",
      cell: ({ row }) => renderDateTime(row.original.postingDate),
    },
    docDateTime: {
      accessorKey: "docDateTime",
      header: "Doc Date & Time",
      cell: ({ row }) => renderDateTime(row.original.docDateTime),
    },
    processedDateTime: {
      accessorKey: "processedDateTime",
      header: "Processed Date & Time",
      cell: ({ row }) => renderDateTime(row.original.processedDateTime),
    },
    verificationDateTime: {
      accessorKey: "verificationDateTime",
      header: "Verification Date & Time",
      cell: ({ row }) => renderDateTime(row.original.verificationDateTime),
    },
    dispatchDateTime: {
      accessorKey: "dispatchDateTime",
      header: "Dispatch Date & Time",
      cell: ({ row }) => renderDateTime(row.original.dispatchDateTime),
    },
    deliveryDateTime: {
      accessorKey: "deliveryDateTime",
      header: "Delivery Date & Time",
      cell: ({ row }) => renderDateTime(row.original.deliveryDateTime),
    },
    deliveryGuy: {
      accessorKey: "deliveryGuy",
      header: "Delivery Guy",
      cell: ({ row }) => renderText(row.original.deliveryGuy),
    },
    address: {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => renderText(row.original.address),
    },
    duration: {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => renderDuration(row.original.duration, 62),
    },
    paymentTerms: {
      accessorKey: "paymentTerms",
      header: "Payment Terms",
      cell: ({ row }) => renderText(row.original.paymentTerms || "N/A"),
    },
    printCopies: {
      accessorKey: "printCopies",
      header: "Print Copies",
      cell: ({ row }) => renderText(row.original.printCopies ?? 0),
    },
    branchName: {
      accessorKey: "branchName",
      header: "Branch Name",
      cell: ({ row }) =>
        row.original.docType === "TRANSFER" ? (
          renderText(row.original.branchName)
        ) : (
          <span className="text-muted-foreground italic">—</span>
        ),
    },
    actions: {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => renderActions(row, {}, view),
      enableSorting: false,
      enableHiding: false,
    },
  };

  const views = {
    admin: [
      base.docType,
      base.branchName,
      base.account,
      base.paymentTerms,
      base.printCopies,
      base.postingDate,
      base.status,
    ],
    store: [
      base.invoiceNo,
      base.customerName,
      base.items,
      base.paymentTerms,
      {
        ...base.docDateTime,
        cell: ({ row }) => renderDateTime(row.original.docDateTime, 1),
      },
      {
        ...base.processedDateTime,
        cell: ({ row }) => renderDateTime(row.original.processedDateTime, 2),
      },
      base.duration,
      base.status,
      base.actions,
    ],
    verification: [
      base.invoiceNo,
      base.customerName,
      base.items,
      base.paymentTerms,
      {
        ...base.processedDateTime,
        cell: ({ row }) => renderDateTime(row.original.processedDateTime, 1),
      },
      {
        ...base.verificationDateTime,
        cell: ({ row }) =>
          renderDateTime(row.original.verificationDateTime, 2),
      },
      base.duration,
      base.status,
      base.actions,
    ],
    dispatch: [
      base.invoiceNo,
      base.customerName,
      base.items,
      base.deliveryGuy,
      base.paymentTerms,
      {
        ...base.dispatchDateTime,
        cell: ({ row }) => renderDateTime(row.original.dispatchDateTime, 1),
      },
      {
        ...base.deliveryDateTime,
        cell: ({ row }) => renderDateTime(row.original.deliveryDateTime, 2),
      },
      base.status,
      base.duration,
      base.actions,
    ],
    delivery: [
      base.account,
      base.items,
      base.address,
      base.paymentTerms,
      {
        ...base.dispatchDateTime,
        cell: ({ row }) => renderDateTime(row.original.dispatchDateTime, 1),
      },
      {
        ...base.deliveryDateTime,
        cell: ({ row }) => renderDateTime(row.original.deliveryDateTime, 2),
      },
      base.status,
      base.actions,
    ],
    default: [base.docType, base.branchName, base.account, base.status],
  };

  return views[view.toLowerCase()] || views.default;
}
