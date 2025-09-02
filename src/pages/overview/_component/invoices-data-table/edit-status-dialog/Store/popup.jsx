import React, { useState } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import StoreHeader from "./header";
import StoreDetails from "./details";
import StoreSummary from "./summary";
import StoreRemarks from "./remarks";
import StoreMeta from "./meta";
import StoreFooter from "./footer";
import { useGetStoreTrackingDetailsQuery } from "@/features/invoices/invoicesAPI";

export default function StorePopup({ rowData, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogClose = () => setIsOpen(false);

  const { data } = useGetStoreTrackingDetailsQuery({
    docNum: Number(rowData.docNumber),
  });

  console.log("storeDetails", data);

  return (
    <>
      <DialogHeader>
        <StoreHeader />
      </DialogHeader>

      <Separator className="mb-4" />

      {/* <StoreDetails data={rowData} /> */}
      <StoreDetails data={data} />

      <Separator className="my-2" />

      {/* <StoreSummary data={rowData} /> */}
      <StoreSummary data={data} />

      <StoreRemarks data={data} />

      <StoreMeta data={data} />

      <DialogFooter>
        <StoreFooter
          // rowData={rowData}
          rowData={data}
          onSubmit={onSubmit}
          onClose={handleDialogClose}
        />
      </DialogFooter>
    </>
  );
}
