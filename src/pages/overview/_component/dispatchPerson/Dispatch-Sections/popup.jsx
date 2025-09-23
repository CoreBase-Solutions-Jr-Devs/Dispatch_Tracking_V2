import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { useGetSavedDispatchedDetailsQuery } from "@/features/Dispmain/dispatchAPI";
import { Loader2 } from "lucide-react";

const renderText = (text) => (
  <span className="text-foreground font-medium">{text || "—"}</span>
);

export default function Dispatchpopup({ data, onClose }) {
  // If no dispatch number, don't query
  const dispatchNumber = data?.dispatchNumber;

  // RTK Query to fetch invoice details
  const { data: details, isLoading } = useGetSavedDispatchedDetailsQuery(
    dispatchNumber,
    {
      skip: !dispatchNumber, // don't fetch if dispatchNumber is undefined
    }
  );

  // Table columns
  const columns = [
    {
      accessorKey: "dispatchNumber",
      header: "Dispatch No",
      cell: ({ row }) =>
        renderText(row.original.dispatchNumber || dispatchNumber),
    },

    {
      accessorKey: "invoiceNo",
      header: "Invoice No",
      cell: ({ row }) => renderText(row.original.invoiceNo),
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => renderText(row.original.status),
    },
    {
      accessorKey: "paymentTerms",
      header: "Payment Terms",
      cell: ({ row }) => renderText(row.original.paymentTerms),
    },
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-4">
        <DialogHeader>
          <h2 className="text-lg font-semibold">
            Dispatch Details - {dispatchNumber}
          </h2>
        </DialogHeader>

        <div className="my-2">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-primary" />
            </div>
          ) : (
            <DataTable
              data={details || []} // use details directly
              columns={columns}
              isShowPagination={false}
              selection={false}
              isLoading={isLoading} // optional: show loader if still fetching
            />
          )}
        </div>

        <DialogFooter className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
