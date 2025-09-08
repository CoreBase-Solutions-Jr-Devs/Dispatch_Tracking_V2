import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function VerificationStartPopup({ rowData, onConfirm, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    onConfirm(false); 
    setIsOpen(false);
  };

  const handleStart = () => {
    onConfirm(true);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {React.cloneElement(children, { onClick: () => setIsOpen(true) })}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <h3 className="text-lg font-medium">Start Verification Process</h3>
        </DialogHeader>
        <div className="p-4">
          Are you sure you want to start the verification process for invoice{" "}
          <strong>{rowData?.invoiceNo}</strong>?
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="destructive" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleStart}>Start</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
