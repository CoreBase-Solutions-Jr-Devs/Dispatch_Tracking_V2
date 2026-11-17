import { useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export default function DriversSetupTable({
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
            <TableCell className="py-1 px-2">IDNo</TableCell>
            <TableCell className="py-1 px-2">FullName</TableCell>
            <TableCell className="py-1 px-2">Username</TableCell>
            <TableCell className="py-1 px-2">RegNo</TableCell>
            <TableCell className="py-1 px-2">CarMake</TableCell>
            <TableCell className="py-1 px-2">LicenseNo</TableCell>
            <TableCell className="py-1 px-2">Branches</TableCell>
            <TableCell className="py-1 px-2">Active</TableCell>
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
                // className={
                //   row.Disputed === true && row.DeliveryStatus !== "Delivered"
                //     ? "text-red-700 text-xs font-medium"
                //     : row.DeliveryStatus === "Delivered" &&
                //         row.IsCollected === true
                //       ? "text-green-700 text-xs font-medium line-through"
                //       : "text-xs font-medium"
                // }
                onClick={() => handleRowSelect(row)}
                // data-state={row.DocNo === selectedRow?.DocNo ? "selected" : ""}
              >
                <TableCell className="py-1 px-2">{row?.IdNo}</TableCell>
                <TableCell className="py-1 px-2">{row?.FullName}</TableCell>
                <TableCell className="py-1 px-2">{row?.Username}</TableCell>
                <TableCell className="py-1 px-2">{row?.RegNo}</TableCell>

                <TableCell className="py-1 px-2">{row?.CarMake}</TableCell>

                <TableCell className="py-1 px-2">{row?.LicenseNo}</TableCell>
                <TableCell className="py-1 px-2">{row?.Branches}</TableCell>

                <TableCell className="py-1 px-2">
                  <Checkbox
                    className="border border-gray-400"
                    checked={row.Active}
                    disabled
                    onCheckedChange={(value) => handleRowCheck(value, row)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
