import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { useGetSavedDispatchedQuery } from "@/features/Dispmain/dispatchAPI";
import Dispatchpopup from "./popup";

// ✅ Helpers
const renderText = (text) => (
  <span className="text-foreground font-medium">{text || "—"}</span>
);
// --- Helpers ---
const STATUS_STYLES = {
  Pending: "status-store border-status-store/20",
  Verified: "status-verification border-status-verification/20",
  "In Dispatch": "status-dispatch border-status-dispatch/20",
  Dispatched: "status-dispatch border-status-dispatch/20",
  Saved: "status-dispatch border-status-dispatch/20", // use consistent casing
  Delivered: "status-delivered border-status-delivered/20",
  Default: "bg-muted text-muted-foreground border-border",
};

const renderStatus = (status) => {
  // normalize casing so "SAVED" or "saved" both work
  const normalizedStatus =
    typeof status === "string"
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : status;

  const statusClass = STATUS_STYLES[normalizedStatus] || STATUS_STYLES.Default;

  return (
    <Badge
      variant="outline"
      className={`${statusClass} w-28 justify-center rounded-md text-xs px-3 py-1 font-medium border`}
    >
      {normalizedStatus}
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
  <span className="font-mono">{formatUKDateTime(val)}</span>
);

const formatDuration = (minutes) => {
  if (minutes === null || minutes === undefined) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h ? h + "h " : ""}${m}m`;
};

const renderActionsButton = (row, handlers = {}) => {
  const { onView } = handlers;
  return (
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
  );
};

// ✅ Main Grid
export default function DispatchGrid() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 50; // 👈 aligned with API default

  const { data, isLoading, isFetching } = useGetSavedDispatchedQuery({
    pageNumber,
    pageSize,
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const handleOpenPopup = (row) => setSelectedRow(row);
  const handleClosePopup = () => setSelectedRow(null);

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "dispatchNumber",
        header: "Dispatch No",
        cell: ({ row }) => renderText(row.original.dispatchNumber),
      },
      {
        accessorKey: "route",
        header: "Route",
        cell: ({ row }) => renderText(row.original.route),
      },
      {
        accessorKey: "dispatcher",
        header: "Dispatcher",
        cell: ({ row }) => renderText(row.original.dispatcher),
      },
      {
        accessorKey: "dispatchDateTime",
        header: "Dispatch Date & Time",
        cell: ({ row }) => renderDateTime(row.original.dispatchDateTime),
      },
      {
        accessorKey: "durationMinutes",
        header: "Duration",
        cell: ({ row }) =>
          renderText(formatDuration(row.original.durationMinutes)),
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => renderStatus(row.original.status),
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

  const totalValue =
    data?.items?.reduce((acc, cur) => acc + (cur.amount || 0), 0) || 0;

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <DataTable
            data={data?.items || []}
            columns={columns}
            selection={true}
            isLoading={isFetching}
            emptyTitle="No dispatch records found"
            isShowPagination={true}
            onPageChange={setPageNumber}
            pagination={{
              pageNumber: data?.pageNumber || 1,
              pageSize: data?.pageSize || pageSize,
              totalItems: data?.totalCount || 0,
              totalPages: data?.totalPages || 1,
            }}
          />

          <div className="flex justify-end space-x-2 border-t pt-2 text-sm font-medium">
            <span>Total Records: {data?.totalCount || 0}</span>
            <span>Total Value: KES {totalValue.toLocaleString()}</span>
          </div>
        </>
      )}

      {selectedRow && (
        <Dispatchpopup data={selectedRow} onClose={handleClosePopup} />
      )}
    </div>
  );
}
