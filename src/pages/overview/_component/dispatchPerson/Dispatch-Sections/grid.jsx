import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useGetSavedDispatchedQuery } from "@/features/Dispmain/dispatchAPI";
import EditStatusDialog from "../../invoices-data-table/edit-status-dialog/edit-status-dialog";


const renderText = (text) => (
  <span className=" font-medium">{text || "—"}</span>
);

const STATUS_STYLES = {
  Store: "status-store border-status-store/20",
  Verification: "status-verification border-status-verification/20",
  Dispatch: "status-dispatch border-status-dispatch/20",
  SAVED: "status-delivered border-status-delivered/20",
  Muted: "bg-muted text-muted-foreground border-border",
};

const renderStatus = (status) => {
  let statusClass;
  switch (status?.toLowerCase()) {
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
      statusClass = STATUS_STYLES.Dispatch;
      break;
    case "return":
    case "dispatched":
    case "in delivery":
    case "saved":
      statusClass = STATUS_STYLES.SAVED;
      break;
    default:
      statusClass = STATUS_STYLES.Muted;
  }

  return (
    <Badge
      variant="outline"
      className={`${statusClass} w-28 justify-center rounded-md  font-medium px-3 py-1 border`}
    >
      {status || "—"}
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

const formatDuration = (minutes) => {
  if (minutes === null || minutes === undefined)
    return <span className="font-mono text-sm font-medium">—</span>;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return (
    <span className="font-mono text-sm font-medium">
      {`${h ? h + "h " : ""}${m}m`}
    </span>
  );
};

const renderDispatchLink = (row) => (
  <EditStatusDialog
    rowData={row.original}
    view="dispatchmain"
    onSubmit={(updatedData) => console.log("Edited row data:", updatedData)}
  >
    <a
      className="text-sm underline cursor-pointer text-primary hover:text-primary/80"
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


export default function DispatchGrid() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 50;

  const { data, isFetching } = useGetSavedDispatchedQuery({
    pageNumber,
    pageSize,
  });

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
        cell: ({ row }) => renderActions(row),
      },
    ],
    []
  );

  const totalValue =
    data?.items?.reduce((acc, cur) => acc + (cur.amount || 0), 0) || 0;

  return (
    <div className="space-y-4">
      <DataTable
        data={data?.items || []}
        columns={columns}
        selection
        isLoading={isFetching}
        emptyTitle="No dispatch records found"
        isShowPagination
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
    </div>
  );
}
