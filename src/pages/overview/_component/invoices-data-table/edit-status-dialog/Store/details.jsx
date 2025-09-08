import React from "react";
import { Label } from "@/components/ui/label";

export default function StoreDetails({ data }) {
  const formatDateTime = (date) =>
    date ? new Date(date).toLocaleString() : "N/A";

  if (!data) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Customer Name */}
      <section className="flex gap-2 items-center">
        <Label className="text-xs font-medium">Customer Name:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.customerName || "—"}
        </Label>
      </section>

      {/* Invoice No & Invoice Date & Time */}
      <section className="flex justify-between gap-4">
        <div className="flex w-1/2 gap-2 items-center">
          <Label className="text-xs font-medium">Invoice No:</Label>
          <Label className="text-xs font-medium text-muted">
            {data.invoiceNo || "—"}
          </Label>
        </div>
        <div className="flex w-1/2 gap-2 items-center">
          <Label className="text-xs font-medium">Invoice Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(data.invoiceDateTime)}
          </Label>
        </div>
      </section>

      {/* Salesman & Start Date & Time */}
      <section className="flex justify-between gap-4">
        <div className="flex w-1/2 gap-2 items-center">
          <Label className="text-xs font-medium">Salesman:</Label>
          <Label className="text-xs font-medium text-muted">
            {data.salesman || "—"}
          </Label>
        </div>
        <div className="flex w-1/2 gap-2 items-center">
          <Label className="text-xs font-medium">Start Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(data.storeStartDateTime)}
          </Label>
        </div>
      </section>

      <section className="flex justify-between gap-4">
        <div className="flex w-1/2 gap-2 items-center">
          <Label className="text-xs font-medium">Goods Removed By:</Label>
          <Label className="text-xs font-medium text-muted">
            {data.goodsRemovedBy || "—"}
          </Label>
        </div>
        <div className="flex w-1/2 gap-2 items-center">
          <Label className="text-xs font-medium">End Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(data.storeEndDateTime)}
          </Label>
        </div>
      </section>
    </div>
  );
}
