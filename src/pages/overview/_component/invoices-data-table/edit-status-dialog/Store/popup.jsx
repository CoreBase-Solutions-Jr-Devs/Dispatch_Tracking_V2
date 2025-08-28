import React, { useState } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import StoreHeader from "./header";
import StoreDetails from "./details";
import StoreSummary from "./summary";
import StoreRemarks from "./remarks";
import StoreMeta from "./meta";
import StoreFooter from "./footer";

export default function StorePopup({ rowData, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogClose = () => setIsOpen(false);

  return (
    <>
      <DialogHeader>
        <StoreHeader />
      </DialogHeader>

      <Separator className="mb-4" />

      <StoreDetails data={rowData} />

      <Separator className="my-2" />

      <StoreSummary data={rowData} />

      <StoreRemarks />

      <StoreMeta />

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
