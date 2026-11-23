import { useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export function EligibleStaffs({
  data = [],
  handleRowSelection,
  handleRowCheck,
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
            <TableCell className="py-1 px-2">Staff</TableCell>
          </TableRow>

          {isLoading &&
            !isError &&
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-16" />
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
                className={"text-xs font-medium"}
                // data-state={row.DocNo === selectedRow?.DocNo ? "selected" : ""}
              >
                <TableCell className="py-1 px-2">
                  <Checkbox
                    className="border border-gray-400"
                    onCheckedChange={(value) => handleRowCheck(value, row)}
                  />
                </TableCell>
                <TableCell className="py-1 px-2">{row}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function StaffRoleTable({
  data = [],
  handleRowSelection,
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
            <TableCell className="py-1 px-2">Staff</TableCell>
          </TableRow>

          {isLoading &&
            !isError &&
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-16" />
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
                className={"text-xs font-medium"}
                onClick={() => handleRowSelect(row)}
                // data-state={row.DocNo === selectedRow?.DocNo ? "selected" : ""}
              >
                <TableCell className="py-1 px-2">{row}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function StaffEntries({
  data = [],
  handleRowSelection,
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
            <TableCell className="py-1 px-2">Staff</TableCell>
            <TableCell className="py-1 px-2">WeekDay</TableCell>
            <TableCell className="py-1 px-2">workDate</TableCell>
          </TableRow>

          {isLoading &&
            !isError &&
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-16" />
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
                className={"text-xs font-medium"}
                onClick={() => handleRowSelect(row)}
                // data-state={row.DocNo === selectedRow?.DocNo ? "selected" : ""}
              >
                <TableCell className="py-1 px-2">{row?.username}</TableCell>
                <TableCell className="py-1 px-2">{row?.weekday}</TableCell>
                <TableCell className="py-1 px-2">
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(row?.workDate),
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
