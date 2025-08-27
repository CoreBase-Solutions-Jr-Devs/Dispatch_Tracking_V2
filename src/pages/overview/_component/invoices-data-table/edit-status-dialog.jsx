import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const EditStatusDialog = ({ children, rowData, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-primary">STORES TRACKING</DialogTitle>
            <span className="px-3 py-1 text-sm bg-green-500 text-gray-900 rounded">
              DOCUMENT POSTED
            </span>
          </div>
        </DialogHeader>

        <div className="border-b border-gray-200 my-2"></div>

        <div className="mb-1">
          <span className="font-semibold">Customer Name:</span>{" "}
          {rowData?.customerName || "BADAR PHARMACY JOMOKENYATA AVENUE"}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3  text-sm mb-2 ">
          <div>
            <span className="font-semibold">Invoice No:</span>{" "}
            {rowData?.invoiceNo || "W1_20022693"}
          </div>
          <div>
            <span className="font-semibold">Invoice Date & Time:</span>{" "}
            {rowData?.invoiceDate || "08/20/2025 8:59"}
          </div>

          <div>
            <span className="font-semibold">Salesman:</span>{" "}
            {rowData?.salesman || "SAMIR"}
          </div>
          <div>
            <span className="font-semibold">Start Date & Time:</span>{" "}
            {rowData?.startDate || "08/21/2025 15:46"}
          </div>

          <div>
            <span className="font-semibold">Goods Removed By:</span>{" "}
            {rowData?.removedBy || "PAUL NETIA"}
          </div>
          <div>
            <span className="font-semibold">End Date & Time:</span>{" "}
            {rowData?.endDate || "08/21/2025 16:16"}
          </div>
        </div>

        <hr className="border-gray-200 " />

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Items:</span> {rowData?.items || 5}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Total Weight (Kg):</span>
            <Input
              type="number"
              placeholder="20"
              className="w-14 h-8 bg-gray-100"
              value={rowData?.weight || ""}
              onChange={(e) => console.log("Weight:", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">No of Packages:</span>
            <Input
              type="number"
              placeholder="50"
              className="w-14 h-8 bg-gray-100"
              value={rowData?.packages || ""}
              onChange={(e) => console.log("Packages:", e.target.value)}
            />
          </div>
        </div>

        <div className="mb-2">
          <span className="font-semibold">Store Remarks:</span>
          <Textarea
            placeholder="Enter remarks..."
            className="mt-3 w-full border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={rowData?.remarks || ""}
            onChange={(e) => console.log("Remarks:", e.target.value)}
          />
        </div>

        <div className="border-b border-gray-200 my-1"></div>

        <DialogFooter className="w-full">
          <div className="flex justify-between items-start w-full">
            <div>
              <span className="font-semibold">TurnAround Time: </span>
              {rowData?.turnAround || "0 D 02 H 30 M 0 S"}
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="font-semibold">
                Store Control: {rowData?.storeControl || "COREDBA"}
              </span>
              <div className="flex gap-3">
                <Button className="bg-primary text-white">START</Button>
                <Button className="bg-green-500 text-white">PUSH</Button>
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusDialog;
