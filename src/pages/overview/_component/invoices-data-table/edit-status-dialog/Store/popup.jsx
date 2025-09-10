import React, { useState, useEffect } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import StoreHeader from "./header";
import StoreDetails from "./details";
import StoreSummary from "./summary";
import StoreRemarks from "./remarks";
import StoreMeta from "./meta";
import StoreFooter from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStoreTrackingDetailsQuery } from "@/features/invoices/invoicesAPI";

export default function StorePopup({ rowData, onSubmit, onClose }) {
export default function StorePopup({ rowData, onSubmit, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [remarks, setRemarks] = useState();
  const [errors, setErrors] = useState({
    weight: "",
    remarks: "",
  });
  const [weight, setWeight] = useState(0);

  const { data } = useGetStoreTrackingDetailsQuery({
    // docNum: Number(rowData.docNumber),
    docNum: Number(rowData.invoiceNo),
  });

  console.log("storeDetails", data);

  return (
    <>
      <DialogHeader>
        <StoreHeader data={data} />
      </DialogHeader>

      <Separator className="mb-4" />

      <StoreDetails data={data} />

      <Separator className="my-2" />

      {/* <StoreSummary data={rowData} /> */}
      <StoreSummary data={data} />

      <StoreRemarks
        data={data}
        readOnly={readOnly}
        handleRemarksChange={handleRemarksChange}
        error={errors.remarks}
      />

      <StoreMeta data={data} readOnly={readOnly} />

      <DialogFooter>
        <StoreFooter
          // rowData={rowData}
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
