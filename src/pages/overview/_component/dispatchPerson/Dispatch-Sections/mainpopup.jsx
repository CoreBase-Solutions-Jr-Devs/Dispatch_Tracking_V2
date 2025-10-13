import React from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Eye } from "lucide-react";
import { useGetSavedDispatchedDetailsQuery } from "@/features/dispatch/dispatchAPI";
import EditStatusDialog from "../../invoices-data-table/edit-status-dialog/edit-status-dialog";

const renderText = (text) => (
  <span className="text-foreground font-medium">{text ?? "—"}</span>
);

const renderStatus = (status) => {
  let statusClass = "bg-muted text-muted-foreground border-border";
  switch (status) {
    case "Pending":
      statusClass = "status-store border-status-store/20";
      break;
    case "Verified":
      statusClass = "status-dispatch border-status-verification/20";
      break;
    case "Ongoing":
      statusClass = "status-verification border-status-dispatch/20";
      break;
    case "Delivered":
    case "SAVED":
      statusClass = "status-delivered border-status-delivered/20";
      break;
  }
  return (
    <Badge
      variant="outline"
      className={`${statusClass} w-28 justify-center rounded-md text-xs px-3 py-1 font-medium border`}
    >
      {status ?? "—"}
    </Badge>
  );
};

export default function DispatchMainPopup({ rowData, onClose }) {
  const dispatchNumber = rowData?.dispatchNumber;

  const { data: details, isLoading } = useGetSavedDispatchedDetailsQuery(
    dispatchNumber,
    {
      skip: !dispatchNumber,
    }
  );

  const rows = details || [];
  const status = Number(rowData?.status);

  return (
    <div className="my-1 overflow-x-auto">
      <DialogHeader>
        <h2 className="text-lg font-semibold">Dispatch Details </h2>
      </DialogHeader>

      <Table>
        <TableBody>
          <TableRow className="bg-gray-300 text-sm font-medium">
            <TableCell className="py-1 px-2">Dispatch No</TableCell>
            <TableCell className="py-1 px-2">Doc No</TableCell>
            <TableCell className="py-1 px-2">Customer Name</TableCell>
            <TableCell className="py-1 px-2">Items</TableCell>
            <TableCell className="py-1 px-2">Amount</TableCell>
            <TableCell className="py-1 px-2">Dispatch Date</TableCell>
            {/* <TableCell className="py-1 px-2">Status</TableCell> */}
          </TableRow>

          {rows.map((row, index) => (
            <TableRow key={index} className="text-sm font-medium">
              <TableCell className="py-2 px-2">
                {renderText(row?.dispatchNumber || dispatchNumber)}
              </TableCell>
              <TableCell className="py-1 px-2">
                {renderText(row?.docNo)}
              </TableCell>
              <TableCell className="py-1 px-2">
                {renderText(row?.customerName)}
              </TableCell>
              <TableCell className="py-1 px-2">
                {renderText(row?.items)}
              </TableCell>
              <TableCell className="py-1 px-2">
                {renderText(row?.amount?.toFixed(2))}
              </TableCell>
              <TableCell className="py-1 px-2 font-mono">
                {renderText(
                  row?.dispatchDateTime
                    ? new Date(row.dispatchDateTime).toLocaleString()
                    : "—"
                )}
              </TableCell>
              {/* <TableCell className="py-1 px-1">
                {renderStatus(row?.status)}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DialogFooter className="flex justify-end gap-2 px-3 py-3">
        {status === 3 && (
          <EditStatusDialog
            rowData={rowData}
            view="dispatchedit"
            onSubmit={(updatedData) =>
              console.log("Edited collection type:", updatedData)
            }
          >
            <Button variant="apply" onClick={(e) => e.stopPropagation()}>
              Edit
            </Button>
          </EditStatusDialog>
        )}

        <Button variant="default" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </div>
  );
}
