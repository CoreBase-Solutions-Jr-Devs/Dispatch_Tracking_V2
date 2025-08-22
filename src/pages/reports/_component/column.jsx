/* eslint-disable react-refresh/only-export-components */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteReportMutation } from "@/features/reports/reportsAPI";
import { format } from "date-fns";
import { Loader, MoreHorizontal, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export const reportsColumns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.original?.name}</span>,
  },
  {
    accessorKey: "displayKey",
    header: "Display Key",
    cell: ({ row }) => {
      const displayKey = row.original?.displayKey;
      const maskedKey = displayKey.endsWith("...")
        ? displayKey.replace(/\.\.\.$/, "")
        : displayKey;
      return (
        <div
          className="relative px-2 h-8 border rounded-sm bg-muted overflow-hidden whitespace-nowrap
          max-w-[185px] flex items-center"
        >
          <span className="relative z-20">{maskedKey}</span>
          <span
            className="whitespace-nowrap block mt-4 -ml-[0.5px]"
            aria-hidden="true"
          >
            ********************
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => format(row.getValue("createdAt"), "MMM dd, yyyy"),
  },
  {
    accessorKey: "lastUsedAt",
    header: "Last Used",
    cell: ({ row }) => {
      const lastUsedAt = row.original?.lastUsedAt;
      return <span>{lastUsedAt ? format(lastUsedAt, "MMM dd, yyyy") : "Never"}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

const ActionsCell = ({ row }) => {
  const reportId = row.original._id;
  const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

  const handleDelete = () => {
    if (!reportId) return;
    deleteReport(reportId)
      .unwrap()
      .then(() => toast.success("Report deleted successfully"))
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete report");
      });
  };

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" size={undefined}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-44"
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem
          className="relative !text-red-500 !font-medium"
          disabled={isDeleting}
          onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          } } inset={undefined}        >
          <Trash2 className="mr-1 h-4 w-4 !text-red-500" />
          Delete
          {isDeleting && <Loader className="ml-1 h-4 w-4 absolute right-2 animate-spin" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
