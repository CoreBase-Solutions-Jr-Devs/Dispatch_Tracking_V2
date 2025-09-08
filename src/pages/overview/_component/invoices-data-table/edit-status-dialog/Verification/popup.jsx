import React, { useState } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import VerificationHeader from "./header";
import VerificationDetails from "./details";
import VerificationSummary from "./summary";
import VerificationRemarks from "./remarks";
import VerificationMeta from "./meta";
import VerificationFooter from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVerificationTrackingDetailsQuery } from "@/features/invoices/invoicesAPI";

export default function VerificationPopup({ rowData, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogClose = () => setIsOpen(false);

  const { data, isLoading, isError } = useGetVerificationTrackingDetailsQuery({
    docNum: Number(rowData.docNumber),
  });

  const readOnly = rowData?.status === "Processed";

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
        Failed to load verification tracking details.
      </div>
    );
  }

  return (
    <>
      <DialogHeader>
        <VerificationHeader />
      </DialogHeader>

      <Separator className="mb-4" />

      <VerificationDetails data={data} readOnly={readOnly} />

      <Separator className="my-2" />

      <VerificationSummary data={data} readOnly={readOnly} />

      <VerificationRemarks data={data} readOnly={readOnly} />

      <VerificationMeta data={data} readOnly={readOnly} />

      <DialogFooter>
        <VerificationFooter
          rowData={data}
          onSubmit={onSubmit}
          onClose={handleDialogClose}
        />
      </DialogFooter>
    </>
  );
}
