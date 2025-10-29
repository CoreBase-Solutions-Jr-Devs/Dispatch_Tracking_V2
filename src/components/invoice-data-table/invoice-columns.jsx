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

const statusText = {
  1: "In Store",
  2: "In Verification",
  3: "In Dispatch",
  4: "Delivered",
};

const renderStatus = (status) => {
  let statusClass;
  switch (status) {
    case "Pending":
    case "In Store":
    case 1:
      statusClass = STATUS_STYLES.Store;
      break;

    case "In Process":
    case "In Verification":
    case 2:
      statusClass = STATUS_STYLES.Verification;
      break;

    case "In Delivery":
    case "In Dispatch":
    case 3:
      statusClass = STATUS_STYLES.Dispatch;
      break;

    case "Return":
    case "Dispatched":
    case "Verified":
    case "Processed":
    case "Delivered":
    case 4:
      statusClass = STATUS_STYLES.Delivery;
      break;

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

// const renderAdminStatus = (status) => {
//   let statusClass;
//   switch (status) {
//     case 1:
//       statusClass = STATUS_STYLES.Store;
//       break;

//     case 2:
//       statusClass = STATUS_STYLES.Verification;
//       break;

//     case 3:
//       statusClass = STATUS_STYLES.Dispatch;
//       break;

//     case 4:
//       statusClass = STATUS_STYLES.Delivery;
//       break;

//     default:
//       statusClass = STATUS_STYLES.Muted;
//       break;
//   }
//   return (
//     <Badge
//       variant="outline"
//       className={`${statusClass} w-28 justify-center rounded-md text-xs px-3 py-1 font-medium border dark:bg-gray-400 dark: text-black`}
//     >
//       {status}
//     </Badge>
//   );
// };

const renderText = (text) => (
  <span className="text-foreground font-medium">{text || "—"}</span>
);

const renderNumber = (text) => (
  <span className="text-foreground font-medium">
    {new Intl.NumberFormat("en-GB").format(text) || ""}
  </span>
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

const renderDateTime = (value, position = 1, color) => {
  const formattedDate = formatUKDateTime(value);
  const baseColor =
    color ||
    (formattedDate === "—"
      ? "text-muted-foreground"
      : position === 1
      ? "text-foreground"
      : "text-muted");
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
        {row.original.docNo || "—"}
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
      header: "Doc No",
      cell: ({ row }) => renderInvoiceNo(row, view),
    },

    dispatchNo: {
      accessorKey: "dispatchNo",
      header: "Doc No",
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
        const value = row.original.workflowStatus;
        return renderStatus(value);
      },
    },
    items: {
      accessorKey: "items",
      header: "Items ",
      cell: ({ row }) => renderText((row.original.items || 0).toString()),
    },

    docDateTime: {
      accessorKey: "docDateTime",
      header: "Doc Date ",
      cell: ({ row }) => renderDateTime(row.original.docDateTime),
    },
    processedDateTime: {
      accessorKey: "processedDateTime",
      header: "Processed Date ",
      cell: ({ row }) =>
        renderDateTime(row.original.processedDateTime, 1, "text-red-600"),
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
      header: "Terms",
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
    // ADMIN PAGE
    DocNumber: {
      accessorKey: "docNo",
      header: "DocNumber",
      cell: ({ row }) => renderText(row.original.docNo),
    },
    Account: {
      accessorKey: "account",
      header: "Account",
      cell: ({ row }) => renderText(row.original.account),
    },
    Amount: {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => renderNumber(row.original.amount),
    },
    DocDate: {
      accessorKey: "docDate",
      header: "DocDate",
      cell: ({ row }) => renderText(row.original.docDate?.split("T")[0] || ""),
    },
    DocTime: {
      accessorKey: "docTime",
      header: "DocTime",
      cell: ({ row }) =>
        renderText(row.original.docTime?.split(".")[0] || "00:00:00"),
    },
    Itms: {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => renderText(row.original.items),
    },
    printCopy: {
      accessorKey: "printCopy",
      header: "printCopy",
      cell: ({ row }) => renderText(row.original.printCopy),
    },
    StoreDate: {
      accessorKey: "storeDate",
      header: "StoreDate",
      cell: ({ row }) =>
        renderText(row.original.storeDate?.split("T")[0] || ""),
    },
    StoreTime: {
      accessorKey: "storeTime",
      header: "StoreTime",
      cell: ({ row }) =>
        renderText(
          row.original.storeTime?.split("T")[1]?.split(".")[0] || "00:00:00"
        ),
    },
    VrfDate: {
      accessorKey: "vfDate",
      header: "VrfDate",
      cell: ({ row }) => renderText(row.original.vfDate?.split("T")[0] || ""),
    },
    VrfTime: {
      accessorKey: "vfTime",
      header: "VrfTime",
      cell: ({ row }) =>
        renderText(
          row.original.vfTime?.split("T")[1]?.split(".")[0] || "00:00:00"
        ),
    },
    DispDate: {
      accessorKey: "dispDate",
      header: "DispDate",
      cell: ({ row }) => renderText(row.original.dispDate?.split("T")[0]),
    },
    DispTime: {
      accessorKey: "dispTime",
      header: "DispTime",
      cell: ({ row }) =>
        renderText(row.original.dispTime?.split(".")[0] || "00:00:00"),
    },
    adminStatus: {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => renderStatus(statusText[row.original.status]),
    },
    deliveryGuy: {
      accessorKey: "deliveryGuy",
      header: "Driver",
      cell: ({ row }) => renderText(row.original.deliveryGuy),
    },
  };

  const views = {
    admin: [
      base.DocNumber,
      base.Account,
      base.DocDate,
      base.DocTime,
      base.Itms,
      base.printCopy,
      base.StoreDate,
      base.StoreTime,
      base.VrfDate,
      base.VrfTime,
      base.DispDate,
      base.DispTime,
      base.deliveryGuy,
      base.adminStatus,
    ],
    store: [
      base.invoiceNo,
      base.docType,
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
      base.docType,
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
      base.docType,
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
export { formatDuration, renderDuration };
