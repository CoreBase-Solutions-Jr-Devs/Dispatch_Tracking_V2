import React from "react";
import { Label } from "@/components/ui/label";

function DetailRow({ label, value }) {
  return (
    <section className="grid grid-cols-[130px_1fr] items-center">
      <Label className="text-xs font-medium">{label}:</Label>
      <Label className="text-xs font-medium text-muted ml-0.5">
        {value || "N/A"}
      </Label>
    </section>
  );
}
export default function VerificationDetails({ data, readOnly = false }) {
  const formatDateTime = (date) =>
    date ? new Date(date).toLocaleString() : "N/A";

  if (!data) return null;

  return (
    <div className="flex flex-col gap-2">
      <section className="flex gap-x-12">
        <Label className="text-xs font-medium">Customer Name:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.customerName || "—"}
        </Label>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Invoice No:</Label>
          <Label className="text-xs font-medium text-muted">
            {data.invoiceNo || "—"}
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
            {data.salesman || "—"}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Start Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(data.verifyStartDateTime)}
          </Label>
        </div>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Verified By:</Label>
          <Label className="text-xs font-medium text-muted">
            {data.verifiedBy || "—"}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">End Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(data.verifyEndDateTime)}
          </Label>
        </div>
      </section>

      <section>
        <Label className="text-xs font-medium">Verification Remarks:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.verifyRemarks || "—"}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Turnaround Time:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.turnaroundTime || "—"}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Workflow Status:</Label>
        <Label className="text-xs font-medium text-muted">
          {data.workflowStatus || "—"}
        </Label>
      </section>
    </div>
  );
}
