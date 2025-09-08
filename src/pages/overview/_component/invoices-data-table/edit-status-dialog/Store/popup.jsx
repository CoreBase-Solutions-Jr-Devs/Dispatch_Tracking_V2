import React, { useState } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import StoreHeader from "./header";
import StoreDetails from "./details";
import StoreSummary from "./summary";
import StoreRemarks from "./remarks";
import StoreMeta from "./meta";
import StoreFooter from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStoreTrackingDetailsQuery } from "@/features/invoices/invoicesAPI";

export default function StorePopup({ rowData, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogClose = () => setIsOpen(false);

  const { data, isLoading, isError } = useGetStoreTrackingDetailsQuery({
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
  const readOnly = rowData?.status === "Processed";

  return (
    <>
      <DialogHeader>
        <StoreHeader />
      </DialogHeader>

      <Separator className="mb-4" />

      <StoreDetails data={data} />

      <Separator className="my-2" />

      <StoreSummary data={data} readOnly={readOnly} />

      <StoreRemarks data={data} readOnly={readOnly} />

      <StoreMeta data={data} readOnly={readOnly} />

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
