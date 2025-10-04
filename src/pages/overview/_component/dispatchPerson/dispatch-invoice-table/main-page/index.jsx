import React, { useState, useEffect, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import DispatchHeader from "../sections/header";
import DispatchSearch from "../sections/search";
import DispatchSummary from "../sections/summary";
import DispatchSelect from "../sections/select";
import DispatchDetails from "../sections/details";
import DispatchMeta from "../sections/meta";
import DispatchRemarks from "../sections/remarks";
import DispatchFooter from "../sections/footer";
import { useSelector } from "react-redux";
import { DataTable } from "@/components/data-table";
// import {
//   useGetDispatchInvoicesQuery,
//   useSaveSelectedDispatchesMutation,
//   useSelectedCusCodeQuery,
// } from "@/features/dispatch/dispatchAPI";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
import { useGetDispatchDriverQuery } from "@/features/Dispmain/dispatchAPI";
import { setDriverDetails } from "@/features/dispatch/dispatchSlice";
import { useAppDispatch } from "@/app/hook";
// import { useGetVerifiedOnDispatchQuery } from "@/features/Dispmain/dispatchAPI";

export default function DispatchInvoice({ rowData, onSubmit, onClose }) {
  const [query, setQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  // const { invoices } = useSelector((state) => state.invoice);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const dispatch = useAppDispatch();
  // const [
  //   saveSelectedDispatches,
  //   { data: invoices, isLoading, isError, refetch },
  // ] = useSaveSelectedDispatchesMutation();
  // let dispatchInvoices = invoices?.updatedDispatches || [];
  // let dispatchID = dispatchInvoices.map((item) => item.dispatchId);

  const { updatedDispatches } = useSelector((state) => state.dispatch);

  let dispatchIDs = (updatedDispatches || []).map((item) => item.dispatchId);

  // Fetch filter options to get delivery guy ID
  const {
    data: filterOptions,
    isLoading: filterLoading,
    isError: filterError,
  } = useFilterOptionsQuery();

  const deliveryGuyOptions =
    filterOptions?.find((opt) => opt.key === "deliveryGuy")?.options || [];

  // const { data } = useGetVerifiedOnDispatchQuery({ pageNumber, pageSize });

  const [selectValues, setSelectValues] = useState({
    dispatchPerson: "",
    dispatchRoute: "",
    vehicle: "",
    collectionType: "",
  });

  //   useEffect(() => {
  //     saveSelectedDispatches({ pageNumber, pageSize });
  //   }, [pageNumber, pageSize, saveSelectedDispatches]);

  // useEffect(() => {
  //   if (rowData) {
  //     setSelectValues({
  //       dispatchPerson: rowData.dispatchPerson || "",
  //       dispatchRoute: rowData.dispatchRoute || "",
  //       vehicle: rowData.vehicle || "",
  //       collectionType: rowData.collectionType || "",
  //     });
  //   }
  // }, [rowData]);

  const handleSelectChange = (field, value) => {
    console.log(field, value);

    setSelectValues((prev) => {
      // if (field === "collectionType") {
      //   return {
      //     ...prev,
      //     collectionType: value,
      //     dispatchPerson: value === "delivery" ? prev.dispatchPerson : "",
      //     dispatchRoute: value === "delivery" ? prev.dispatchRoute : "",
      //   };
      // }
      return { ...prev, [field]: value };
    });
  };

  // Fetch driver details based on delivery Guy ID
  const {
    data: driverDetails,
    isLoading: driverLoading,
    isError: driverError,
    error: driverApiError,
  } = useGetDispatchDriverQuery(selectValues.dispatchPerson, {
    skip:
      selectValues.collectionType !== "delivery" ||
      !selectValues.dispatchPerson,
  });

  useEffect(() => {
    dispatch(setDriverDetails(driverDetails));
  }, [driverDetails]);

  // Helper Functions
  const renderStatus = (status) => {
    let statusClass = "bg-muted text-muted-foreground border-border";
    switch (status) {
      case "ONGOING":
        statusClass = "status-store border-status-store/20";
        break;
      case "SELECTED":
        statusClass = "status-verification border-status-verification/20";
        break;
      case "IN DISPATCH":
        statusClass = "status-dispatch border-status-dispatch/20";
        break;
      case "SAVED FOR DISPATCH":
        statusClass = "status-delivered border-status-delivered/20";
        break;
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

  const renderText = (text) => {
    <span className="text-foreground font-medium">{text || "-"}</span>;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "—";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h ? h + "h " : ""}${m}m`;
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
    <span className="font-mono text-sm">{formatUKDateTime(val)}</span>
  );

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "invoiceNo",
        header: "InvNo",
        cell: ({ row }) => {
          return row.original.invoiceNo ?? "-";
        },
      },
      {
        accessorKey: "customerName",
        header: "CusName",
        cell: ({ row }) => {
          return row.original.customerName ?? "-";
        },
      },
      {
        accessorKey: "items",
        header: "Items",
        cell: ({ row }) => {
          return row.original.items ?? "-";
        },
      },
      {
        accessorKey: "docType",
        header: "DocType",
        cell: ({ row }) => {
          return row.original.docType ?? "-";
        },
      },
      {
        accessorKey: "paymentTerms",
        header: "Terms",
        cell: ({ row }) => {
          return row.original.paymentTerms ?? "-";
        },
      },
      {
        accessorKey: "verifiedDateTime",
        header: "Ver. Date",
        cell: ({ row }) => {
          return renderDateTime(row.original.verifiedDateTime ?? "-");
        },
      },
      {
        accessorKey: "dispatchDateTime",
        header: "Disp. Date",
        cell: ({ row }) => {
          return renderDateTime(row.original.dispatchDateTime ?? "-");
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          return row.original.amount ?? "-";
        },
      },
    ];
  }, []);

  return (
    <div className="my-1 max-h-[90vh] px-2">
      {/* Header */}
      <DispatchHeader />

      <Separator className="my-2" />

      {/* Search */}
      <DispatchSearch
        value={query}
        onChange={setQuery}
        data={rowData}
        placeholder="CusName/Inv.No/Route"
      />

      <Separator className={"my-2"} />

      <div className="flex justify-center items-start space-x-8">
        <div className="w-3/4">
          {/* Table + Summary */}
          <div className="space-y-4">
            <DataTable
              //   data={dispatchInvoices}
              data={updatedDispatches || []}
              columns={columns}
              selection={true}
              isLoading={false}
              emptyTitle="No invoices found"
              isShowPagination={true}
              onPageChange={setPageNumber}
              onPageSizeChange={setPageSize}
              pagination={{
                pageNumber: 1,
                pageSize: pageSize,
                totalItems: updatedDispatches?.length,
                totalPages:
                  Math.ceil(updatedDispatches?.length / pageSize) || 1,
              }}
            />
            <DispatchSummary data={updatedDispatches} />
          </div>
        </div>
        {/* Dispatch Selections*/}
        <div className="w-1/4">
          <Card className="h-full flex flex-col p-2">
            <CardContent className="space-y-4">
              <DispatchSelect
                values={selectValues}
                onChange={handleSelectChange}
                deliveryGuyOptions={deliveryGuyOptions}
              />
              <DispatchDetails
                data={driverDetails}
                collectionType={selectValues.collectionType}
                deliveryPerson={selectValues.dispatchPerson}
                driverLoading={driverLoading}
                driverError={driverError}
                driverApiError={driverApiError}
              />
              <DispatchRemarks />
              <DispatchMeta />
              {/* Footer */}
              <DispatchFooter
                dispatchIDs={dispatchIDs}
                rowData={rowData}
                selectValues={selectValues}
                onSubmit={onSubmit}
                onClose={onClose}
                // refetchData={refetch}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-2" />
    </div>
  );
}
