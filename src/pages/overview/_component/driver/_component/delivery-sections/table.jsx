import { useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export default function DeliveryTable({
  data = [],
  handleRowSelection,
  handleRowCheck,
  checkedInvoices = [],
  isLoading = false,
  isError = false,
}) {
  // const rows = data || [];

  const [selectedRow, setSelectedRow] = useState({});

  const handleRowSelect = (selected) => {
    setSelectedRow(selected);
    handleRowSelection(selected);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          {/* Header Row */}
          <TableRow className="bg-gray-100 text-xs font-medium">
            <TableCell className="py-1 px-2">Select</TableCell>
            <TableCell className="py-1 px-2">DispatchNo</TableCell>
            <TableCell className="py-1 px-2">InvoiceNo</TableCell>
            <TableCell className="py-1 px-2">CustomerID</TableCell>
            <TableCell className="py-1 px-2">CustomerName</TableCell>
            <TableCell className="py-1 px-2">Route</TableCell>
            <TableCell className="py-1 px-2">Value</TableCell>
            <TableCell className="py-1 px-2">Paid</TableCell>
            <TableCell className="py-1 px-2">Balance</TableCell>
          </TableRow>

          {isLoading &&
            !isError &&
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-4 rounded" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-20" />
                </TableCell>
              </TableRow>
            ))}

          {isError && !isLoading && (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center py-4 text-red-500 text-sm"
              >
                Failed to load data. Please try again.
              </TableCell>
            </TableRow>
          )}

          {/* {isLoading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center py-4 text-muted-foreground text-sm"
              >
                No dispatch records found.
              </TableCell>
            </TableRow>
          )} */}

          {/* Dynamic Rows */}
          {!isError &&
            data.map((row, index) => (
              <TableRow
                key={index}
                className={
                  row.Disputed === true && row.DeliveryStatus !== "Delivered"
                    ? "text-red-700 text-xs font-medium"
                    : row.DeliveryStatus === "Delivered" &&
                      row.IsCollected === true
                    ? "text-green-700 text-xs font-medium line-through"
                    : "text-xs font-medium"
                }
                onClick={() =>
                  checkedInvoices.length > 0 ||
                  (row.DeliveryStatus === "Delivered" &&
                    row.IsCollected === true)
                    ? null
                    : handleRowSelect(row)
                }
                data-state={row.DocNo === selectedRow?.DocNo ? "selected" : ""}
              >
                <TableCell className="py-1 px-2">
                  <Checkbox
                    className="border border-gray-400"
                    // checked={checked}
                    disabled={
                      row.DeliveryStatus === "Delivered" &&
                      row.IsCollected === true
                    }
                    onCheckedChange={(value) => handleRowCheck(value, row)}
                  />
                </TableCell>
                {/* <TableCell className="py-1 px-2">{row?.DISPATCHNUM}</TableCell>
              <TableCell className="py-1 px-2">{row?.SALEINV_NUM}</TableCell>
              <TableCell className="py-1 px-2">{row?.CUS_CODE}</TableCell>
              <TableCell className="py-1 px-2">{row?.CUSNAME}</TableCell>
              <TableCell className="py-1 px-2">{row?.ROUTENAME}</TableCell>
              <TableCell className="py-1 px-2">
                {new Intl.NumberFormat("en-GB").format(row?.DOCAMT)}
              </TableCell>
              <TableCell className="py-1 px-2">
                {new Intl.NumberFormat("en-GB").format(row?.PAID)}
              </TableCell>
              <TableCell className="py-1 px-2">
                {new Intl.NumberFormat("en-GB").format(row?.BALANCE)}
              </TableCell> */}
                <TableCell className="py-1 px-2">{row?.DispatchNo}</TableCell>
                <TableCell className="py-1 px-2">{row?.DocNo}</TableCell>
                <TableCell className="py-1 px-2">{row?.CustomerID}</TableCell>
                <TableCell className="py-1 px-2">{row?.CustomerName}</TableCell>
                <TableCell className="py-1 px-2">{row?.Route}</TableCell>
                <TableCell className="py-1 px-2">
                  {new Intl.NumberFormat("en-GB").format(row?.DOCAMT)}
                </TableCell>
                <TableCell className="py-1 px-2">
                  {new Intl.NumberFormat("en-GB").format(row?.Paid)}
                </TableCell>
                <TableCell className="py-1 px-2">
                  {new Intl.NumberFormat("en-GB").format(row?.Balance)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
