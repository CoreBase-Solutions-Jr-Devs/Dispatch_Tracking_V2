import React, { useState } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import VerificationHeader from "./header";
import VerificationDetails from "./details";
import VerificationSummary from "./summary";
import VerificationRemarks from "./remarks";
import VerificationMeta from "./meta";
import VerificationFooter from "./footer";
import { useGetVerificationTrackingDetailsQuery } from "@/features/invoices/invoicesAPI";

export default function VerificationPopup({ rowData, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogClose = () => setIsOpen(false);

  const { data } = useGetVerificationTrackingDetailsQuery({
    // docNum: Number(rowData.docNumber),
    docNum: Number(rowData.invoiceNo),
  });

  console.log(data);

  return (
    <>
      <DialogHeader>
        <VerificationHeader />
      </DialogHeader>

      <Separator className="mb-4" />

      {/* <VerificationDetails data={rowData} /> */}
      <VerificationDetails data={data} />

      <Separator className="my-2" />

      {/* <VerificationSummary data={rowData} /> */}
      <VerificationSummary data={data} />

      <VerificationRemarks data={data} />

      <VerificationMeta data={data} />

      <DialogFooter>
        <VerificationFooter
          // rowData={rowData}
          rowData={data}
          onSubmit={onSubmit}
          onClose={handleDialogClose}
        />
      </DialogFooter>
    </>
  );
}
