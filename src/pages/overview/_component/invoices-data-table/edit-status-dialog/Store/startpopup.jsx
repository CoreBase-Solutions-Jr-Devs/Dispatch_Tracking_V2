import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function StoreStartPopup({ rowData, onConfirm, children }) {
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
          <h3 className="text-lg font-medium">Start Process</h3>
        </DialogHeader>
        <div className="p-2 text-sm font-medium">
          Are you sure you want to start the store process for invoice{" "}
          <strong>{rowData?.invoiceNo}</strong>?
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="destructive"
            className="mt-2 mr-2 uppercase"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button className="mt-2 mr-2 uppercase" onClick={handleStart}>
            Start
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
