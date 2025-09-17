import React, { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";

// Helpers
const renderText = (text) => (
  <span className="text-foreground font-medium">{text || "—"}</span>
);

const renderStatus = (status) => {
  let statusClass = "bg-muted text-muted-foreground border-border";
  switch (status) {
    case "Pending": statusClass = "status-store border-status-store/20"; break;
    case "Verified": statusClass = "status-verification border-status-verification/20"; break;
    case "In Dispatch": statusClass = "status-dispatch border-status-dispatch/20"; break;
    case "Delivered": statusClass = "status-delivered border-status-delivered/20"; break;
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

export default function DispatchTable({ data = [], isLoading = false, pagination, onPageChange, onPageSizeChange, selected, onToggle }) {
  const columns = useMemo(() => {
    return [
      {
        id: 'select',
        header: () => {
          const ref = React.useRef();
          React.useEffect(() => {
            if (ref.current) {
              ref.current.indeterminate = selected?.length > 0 && selected?.length < data.length;
            }
          }, [selected, data]);
          return (
            <input
              ref={ref}
              type="checkbox"
              aria-label="Select all"
              checked={data.length > 0 && selected?.length === data.length}
              onChange={e => {
                if (e.target.checked) {
                  onToggle(data);
                } else {
                  onToggle([]);
                }
              }}
            />
          );
        },
        cell: ({ row }) => (
          <input
            type="checkbox"
            aria-label={`Select row ${row.original.dispatchId}`}
            checked={selected?.some(d => d.dispatchId === row.original.dispatchId)}
            onChange={e => {
              if (e.target.checked) {
                onToggle([...selected, row.original]);
              } else {
                onToggle(selected.filter(d => d.dispatchId !== row.original.dispatchId));
              }
            }}
          />
        ),
        size: 40,
      },
      {
        accessorKey: "dispatchId",
        header: "Dispatch Id",
        cell: ({ row }) => {
          switch ("dispatchId") {
            case "dispatchId": return renderText(row.original.dispatchId);
            default: return renderText("—");
          }
        },
      },
      {
        accessorKey: "customerName",
        header: "Customer Name",
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
        header: "Verified Date & Time",
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
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <div className="flex justify-end space-x-2 border-t pt-2 text-sm font-medium">
        <span>Total Count: {totalCount}</span>
        <span>Total Value: KES {totalValue.toLocaleString()}</span>
      </div>
    </div>
  );
}
