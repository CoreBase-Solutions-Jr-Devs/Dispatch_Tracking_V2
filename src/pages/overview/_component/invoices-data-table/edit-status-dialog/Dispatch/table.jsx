import React, { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { useSelectDispatchInvoiceMutation } from "@/features/dispatch/dispatchAPI";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setInvoices } from "@/features/dispatch/dispatchSlice";
import { Skeleton } from "@/components/ui/skeleton";

// Helpers
const renderText = (text) => (
  <span className="text-foreground font-medium">{text || "—"}</span>
);

const renderStatus = (status) => {
  let statusClass = "bg-muted text-muted-foreground border-border";
  switch (status) {
    case "Pending": statusClass = "status-store border-status-store/20"; break;
    case "Verified": statusClass = "status-dispatch border-status-verification/20"; break;
    case "Ongoing": statusClass = "status-verification border-status-dispatch/20"; break;
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

export default function DispatchTable({ data, isLoading, isError, selected = [], onToggle }) {
  const dispatch = useDispatch();

  // Select Invoices API 
// const [selectInvoice, { data: selectedData, isLoading, isError }] = useSelectDispatchInvoiceMutation();

// const dispatchSelected = data?.invoices.isSelected;
  const rows = data;

  // const handleRowSelection = (value, row) => {
  //   const payload = {
  //     dispatchId: row?.dispatchId,
  //     invoices: [
  //       {
  //         invoiceNo: row?.invoiceNo,
  //         isSelected: value,
  //       },
  //     ],
  //   };
  //   console.log(value, row);
  //   // setChecked(!checked);
  //   handleSelectionApi(payload);
  //   // handleSelectionsAPI(payload);
  // };

  // const handleSelectionApi = (data) => {
  //   selectInvoice(data)
  //     .unwrap()
  //     .then((data) => {
  //       console.log(data);
  //       toast.success("selection successfully");
  //       // if (refetchData) refetchData();
  //     })
  //     .catch((error) => {
  //       let description = "Please check your credentials and try again.";
  //       if (error?.data?.errors) {
  //         const errorMessages = Object.values(error.data.errors).flat();
  //         if (errorMessages.length > 0) description = errorMessages.join(" ");
  //       } else if (error?.data?.message) {
  //         description = error.data.message;
  //       }
  //       toast.error("Dispatch Invoice Selection Failed", { description, duration: 4000 });
  //     });
  // };

  // const handleSelectionsAPI = async (formData) => {
  //   try {
  //     const data = await selectInvoice(formData).unwrap();
  //     dispatch(setInvoices({ invoices: data.invoices, pagination: data.pagination }));
  //   } catch (error) {
  //     let description = `Error selecting invoices. Please try again`;
  //     if (error?.data?.errors) {
  //       const errorMessages = Object.values(error.data.errors).flat();
  //       if (errorMessages.length > 0) description = errorMessages.join(" ");
  //     } else if (error?.data?.message) description = error.data.message;

  //     toast.error("Dispatch Invoice Selection Failed", { description, duration: 4000 });
  //   }
  // };


  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          {/* Header Row */}
          <TableRow className="bg-gray-100 dark:bg-gray-700 text-xs font-medium">
            <TableCell className="py-1 px-2">Select</TableCell>
            <TableCell className="py-1 px-2">Doc. No</TableCell>
            <TableCell className="py-1 px-2">CusCode</TableCell>
            <TableCell className="py-1 px-2">CusName</TableCell>
            <TableCell className="py-1 px-2">Items</TableCell>
            <TableCell className="py-1 px-2">Terms</TableCell>
            <TableCell className="py-1 px-2">Ver. Date</TableCell>
            <TableCell className="py-1 px-2">Duration</TableCell>
            <TableCell className="py-1 px-2">Amount</TableCell>
          </TableRow>
          
          {/* Skeleton Loading State */}
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="py-1 px-2">
                  <Skeleton className="h-4 w-4 rounded" />
                </TableCell>
                <TableCell className="py-1 px-2"><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell className="py-1 px-2"><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell className="py-1 px-2"><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell className="py-1 px-2"><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell className="py-1 px-2"><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell className="py-1 px-2"><Skeleton className="h-4 w-28" /></TableCell>
                <TableCell className="py-1 px-2"><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell className="py-1 px-2"><Skeleton className="h-4 w-20" /></TableCell>
              </TableRow>
            ))
          }

          {/* Data Display State */}
          {!isLoading && !isError && rows.length > 0 &&
            rows.map((row, index) => {
              const isChecked = selected.some((d) => d.dispatchId === row.dispatchId);
              return (
                <TableRow key={index} className="text-xs font-medium dark:bg-gray-700">
                  <TableCell className="py-1 px-2">
                    <Checkbox
                      className="border border-gray-400"
                      checked={isChecked}
                      onCheckedChange={() => onToggle(row)}
                    />
                  </TableCell>
                  <TableCell className="py-1 px-2">{renderText(row?.docNo)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(row?.customerCode)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(row?.customerName)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(row?.items)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(row?.payTerms)}</TableCell>
                  <TableCell className="py-1 px-2">{renderDateTime(row?.verifiedDateTime)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(formatDuration(row?.durationMinutes))}</TableCell>
                  <TableCell className="py-1 px-2">{row?.amount}</TableCell>
                </TableRow>
              );
            })
          }


          {/* Error state */}
          {isError && !isLoading && (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4 text-red-500 text-sm">
                Failed to load data. Please try again.
              </TableCell>
            </TableRow>
          )}

          {/* No data state */}
          {!isLoading && !isError && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4 text-muted-foreground text-sm">
                No dispatch records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}