import { useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export default function DeliveryTable({
  data = [],
  handleRowSelection,
  handleRowCheck,
  checkedInvoices = [],
}) {
  // const rows = data || [];

  const [selectedRow, setSelectedRow] = useState({});

  // const [selectDeliveryInvoices, { data: selecteResData, isLoading, isError }] =
  //   useSelectDeliveryInvoicesMutation();

  // const handleSelectionApi = (data) => {
  //   selectDeliveryInvoices(data)
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
  //       toast.error("Store start Failed", { description, duration: 4000 });
  //     });
  // };

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
            {/* <TableCell className="py-1 px-2">Status</TableCell> */}
            {/* <TableCell className="py-1 px-2">Invoice Date & Time</TableCell>
            <TableCell className="py-1 px-2">Items</TableCell>
            <TableCell className="py-1 px-2">Amount</TableCell> */}
          </TableRow>

          {/* Dynamic Rows */}
          {data.map((row, index) => (
            <TableRow
              key={index}
              className={
                row.ISDISPUTED === true
                  ? "text-red-700 text-xs font-medium"
                  : "text-xs font-medium"
              }
              onClick={() =>
                checkedInvoices.length > 0 ? null : handleRowSelect(row)
              }
              data-state={
                row.DISPATCHNUM === selectedRow?.DISPATCHNUM ? "selected" : ""
              }
            >
              <TableCell className="py-1 px-2">
                <Checkbox
                  className="border border-gray-400"
                  // checked={checked}
                  onCheckedChange={(value) => handleRowCheck(value, row)}
                />
              </TableCell>
              <TableCell className="py-1 px-2">{row?.DISPATCHNUMBER}</TableCell>
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
              </TableCell>
              {/* <TableCell className="py-1 px-2">{row?.DispatchStatus}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
