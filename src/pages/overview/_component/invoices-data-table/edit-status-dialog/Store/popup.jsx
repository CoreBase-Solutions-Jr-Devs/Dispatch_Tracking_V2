import React, { useState } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useGetStoreTrackingDetailsQuery } from "@/features/invoices/invoicesAPI";

import StoreHeader from "./header";
import StoreDetails from "./details";
import StoreSummary from "./summary";
import StoreRemarks from "./remarks";
import StoreMeta from "./meta";
import StoreFooter from "./footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function StorePopup({ rowData, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const docNum = rowData?.original?.docNumber;

  const { data, isLoading, isError } = useGetStoreTrackingDetailsQuery(docNum, {
    skip: !docNum,
  });

  const handleDialogClose = () => setIsOpen(false);

  if (!docNum) {
    return (
      <div className="text-sm text-muted">No document number selected</div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-sm p-4">Failed to load data.</div>;
  }

  const storeData = data?.value || {};

  return (
    <>
      <DialogHeader>
        <StoreHeader />
      </DialogHeader>

      <Separator className="mb-4" />

      
      <StoreDetails data={storeData} />

      <Separator className="my-2" />

      <StoreSummary data={storeData} />

      <StoreRemarks data={storeData} />

      <StoreMeta data={storeData} />

      <DialogFooter>
        <StoreFooter
          rowData={rowData}
          onSubmit={onSubmit}
          onClose={handleDialogClose}
        />
      </DialogFooter>
    </>
  );
}
