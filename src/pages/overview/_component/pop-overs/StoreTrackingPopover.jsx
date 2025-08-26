import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function StoreTrackingPopover({ children, row }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        className="bg-white rounded-lg shadow-lg w-[500px] h-[500px] max-w-full p-6"
        side="left"
        align="center"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-orange-700">
            STORES TRACKING
          </h3>
          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded">
            DOCUMENT POSTED
          </span>
        </div>
        <div className="border-b border-gray-200 my-2"></div>

        <div className="space-y-3 text-sm">
          <p>
            <span className="font-semibold">Customer Name: </span>
            BADAR PHARMACY JOMOKENYATA AVENUE
          </p>

          <p>
            <span className="font-semibold">Invoice No: </span> W1_20022693
            <span className="ml-6 font-semibold">Invoice Date & Time: </span>
            08/20/2025 8:59
          </p>

          <p>
            <span className="font-semibold">Salesman: </span> SAMIR
            <span className="ml-6 font-semibold">Start Date & Time: </span>
            08/21/2025 15:46
          </p>

          <p>
            <span className="font-semibold">Goods Removed By: </span> PAUL NETIA
            <span className="ml-6 font-semibold">End Date & Time: </span>
            08/21/2025 16:16
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Items:</span>5
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">Total Weight (Kg):</span>
              <Input
                type="number"
                placeholder="20"
                className="w-14 h-8 bg-gray-100"
                value={row?.weight || ""}
                onChange={(e) => console.log("Weight:", e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">No of Packages:</span>
              <Input
                type="number"
                placeholder="50"
                className="w-14 h-8 bg-gray-100"
                value={row?.packages || ""}
                onChange={(e) => console.log("Packages:", e.target.value)}
              />
            </div>
          </div>

          <div>
            <span className="font-semibold">Store Remarks:</span>
            <Textarea
              placeholder="Enter remarks..."
              className="mt-1 w-full border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={row?.remarks || ""}
              onChange={(e) => console.log("Remarks:", e.target.value)}
            />
          </div>
        </div>
        <div className="border-b border-gray-200 my-2"></div>

        <div className="flex justify-between mt-6">
          <p>
            <span className="font-semibold">TurnAround Time: </span> 0 D 02 H 30
            M 0 S
          </p>

          <div className="flex flex-col items-end gap-3">
            <p>
              <span className="font-semibold">Store Control: </span> COREDBA
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">
                START
              </button>
              <button className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
                PUSH
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default StoreTrackingPopover;
