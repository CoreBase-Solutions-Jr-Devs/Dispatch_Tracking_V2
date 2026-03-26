import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

export const invoiceColumns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="!border-black data-[state=checked]:!bg-gray-800 !text-white"
                checked={table.getIsAllPageRowsSelected()}
                ref={(el) => {
                    if (el) el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected();
                }}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="!border-black data-[state=checked]:!bg-gray-800 !text-white"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "invoiceNumber",
        header: "Invoice Number",
        cell: ({ row }) => <span className="font-medium">{row.original.invoiceNumber}</span>,
    },
    {
        accessorKey: "client",
        header: "Client",
        cell: ({ row }) => <span className="capitalize text-sm">{row.original.client}</span>,
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <span className="text-sm">${row.original.amount?.toFixed(2)}</span>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original?.status || "Pending";
            const bgColor =
                status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : status === "Overdue"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700";
            return (
                <span className={`px-2 py-1 text-xs rounded-sm ${bgColor}`}>
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) =>
            row.original.dueDate ? format(new Date(row.original.dueDate), "MM/dd/yyyy") : "-",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) =>
            row.original.createdAt ? format(new Date(row.original.createdAt), "MM/dd/yyyy") : "-",
    },
];
