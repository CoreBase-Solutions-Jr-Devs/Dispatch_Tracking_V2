import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditStatusDialog from "@/pages/overview/_component/invoices-data-table/edit-status-dialog";
import { Edit2, Eye } from "lucide-react";
import React from "react";

// --- Helpers ---
const STATUS_STYLES = {
  Store: "status-store border-status-store/20",
  Verification: "status-verification border-status-verification/20",
  Dispatch: "status-dispatch border-status-dispatch/20",
  Delivered: "status-delivered border-status-delivered/20",
};

const renderStatus = (status) => (
  <Badge
    variant="outline"
    className={`${
      STATUS_STYLES[status] || "bg-muted text-muted-foreground border-border"
    } w-28 justify-center rounded-md text-xs px-3 py-1 font-medium border`}
  >
    {status}
  </Badge>
);

const renderText = (text) => (
  <span className="text-foreground font-medium">{text || "—"}</span>
);

const formatUKDateTime = (date) => {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d)) return "—";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const renderDateTime = (value) => {
  const formattedDate = formatUKDateTime(value);
  if (formattedDate === "—") {
    return (
      <span className="text-muted-foreground font-mono text-sm">
        {formattedDate}
      </span>
    );
  }

  // Calculate age of the date
  const now = new Date();
  const date = new Date(value);
  const hoursDiff = (now - date) / (1000 * 60 * 60);

  let colorClass = "text-muted-foreground";

  if (hoursDiff <= 24) {
    colorClass = "text-primary";
  } else {
    colorClass = "text-destructive";
  }

  return (
    <span className={`${colorClass} font-mono text-sm font-medium`}>
      {formattedDate}
    </span>
  );
};

// Duration in D,H,M format
const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return "—";
  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor((minutes % (24 * 60)) / 60);
  const mins = minutes % 60;
  const parts = [];
  if (days) parts.push(`${days}D`);
  if (hours) parts.push(`${hours}H`);
  if (mins || (!days && !hours)) parts.push(`${mins}M`);
  return parts.join(" ");
};

const renderDuration = (durationMinutes, avgMinutes = 30) => {
  const isAbove = durationMinutes > avgMinutes;
  return (
    <span
      className={`font-medium ${isAbove ? "text-red-500" : "text-green-500"}`}
    >
      {formatDuration(durationMinutes)}
    </span>
  );
};

const renderActions = (row, handlers = {}) => {
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

// --- Column Factory ---
export function getInvoiceColumns(view) {
  const base = {
    docNumber: {
      accessorKey: "docNumber",
      id: "docNumber",
      header: "Doc Number",
      cell: ({ row }) => renderText(row.original.docNumber),
    },
    docType: {
      accessorKey: "docType",
      id: "docType",
      header: "Doc Type",
      cell: ({ row }) => renderText(row.original.docType),
    },
    account: {
      accessorKey: "account",
      id: "account",
      header: "Account",
      cell: ({ row }) => renderText(row.original.account),
    },
    customerName: {
      accessorKey: "customerName",
      id: "customerName",
      header: "Customer Name",
      cell: ({ row }) => renderText(row.original.customerName),
    },
    status: {
      accessorKey: "status",
      id: "status",
      header: "Status",
      cell: ({ row }) => renderStatus(row.original.status),
    },
    items: {
      accessorKey: "items",
      id: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.original.items;
        if (!items) return renderText("0");
        return renderText(items.toString());
      },
    },
    postingDate: {
      accessorKey: "postingDate",
      id: "postingDate",
      header: "Posting Date & Time",
      cell: ({ row }) => renderDateTime(row.original.postingDate),
    },
    docDate: {
      accessorKey: "docDate",
      id: "docDate",
      header: "Doc Date & Time",
      cell: ({ row }) => renderDateTime(row.original.docDate),
    },
    processedDate: {
      accessorKey: "processedDate",
      id: "processedDate",
      header: "Processed Date & Time",
      cell: ({ row }) => renderDateTime(row.original.processedDate),
    },
    verificationDate: {
      accessorKey: "verificationDate",
      id: "verificationDate",
      header: "Verification Date & Time",
      cell: ({ row }) => renderDateTime(row.original.verificationDate),
    },
    dispatchDate: {
      accessorKey: "dispatchDate",
      id: "dispatchDate",
      header: "Dispatch Date & Time",
      cell: ({ row }) => renderDateTime(row.original.dispatchDate),
    },
    deliveryDate: {
      accessorKey: "deliveryDate",
      id: "deliveryDate",
      header: "Delivery Date & Time",
      cell: ({ row }) => renderDateTime(row.original.deliveryDate),
    },
    deliveryGuy: {
      accessorKey: "deliveryGuy",
      id: "deliveryGuy",
      header: "Delivery Guy",
      cell: ({ row }) => renderText(row.original.deliveryGuy),
    },
    address: {
      accessorKey: "address",
      id: "address",
      header: "Address",
      cell: ({ row }) => renderText(row.original.address),
    },
    duration: {
      accessorKey: "duration",
      id: "duration",
      header: "Duration",
      cell: ({ row }) => renderDuration(row.original.duration),
    },
    paymentTerms: {
      accessorKey: "paymentTerms",
      id: "paymentTerms",
      header: "Payment Terms",
      cell: ({ row }) => renderText(row.original.paymentTerms || "N/A"),
    },
    printCopies: {
      accessorKey: "printCopies",
      id: "printCopies",
      header: "Print Copies",
      cell: ({ row }) => renderText(row.original.printCopies ?? 0),
    },
    branchName: {
      accessorKey: "branchName",
      id: "branchName",
      header: "Branch Name",
      cell: ({ row }) =>
        row.original.docType === "Transfer" ? (
          renderText(row.original.branchName)
        ) : (
          <span className="text-muted-foreground italic">—</span>
        ),
    },
    actions: {
      accessorKey: "actions",
      id: "actions",
      header: "Actions",
      cell: ({ row }) => renderActions(row),
      enableSorting: false,
      enableHiding: false,
    },
  };

  switch (view.toLowerCase()) {
    case "admin":
      return [
        base.docNumber,
        base.docType,
        base.branchName,
        base.account,
        base.paymentTerms,
        base.printCopies,
        base.postingDate,
        base.status,
      ];
    case "store":
      return [
        base.docNumber,
        base.account,
        base.customerName,
        base.items,
        base.paymentTerms,
        base.docDate,
        base.processedDate,
        base.duration,
        base.status,
        base.actions,
      ];
    case "verification":
      return [
        base.docNumber,
        base.account,
        base.customerName,
        base.items,
        base.paymentTerms,
        base.docDate,
        base.verificationDate,
        base.duration,
        base.status,
      ];
    case "dispatch":
      return [
        base.docNumber,
        base.customerName,
        base.items,
        base.deliveryGuy,
        base.paymentTerms,
        base.dispatchDate,
        base.deliveryDate,
        base.status,
        base.duration,
        base.actions,
      ];
    case "delivery":
      return [
        base.docNumber,
        base.account,
        base.items,
        base.address,
        base.paymentTerms,
        base.deliveryDate,
        base.status,
      ];
    default:
      return [
        base.docNumber,
        base.docType,
        base.branchName,
        base.account,
        base.status,
      ];
  }
}
