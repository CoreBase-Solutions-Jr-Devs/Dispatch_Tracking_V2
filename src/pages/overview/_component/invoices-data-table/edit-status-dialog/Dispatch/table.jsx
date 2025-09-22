import React, { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { useSelectDispatchInvoiceMutation } from "@/features/dispatch/dispatchAPI";




// Helpers
const renderText = (text) => (
  <span className="text-foreground font-medium">{text || "—"}</span>
);

const renderStatus = (status) => {
  let statusClass = "bg-muted text-muted-foreground border-border";
  switch (status) {
    case "PENDING": statusClass = "status-store border-status-store/20"; break;
    case "VERIFIED": statusClass = "status-dispatch border-status-verification/20"; break;
    case "ONGOING": statusClass = "status-verification border-status-dispatch/20"; break;
    case "DELIVERED": statusClass = "status-delivered border-status-delivered/20"; break;
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

const renderDateTime = (val) => (
  <span className="font-mono text-sm">
    {formatUKDateTime(val)}
  </span>
);

const formatDuration = (seconds) => {
  if (!seconds) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h ? h + "h " : ""}${m}m`;
};

export default function DispatchTable({ data = [], isLoading = false, pagination, onPageChange, onPageSizeChange }) {

  // Select Invoices API 
// const [selectInvoice,{ data, isLoading, isError }] = useSelectDispatchInvoiceMutation();
// const dispatchSelected = data?.invoices.isSelected;

  const columns = useMemo(() => {
    return [
      {
        id: "select",
        // header: ({ table }) => (
        //   <input
        //     type="checkbox"
        //     aria-label="Select all"
        //     checked={table.getIsAllRowsSelected()}
        //     indeterminate={table.getIsSomeRowsSelected() ? "true" : undefined}
        //     onChange={table.getToggleAllRowsSelectedHandler()}
        //   />
        // ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            aria-label={`Select row ${row.original.invoiceNo}`}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.toggleSelected()}
          />
        ),
        size: 40,
      },
      {
        accessorKey: "dispatchId",
        header: "Disp. Id",
        cell: ({ row }) => {
          switch ("dispatchId") {
            case "dispatchId": return renderText(row.original.dispatchId);
            default: return renderText("—");
          }
        },
      },
      {
        accessorKey: "invoiceNo",
        header: "Inv. No",
        cell: ({ row }) => {
          switch ("invoiceNo") {
            case "invoiceNo": return renderText(row.original.invoiceNo);
            default: return renderText("—");
          }
        },
      },
      {
        accessorKey: "customerCode",
        header: "CusCode",
        cell: ({ row }) => {
          switch ("customerCode") {
            case "customerCode": return renderText(row.original.customerCode);
            default: return renderText("—");
          }
        },
      },
      {
        accessorKey: "customerName",
        header: "CusName",
        cell: ({ row }) => {
          switch ("customerName") {
            case "customerName": return renderText(row.original.customerName);
            default: return renderText("—");
          }
        },
      },
      {
        accessorKey: "items",
        header: "Items",
        cell: ({ row }) => {
          switch ("items") {
            case "items": return renderText(row.original.items);
            default: return renderText("—");
          }
        },
      },
      {
        accessorKey: "paymentTerms",
        header: "PayTerms",
        cell: ({ row }) => {
          switch ("paymentTerms") {
            case "paymentTerms": return renderText(row.original.paymentTerms);
            default: return renderText("—");
          }
        },
      },
      {
        accessorKey: "verifiedDateTime",
        header: "Ver. DateTime",
        cell: ({ row }) => {
          switch ("verifiedDateTime") {
            case "verifiedDateTime": return renderDateTime(row.original.verifiedDateTime);
            default: return renderText("—");
          }
        },
      },
      {
        accessorKey: "durationMinutes",
        header: "Duration",
        cell: ({ row }) => {
          switch ("durationMinutes") {
            case "durationMinutes": return renderText(formatDuration(row.original.durationMinutes));
            default: return renderText("—");
          }
        },
      },
      // {
      //   accessorKey: "amount",
      //   header: "Amount",
      //   cell: ({ row }) => {
      //     switch ("amount") {
      //       case "amount": return renderText(`KES ${row.original.amount?.toLocaleString()}`);
      //       default: return renderText("—");
      //     }
      //   },
      // },
      {
        accessorKey: "dispatchStatus",
        header: "Status",
        cell: ({ row }) => {
          switch ("status") {
            case "status": return renderStatus(row.original.dispatchStatus);
            default: return renderText("—");
          }
        },
      },
    ];
  }, []);

  // Calculate Totals



  return (
    <div className="space-y-4">
      <DataTable
        data={data}
        columns={columns}
        selection={true}
        isLoading={isLoading}
        emptyTitle="No dispatch records found"
        isShowPagination={true}
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <div className="flex justify-end space-x-2 border-t pt-2 text-sm font-medium">
        <span>Total Count: {pagination.totalItems ?? 0}</span>
        <span>Total Value: KES </span>
      </div>
    </div>
  );
}
