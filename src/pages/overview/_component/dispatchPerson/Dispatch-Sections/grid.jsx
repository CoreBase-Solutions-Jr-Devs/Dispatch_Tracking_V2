import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Dispatchpopup from "./popup"; // your popup component

// Helpers
const renderText = (text) => (
  <span className="text-foreground font-medium">{text || "—"}</span>
);

const renderStatus = (status) => {
  let statusClass = "bg-muted text-muted-foreground border-border";
  switch (status) {
    case "Pending":
      statusClass = "status-store border-status-store/20";
      break;
    case "Verified":
      statusClass = "status-verification border-status-verification/20";
      break;
    case "In Dispatch":
      statusClass = "status-dispatch border-status-dispatch/20";
      break;
    case "Dispatched":
      statusClass = "status-dispatch border-status-dispatch/20";
      break;
    case "Delivered":
      statusClass = "status-delivered border-status-delivered/20";
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
  <span className="font-mono text-sm">{formatUKDateTime(val)}</span>
);

const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h ? h + "h " : ""}${m}m`;
};

export default function DispatchGrid({ data = [], isLoading = false }) {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenPopup = (row) => setSelectedRow(row);
  const handleClosePopup = () => setSelectedRow(null);

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "dispatchNo",
        header: "Dispatch No",
        cell: ({ row }) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleOpenPopup(row.original);
            }}
            className="text-blue-600 underline cursor-pointer"
          >
            {row.original.invoiceNo}
          </a>
        ),
      },
      {
        accessorKey: "customerName",
        header: "Customer Name",
        cell: ({ row }) => renderText(row.original.customerName),
      },
      {
        accessorKey: "items",
        header: "Items",
        cell: ({ row }) => renderText(row.original.items),
      },
      {
        accessorKey: "dispatcher",
        header: "Dispatcher",
        cell: ({ row }) => renderText(row.original.dispatcher),
      },
      {
        accessorKey: "paymentTerms",
        header: "Payment Terms",
        cell: ({ row }) => renderText(row.original.paymentTerms),
      },
      {
        accessorKey: "route",
        header: "Route",
        cell: ({ row }) => renderText(row.original.route),
      },
      {
        accessorKey: "dispatchDateTime",
        header: "Dispatch Date & Time",
        cell: ({ row }) => renderDateTime(row.original.dispatchDateTime),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => renderStatus(row.original.status),
      },
      {
        accessorKey: "durationSeconds",
        header: "Duration",
        cell: ({ row }) =>
          renderText(formatDuration(row.original.durationSeconds)),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) =>
          renderText(
            row.original.amount
              ? `KES ${row.original.amount.toLocaleString()}`
              : "—"
          ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <span
            className="text-orange-600 underline cursor-pointer select-none px-2 py-1"
            onClick={() => handleOpenPopup(row.original)}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleOpenPopup(row.original); }}
          >
            View
          </span>
        ),
      },
    ];
  }, []);

  const totalCount = data.length;
  const totalValue = data.reduce((acc, cur) => acc + (cur.amount || 0), 0);

  return (
    <div className="space-y-4">
      <DataTable
        data={data}
        columns={columns}
        selection={true}
        isLoading={isLoading}
        emptyTitle="No dispatch records found"
        isShowPagination={true}
      />

      <div className="flex justify-end space-x-2 border-t pt-2 text-sm font-medium">
        <span>Total Records: {totalCount}</span>
        <span>Total Value: KES {totalValue.toLocaleString()}</span>
      </div>

      {/* Render the popup */}
      {selectedRow && (
        <Dispatchpopup data={selectedRow} onClose={handleClosePopup} />
      )}
    </div>
  );
}
