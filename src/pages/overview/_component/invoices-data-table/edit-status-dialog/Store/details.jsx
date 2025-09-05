import React from "react";
import { Label } from "@/components/ui/label";

export default function StoreDetails({ data }) {
  const formatDateTime = (date) =>
    date ? new Date(date).toLocaleString() : "N/A";

  return (
    <div className="flex flex-col gap-2">
      <section className="flex gap-x-12">
        <Label className="text-xs font-medium">Customer Name:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.customerName}
        </Label>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Invoice No:</Label>
          <Label className="text-xs font-medium text-muted">
            {data.invoiceNo}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Invoice Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(data.invoiceDateTime)}
          </Label>
        </div>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Salesman:</Label>
          <Label className="text-xs font-medium text-muted">
            {data.salesman}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Start Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(data.storeStartDateTime)}
          </Label>
        </div>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Goods Removed By:</Label>
          <Label className="text-xs font-medium text-muted">
            {data.goodsRemovedBy}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">End Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(data.storeEndDateTime)}
          </Label>
        </div>
      </section>

      <section>
        <Label className="text-xs font-medium">Store Control:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.storeControl}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Total Weight (Kg):</Label>
        <Label className="text-xs font-medium text-muted">
          {data.totalWeightKg}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Store Remarks:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.storeRemarks}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Turnaround Time:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.turnaroundTime}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Workflow Status:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.workflowStatus}
        </Label>
      </section>
    </div>
  );
}
