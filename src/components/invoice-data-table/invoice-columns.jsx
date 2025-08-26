import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2 } from "lucide-react";
import React from "react";

// --- Helpers ---
var STATUS_STYLES = {
  Store: "status-store border-status-store/20",
  Verification: "status-verification border-status-verification/20",
  Dispatch: "status-dispatch border-status-dispatch/20",
  Delivered: "status-delivered border-status-delivered/20",
};

function renderStatus(status) {
  return (
    <Badge
      variant="outline"
      className={`${
        STATUS_STYLES[status] || "bg-muted text-muted-foreground border-border"
      } w-28 justify-center rounded-md text-xs px-3 py-1 font-medium border`}
    >
      {status}
    </Badge>
  );
}

function renderDocNumber(docNumber) {
  return (
    <span className="text-chart-2 hover:text-chart-2/80 hover:underline cursor-pointer font-medium transition-colors">
      {docNumber}
    </span>
  );
}

function renderDocType(docType) {
  return <span className="text-foreground font-medium">{docType}</span>;
}

function renderAccount(account) {
  return <span className="text-foreground font-medium">{account}</span>;
}

function formatDateTime(value) {
  if (!value) return "-";
  var date = new Date(value);
  return date.toLocaleString();
}

function renderDateTime(value) {
  return (
    <span className="text-muted-foreground font-mono text-sm">
      {formatDateTime(value)}
    </span>
  );
}

function renderDuration(durationMinutes, avgMinutes) {
  if (avgMinutes === undefined) avgMinutes = 30;
  var isAbove = durationMinutes > avgMinutes;
  return (
    <span
      className={"font-medium " + (isAbove ? "text-red-500" : "text-green-500")}
    >
      {durationMinutes} mins
    </span>
  );
}

function renderActions(row) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-accent"
        onClick={function (e) {
          e.stopPropagation();
          console.log("View:", row.docNumber);
        }}
      >
        <Eye className="h-4 w-4 text-muted-foreground" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-accent"
        onClick={function (e) {
          e.stopPropagation();
          console.log("Edit:", row.docNumber);
        }}
      >
        <Edit2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}

// --- Column Factory ---
export function getInvoiceColumns(view) {
  var base = {
    docNumber: {
      accessorKey: "docNumber",
      header: "Doc Number",
      cell: function ({ row }) {
        return renderDocNumber(row.original.docNumber);
      },
    },
    docType: {
      accessorKey: "docType",
      header: "Doc Type",
      cell: function ({ row }) {
        return renderDocType(row.original.docType);
      },
    },
    account: {
      accessorKey: "account",
      header: "Account",
      cell: function ({ row }) {
        return renderAccount(row.original.account);
      },
    },
    postingDate: {
      accessorKey: "postingDate",
      header: "Posting Date & Time",
      cell: function ({ row }) {
        return renderDateTime(row.original.postingDate);
      },
    },
    status: {
      accessorKey: "status",
      header: "Status",
      cell: function ({ row }) {
        return renderStatus(row.original.status);
      },
    },
    actions: {
      id: "actions",
      header: "Actions",
      cell: function ({ row }) {
        return renderActions(row.original);
      },
      enableSorting: false,
      enableHiding: false,
    },
    customerCode: {
      accessorKey: "customerCode",
      header: "Customer Code",
    },
    items: {
      accessorKey: "items",
      header: "Items",
      cell: function ({ row }) {
        return (
          <span>{row.original.items ? row.original.items.length : 0}</span>
        );
      },
    },
    assignedDate: {
      accessorKey: "assignedDate",
      header: "Assigned Date & Time",
      cell: function ({ row }) {
        return renderDateTime(row.original.assignedDate);
      },
    },
    processedDate: {
      accessorKey: "processedDate",
      header: "Processed Date & Time",
      cell: function ({ row }) {
        return renderDateTime(row.original.processedDate);
      },
    },
    verificationDate: {
      accessorKey: "verificationDate",
      header: "Verification Date & Time",
      cell: function ({ row }) {
        return renderDateTime(row.original.verificationDate);
      },
    },
    dispatchDate: {
      accessorKey: "dispatchDate",
      header: "Dispatch Date & Time",
      cell: function ({ row }) {
        return renderDateTime(row.original.dispatchDate);
      },
    },
    deliveryDate: {
      accessorKey: "deliveryDate",
      header: "Delivery Date & Time",
      cell: function ({ row }) {
        return renderDateTime(row.original.deliveryDate);
      },
    },
    deliveryGuy: { accessorKey: "deliveryGuy", header: "Delivery Guy" },
    address: { accessorKey: "address", header: "Address" },
    duration: {
      accessorKey: "duration",
      header: "Duration",
      cell: function ({ row }) {
        return renderDuration(row.original.duration);
      },
    },
  };

  switch (view.toLowerCase()) {
    case "admin":
      return [
        base.docNumber,
        base.docType,
        base.account,
        base.postingDate,
        base.status,
      ];
    case "store":
      return [
        base.docNumber,
        base.account,
        base.customerCode,
        base.items,
        base.assignedDate,
        base.processedDate,
        base.duration,
        base.status,
        base.actions,
      ];
    case "verification":
      return [
        base.docNumber,
        base.account,
        base.customerCode,
        base.items,
        base.assignedDate,
        base.verificationDate,
        base.duration,
        base.status,
      ];
    case "dispatch":
      return [
        base.docNumber,
        base.customerCode,
        base.deliveryGuy,
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
        base.address,
        base.deliveryDate,
        base.status,
      ];
    default:
      return [base.docNumber, base.docType, base.account, base.status];
  }
}
