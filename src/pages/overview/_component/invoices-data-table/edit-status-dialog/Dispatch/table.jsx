import React, { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { useSelectDispatchInvoiceMutation } from "@/features/dispatch/dispatchAPI";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setInvoices } from "@/features/dispatch/dispatchSlice";

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

export default function DispatchTable({ data }) {
  const dispatch = useDispatch();

  // Select Invoices API 
// const [selectInvoice, { data: selectedData, isLoading, isError }] = useSelectDispatchInvoiceMutation();

// const dispatchSelected = data?.invoices.isSelected;
  const rows = data;

  const handleRowSelection = (value, row) => {
    const payload = {
      dispatchId: row?.dispatchId,
      invoices: [
        {
          invoiceNo: row?.invoiceNo,
          isSelected: value,
        },
      ],
    };
    console.log(value, row);
    // setChecked(!checked);
    handleSelectionApi(payload);
    // handleSelectionsAPI(payload);
  };

  const handleSelectionApi = (data) => {
    selectInvoice(data)
      .unwrap()
      .then((data) => {
        console.log(data);
        toast.success("selection successfully");
        // if (refetchData) refetchData();
      })
      .catch((error) => {
        let description = "Please check your credentials and try again.";
        if (error?.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat();
          if (errorMessages.length > 0) description = errorMessages.join(" ");
        } else if (error?.data?.message) {
          description = error.data.message;
        }
        toast.error("Dispatch Invoice Selection Failed", { description, duration: 4000 });
      });
  };

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
              <TableRow className="bg-gray-100 text-xs font-medium">
                <TableCell className="py-1 px-2">Select</TableCell>
                {/* <TableCell className="py-1 px-2">Disp. Id</TableCell> */}
                <TableCell className="py-1 px-2">Inv. No</TableCell>
                <TableCell className="py-1 px-2">CusCode</TableCell>
                <TableCell className="py-1 px-2">CusName</TableCell>
                <TableCell className="py-1 px-2">Items</TableCell>
                <TableCell className="py-1 px-2">PayTerms</TableCell>
                <TableCell className="py-1 px-2">Ver. Date & Time</TableCell>
                <TableCell className="py-1 px-2">Duration</TableCell>
                <TableCell className="py-1 px-2">Status</TableCell>
              </TableRow>
    
              {/* Dynamic Rows */}
              {rows.map((row, index) => (
                <TableRow key={index} className="text-xs font-medium">
                  <TableCell className="py-1 px-2">
                    <Checkbox
                      className="border border-gray-400"
                      // checked={checked}
                      onCheckedChange={(value) => handleRowSelection(value, row)}
                    />
                  </TableCell>
                  {/* <TableCell className="py-1 px-2">{renderText(row?.dispatchId)}</TableCell> */}
                  <TableCell className="py-1 px-2">{renderText(row?.invoiceNo)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(row?.customerCode)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(row?.customerName)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(row?.items)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(row?.payTerms)}</TableCell>
                  <TableCell className="py-1 px-2">{renderDateTime(row?.verifiedDateTime)}</TableCell>
                  <TableCell className="py-1 px-2">{renderText(formatDuration(row?.durationMinutes))}</TableCell>
                  <TableCell className="py-1 px-2">{renderStatus(row?.dispatchStatus)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}