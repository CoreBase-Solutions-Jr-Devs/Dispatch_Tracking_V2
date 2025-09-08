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

export default function StorePopup({ rowData, onSubmit, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [remarks, setRemarks] = useState();
  const [weight, setWeight] = useState(0);
  const [errors, setErrors] = useState({
    weight: "",
    remarks: "",
  });

  const handleRemarksChange = (newRemarks) => {
    setRemarks(newRemarks);
  };
  const handleWeightChange = (newWeight) => {
    setWeight(newWeight);
  };

  const { data, isLoading, isError, refetch } = useGetStoreTrackingDetailsQuery(
    {
      docNum: Number(rowData.invoiceNo),
    }
  );

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
  const readOnly = rowData?.workflowStatus === "Processed";

  return (
    <>
      <DialogHeader>
        <StoreHeader data={data} />
      </DialogHeader>

      <Separator className="mb-4" />

      <StoreDetails data={data} />

      <Separator className="my-2" />

      <StoreSummary
        data={data}
        readOnly={readOnly}
        handleWeightChange={handleWeightChange}
        error={errors.weight}
      />

      <StoreRemarks
        data={data}
        readOnly={readOnly}
        handleRemarksChange={handleRemarksChange}
        error={errors.remarks}
      />

      <StoreMeta data={data} readOnly={readOnly} />

      <DialogFooter>
        <StoreFooter
          remarks={remarks}
          weight={weight}
          setWeight={setWeight} // add this
          setRemarks={setRemarks} // add this
          rowData={data}
          onSubmit={onSubmit}
          onClose={onClose}
          errors={errors}
          setErrors={setErrors}
          refetchData={refetch}
        />
      </DialogFooter>
    </>
  );
}
