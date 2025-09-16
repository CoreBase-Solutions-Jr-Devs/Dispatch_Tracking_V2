import React, { useState, useEffect } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import DispatchHeader from "./header";
// import DispatchDetails from "./details";
// import DispatchSummary from "./summary";
// import DispatchRemarks from "./remarks";
// import DispatchMeta from "./meta";
// import DispatchTable from "./table";
// import DispatchFooter from "./footer";
// import DispatchSelect from "./select";
// import DispatchSearch from "./search";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDeliveryTrackingDetailsQuery } from "@/features/delivery/deliveryAPI";

export default function DispatchPopup({ rowData, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [selectValues, setSelectValues] = useState({
    deliveryPerson: "",
    deliveryRoute: "",
    vehicle: "",
    collectionType: "",
  });

  useEffect(() => {
    if (rowData) {
      setSelectValues({
        deliveryPerson: rowData.deliveryPerson || "",
        deliveryRoute: rowData.deliveryRoute || "",
        vehicle: rowData.vehicle || "",
        collectionType: rowData.collectionType || "",
      });
    }
  }, [rowData]);

  const handleSelectChange = (field, value) => {
    setSelectValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleDialogClose = () => setIsOpen(false);
  const { data, isLoading, isError } = useGetDeliveryTrackingDetailsQuery({
    docNum: Number(rowData.invoiceNo),
  });
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load store tracking details.
      </div>
    );
  }
  return (
    <>
      {/* <div className="my-1 overflow-y-auto max-h-[90vh] px-2">
        <DialogHeader>
          <DispatchHeader />
        </DialogHeader>

        <Separator className="my-2" />

        <DispatchSearch
          value={query}
          onChange={setQuery}
          data={data}
          placeholder="invoice No..."
        />
        <Separator />
        <div className="space-y-4">
          <DispatchTable data={data} />
          <DispatchSummary data={data} />
        </div>

        <Separator className="my-2" />
        <div className="flex flex-col md:flex-row md:gap-x-8 gap-y-4 mb-1">
          <DispatchSelect values={selectValues} onChange={handleSelectChange} />

          <div className="flex flex-col gap-3">
            <DispatchDetails data={data} />
            <DispatchMeta data={data} />
          </div>
        </div>

        <DispatchRemarks data={data} />

        <DialogFooter>
          <DispatchFooter
            data={data}
            selectValues={selectValues}
            onSubmit={onSubmit}
            onClose={handleDialogClose}
          />
        </DialogFooter>
      </div> */}
    </>
  );
}
