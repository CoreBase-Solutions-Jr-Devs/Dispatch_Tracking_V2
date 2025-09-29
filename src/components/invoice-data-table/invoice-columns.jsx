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
    case "In Process":
      statusClass = STATUS_STYLES.Store;
      break;
    case "Ongoing":
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
    case "Processed":
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
      className={`${statusClass} w-28 justify-center rounded-md text-xs px-3 py-1 font-medium border dark:bg-gray-400 dark: text-black`}
    >
      {status}
    </Badge>
  );
};

const renderText = (text) => (
  <span className="text-foreground  font-medium">{text || "—"}</span>
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
    <span className={`${baseColor} font-mono font-medium text-sm`}>
      {formattedDate}
    </span>
  );
};

const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "—";
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    [
      days && `${days}D`,
      hours && `${hours}H`,
      mins && `${mins}M`,
      secs && `${secs}S`,
    ]
      .filter(Boolean)
      .join(" ") || "0m"
  );
};

const renderDuration = (durationSeconds, avgDuration) => {
  if (durationSeconds == null)
    return (
      <span className="text-muted-foreground font-mono font-medium text-sm ">
        —
      </span>
    );
  const colorClass =
    durationSeconds > avgDuration ? "text-red-600" : "text-green-600";
  return (
    <span className={`font-medium ${colorClass}`}>
      {formatDuration(durationSeconds)}
    </span>
  );
};
const renderInvoiceNo = (row, view) => {
  return (
    <EditStatusDialog
      rowData={row.original}
      view={view}
      onSubmit={(updatedData) => console.log("Edited row data:", updatedData)}
    >
      <a
        className=" underline cursor-pointer text-primary font-medium  text-sm hover:text-primary/80"
        onClick={(e) => e.stopPropagation()}
      >
        {row.original.invoiceNo || "—"}
      </a>
    </EditStatusDialog>
  );
};

const renderActions = (row, handlers = {}, view) => {
  const { onView } = handlers;
  return (
    <div className="flex items-center gap-1">
      <EditStatusDialog
        rowData={row.original}
        view={view}
        onSubmit={(updatedData) => console.log("Edited row data:", updatedData)}
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

export function getInvoiceColumns(view, avgDurationSeconds = 0, handlers = {}) {
  const base = {
    invoiceNo: {
      accessorKey: "invoiceNo",
      header: "Invoice No",
      cell: ({ row }) => renderInvoiceNo(row, view),
    },

    dispatchNo: {
      accessorKey: "dispatchNo",
      header: "DispNo",
      cell: ({ row }) => renderText(row.original.dispatchNo),
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
    customerCode: {
      accessorKey: "customerCode",
      header: "Customer Code",
      cell: ({ row }) => renderText(row.original.customerCode),
    },
    status: {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const value = row.original.status;
        return renderStatus(value);
      },
    },

    items: {
      accessorKey: "items",
      header: "inv Count ",
      cell: ({ row }) => renderText((row.original.items || 0).toString()),
    },

    docDateTime: {
      accessorKey: "docDateTime",
      header: "Doc Date & Time",
      cell: ({ row }) => renderDateTime(row.original.docDateTime),
    },
    processedDateTime: {
      accessorKey: "processedDateTime",
      header: "Processed Date & Time",
      cell: ({ row }) => (
        <span className="text-red-600">
          {renderDateTime(row.original.processedDateTime)}
        </span>
      ),
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
    durationSeconds: {
      accessorKey: "durationSeconds",
      id: "durationSeconds",
      header: "Duration",
      cell: ({ row }) =>
        renderDuration(row.original.durationSeconds, avgDurationSeconds),
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
      id: "actions",
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
      base.docDateTime,
      base.status,
    ],
    store: [
      base.invoiceNo,
      base.customerName,
      base.items,
      base.paymentTerms,
      base.docDateTime,
      base.processedDateTime,
      base.durationSeconds,
      base.status,
      base.actions,
    ],
    verification: [
      base.invoiceNo,
      base.customerName,
      base.items,
      base.paymentTerms,
      base.processedDateTime,
      base.verificationDateTime,
      base.durationSeconds,
      base.status,
      base.actions,
    ],
    dispatch: [
      base.dispatchNo,
      base.invoiceNo,
      base.customerName,
      base.customerCode,
      base.items,
      base.paymentTerms,
      base.docDateTime,
      base.dispatchDateTime,
      base.status,
      base.durationSeconds,
    ],
    delivery: [
      base.account,
      base.items,
      base.address,
      base.paymentTerms,
      base.dispatchDateTime,
      base.deliveryDateTime,
      base.status,
      base.durationSeconds,
      base.actions,
    ],
    default: [base.docType, base.branchName, base.account, base.status],
  };

  return views[view.toLowerCase()] || views.default;
}
