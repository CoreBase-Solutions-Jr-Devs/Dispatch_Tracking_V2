import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
// import { useGetSavedDispatchedQuery } from "@/features/Dispmain/dispatchAPI";
import { useGetSavedDispatchedInvoicesQuery } from "@/features/dispatch/dispatchAPI";
import EditStatusDialog from "../../invoices-data-table/edit-status-dialog/edit-status-dialog";

const renderText = (text) => (
  <span className="text-foreground  font-medium">{text || "—"}</span>
);

const STATUS_STYLES = {
  Store: "status-store border-status-store/20",
  Verification: "status-verification border-status-verification/20",
  Dispatch: "status-dispatch border-status-dispatch/20",
  Saved: "status-delivered border-status-delivered/20",
  Muted: "bg-muted text-muted-foreground border-border",
};

const getStatusLabel = (statusCode) => {
  const statusMap = {
    0: "Verified",
    1: "Selected",
    2: "In Dispatch",
    3: "Saved",
    4: "Dispatched",
  };
  return statusMap[Number(statusCode)] || "Unknown";
}

const renderStatus = (statusCode) => {
  const statusLabel = getStatusLabel(statusCode);
  let statusClass;

  switch (statusLabel) {
    case "pending":
    case "in process":
    case "recalled":
      statusClass = STATUS_STYLES.Store;
      break;
    case "processed":
    case "in verification":
    case "delivered":
      statusClass = STATUS_STYLES.Verification;
      break;
    case "verified":
    case "in dispatch":
    case "PendingPush":
      statusClass = STATUS_STYLES.Dispatch;
      break;
    case "return":
    case "Dispatched":
    case "in delivery":
    case "saved":
      statusClass = STATUS_STYLES.Saved;
      break;
    default:
      statusClass = STATUS_STYLES.Muted;
  }

  return (
    <Badge
      variant="outline"
      className={`${statusClass} w-28 justify-center rounded-md  font-medium px-3 py-1 border`}
    >
      {statusLabel || "—"}
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
  <span className="font-mono text-sm font-medium">{formatUKDateTime(val)}</span>
);

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

const renderDispatchLink = (row) => (
  <EditStatusDialog
    rowData={row.original}
    view="dispatchmain"
    onSubmit={(updatedData) => console.log("Edited row data:", updatedData)}
  >
    <a
      className="text-sm underline cursor-pointer text-primary font-medium hover:text-primary/80"
      onClick={(e) => e.stopPropagation()}
    >
      {row.original.dispatchNumber || "—"}
    </a>
  </EditStatusDialog>
);

const renderActions = (row) => (
  <EditStatusDialog
    rowData={row.original}
    view="dispatchmain"
    onSubmit={(updatedData) => console.log("Edited dispatch row:", updatedData)}
  >
    <Button
      variant="outline"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-accent"
      onClick={(e) => e.stopPropagation()}
    >
      <Eye className="h-4 w-4 text-muted-foreground" />
    </Button>
  </EditStatusDialog>
);

export default function DispatchGrid({ data = [], isLoading = false, isSearch }) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 50;

  const { data: savedDispatches, isFetching } = useGetSavedDispatchedInvoicesQuery(
      { pageNumber, pageSize },
      { skip: data?.length > 0 }
  );

  const isSearchResult = data?.length > 0;

  const displayData = isSearchResult
    ? data
    : savedDispatches?.items || [];

  const columns = useMemo(
    () => [
      {
        accessorKey: "dispatchNumber",
        header: "Dispatch No",
        cell: ({ row }) => renderDispatchLink(row),
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
        acccessorkey: "collectionType",
        header: "CollType",
        cell: ({ row }) => renderText(row.original.collectionType),
      },
      {
        accessorKey: "dispatchStart",
        header: "Disp.Start",
        cell: ({ row }) => renderDateTime(row.original.dispatchStart),
      },
      {
        accessorKey: "dispatchEnd",
        header: "Disp.End",
        cell: ({ row }) => renderDateTime(row.original.dispatchEnd),
      },
      {
        accessorKey: "durationSeconds",
        header: "Duration",
        cell: ({ row }) =>
          renderText(renderDuration(row.original.durationSeconds)),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) =>
          renderText(
            row.original.amount
              ? `KES ${row.original.amount}`
            : "0"
          ),
      },
      {
        accessorkey: "status",
        header: "Status",
        cell: ({ row }) => renderStatus(row.original.status),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => renderActions(row),
      },
    ],
    []
  );

  const totalValue = displayData.reduce(
    (sum, cur) => sum + (Number(cur.amount) || 0),
    0
  );

  const paginationData = isSearchResult
    ? {
        pageNumber: 1,
        pageSize: data.length || 1,
        totalItems: data.length || 0,
        totalPages: 1,
      }
    : {
        pageNumber: savedDispatches?.pageNumber || 1,
        pageSize: savedDispatches?.pageSize || pageSize,
        totalItems: savedDispatches?.totalCount || 0,
        totalPages: savedDispatches?.totalPages || 1,
      };

  return (
    <div className="space-y-4">
      <DataTable
        data={displayData}
        columns={columns}
        selection
        isLoading={isFetching}
        emptyTitle="No dispatch records found"
        isShowPagination
        onPageChange={setPageNumber}
        pagination={paginationData}
      />

      <div className="flex justify-end space-x-2 border-t pt-2 text-sm font-medium">
        <span>Total Records: {paginationData.totalItems}</span>
        <span>Total Value: KES {totalValue.toLocaleString()}</span>
      </div>
    </div>
  );
}
