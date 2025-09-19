import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

const renderText = (text) => (
  <span className="text-foreground font-medium ">{text || "—"}</span>
);

export default function Dispatchpopup({ data, onClose }) {
  const tableData = data ? [data] : [];

  const columns = [
    {
      accessorKey: "customerName",
      header: "Customer Name",
      cell: ({ row }) => renderText(row.original.customerName),
    },
    {
      accessorKey: "paymentTerms",
      header: "Payment Terms",
      cell: ({ row }) => renderText(row.original.paymentTerms),
    },
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full p-4">
        <DialogHeader>
          <h2 className="text-lg font-semibold">Dispatch Details</h2>
        </DialogHeader>

        <div className="my-2">
          <DataTable
            data={tableData}
            columns={columns}
            isShowPagination={false}
            selection={false}
            isLoading={false}
          />
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
