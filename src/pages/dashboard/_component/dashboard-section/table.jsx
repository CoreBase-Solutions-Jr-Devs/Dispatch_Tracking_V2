// import { useState } from "react";
import { useAppDispatch } from "@/app/hook";
import { DataTable } from "@/components/data-table";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { useGetAllGeneralInvoicesQuery } from "@/features/dashboard/dashboardAPI";
import { setSummary } from "@/features/dashboard/dashboardSlice";
import { roleToView } from "@/lib/utils";
import { useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

export default function DashboardTable() {
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 20,
  });

  const { data, isLoading, isSuccess } = useGetAllGeneralInvoicesQuery({
    ...filter,
  });

  let invoices = data?.invoices || [];
  let pagination = data?.pagination || {};
  let summary = data?.summary || [];

  // const view = roleToView("View All Stages");
  const view = roleToView("SuperAdmin");
  const columns = getInvoiceColumns(view);

  const handlePageChange = (pageNumber) => {
    setFilter((prev) => ({ ...prev, pageNumber }));
  };

  const handlePageSizeChange = (pageSize) => {
    setFilter((prev) => ({ ...prev, pageSize }));
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setSummary(summary));
    }
  }, [isSuccess, data, dispatch]);

  return (
    // <div className="overflow-x-auto">
    //   <Table>
    //     <TableBody>
    //       {/* Header Row */}
    //       <TableRow className="bg-gray-100 text-xs font-medium">
    //         <TableCell className="py-1 px-2">DocNumber</TableCell>
    //         <TableCell className="py-1 px-2">Account</TableCell>
    //         <TableCell className="py-1 px-2">Amount</TableCell>
    //         <TableCell className="py-1 px-2">DocDate</TableCell>
    //         <TableCell className="py-1 px-2">DocTime</TableCell>
    //         <TableCell className="py-1 px-2">Itms</TableCell>
    //         <TableCell className="py-1 px-2">PrintC</TableCell>
    //         {/* <TableCell className="py-1 px-2">Store</TableCell> */}
    //         <TableCell className="py-1 px-2">StoreDate</TableCell>
    //         <TableCell className="py-1 px-2">StoreTime</TableCell>
    //         {/* <TableCell className="py-1 px-2">Vrf1</TableCell> */}
    //         <TableCell className="py-1 px-2">VrfDate</TableCell>
    //         <TableCell className="py-1 px-2">VrfTime</TableCell>
    //         {/* <TableCell className="py-1 px-2">Vrf2</TableCell> */}
    //         {/* <TableCell className="py-1 px-2">Vrf2Date</TableCell>
    //         <TableCell className="py-1 px-2">Vrf2Time</TableCell> */}
    //         {/* <TableCell className="py-1 px-2">Disp</TableCell> */}
    //         <TableCell className="py-1 px-2">DispDate</TableCell>
    //         <TableCell className="py-1 px-2">DispTime</TableCell>
    //       </TableRow>

    //       {/* Dynamic Rows */}
    //       {data.map((row, index) => (
    //         <TableRow key={index} className={"text-xs font-medium"}>
    //           <TableCell className="py-1 px-2">{row?.docNo}</TableCell>
    //           <TableCell className="py-1 px-2">{row?.account}</TableCell>
    //           <TableCell className="py-1 px-2">
    //             {new Intl.NumberFormat("en-GB").format(row?.amount)}
    //           </TableCell>
    //           <TableCell className="py-1 px-2">
    //             {new Intl.DateTimeFormat("en-GB").format(
    //               new Date(row?.docDate)
    //             )}
    //           </TableCell>
    //           <TableCell className="py-1 px-2">
    //             {row?.docTime?.split(".")[0]}
    //           </TableCell>
    //           <TableCell className="py-1 px-2">{row?.items}</TableCell>
    //           <TableCell className="py-1 px-2">{row?.printCopy}</TableCell>
    //           <TableCell className="py-1 px-2">
    //             {new Intl.DateTimeFormat("en-GB").format(
    //               new Date(row?.storeDate)
    //             )}
    //           </TableCell>
    //           <TableCell className="py-1 px-2">
    //             {row?.storeTime?.split("T")[1]?.split(".")[0]}
    //           </TableCell>
    //           <TableCell className="py-1 px-2">
    //             {new Intl.DateTimeFormat("en-GB").format(new Date(row?.vfDate))}
    //           </TableCell>
    //           <TableCell className="py-1 px-2">
    //             {row?.vfTime?.split("T")[1]?.split(".")[0]}
    //           </TableCell>
    //           <TableCell className="py-1 px-2">
    //             {new Intl.DateTimeFormat("en-GB").format(
    //               new Date(row?.dispDate)
    //             )}
    //           </TableCell>
    //           <TableCell className="py-1 px-2">
    //             {row?.dispTime?.split(".")[0]}
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </div>

    <div className="space-y-4">
      {/* <InvoiceToolbar role={view} /> */}

      <DataTable
        data={invoices}
        columns={columns}
        selection={false}
        isLoading={isLoading}
        emptyTitle="No invoices found"
        isShowPagination={true}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        pagination={{
          pageNumber: filter?.pageNumber,
          pageSize: filter?.pageSize,
          totalItems: invoices.length,
          totalPages: Math.ceil(invoices.length / pagination?.pageSize),
          // totalPages: pagination?.totalPages || 1,
        }}
      />
    </div>
  );
}
