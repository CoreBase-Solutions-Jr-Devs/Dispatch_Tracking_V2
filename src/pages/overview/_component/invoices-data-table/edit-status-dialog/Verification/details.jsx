import React from "react";
import { Label } from "@/components/ui/label";
import { useGetVerificationTrackingDetailsQuery } from "@/features/invoices/invoicesAPI";
import { Skeleton } from "@/components/ui/skeleton";

export default function VerificationDetails({ row }) {
  const docNum = row?.original?.docNumber; 

  console.log("docNum received in VerificationDetails:", docNum);

  const { data, isLoading, isError } = useGetVerificationTrackingDetailsQuery(
    docNum,
    { skip: !docNum }
  );

  if (!docNum) {
    return (
      <div className="text-sm text-muted">No document number selected</div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-sm">
        Failed to load verification tracking data.
      </div>
    );
  }

  const verificationData = data?.value || {};

  const formatDateTime = (date) =>
    date ? new Date(date).toLocaleString() : "N/A";

  return (
    <div className="flex flex-col gap-2">
      <section className="flex gap-x-12">
        <Label className="text-xs font-medium">Customer Name:</Label>
        <Label className="text-xs font-medium text-muted">
          {verificationData.customerName}
        </Label>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Invoice No:</Label>
          <Label className="text-xs font-medium text-muted">
            {verificationData.invoiceNo}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Invoice Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(verificationData.invoiceDateTime)}
          </Label>
        </div>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Salesman:</Label>
          <Label className="text-xs font-medium text-muted">
            {verificationData.salesman}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Start Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(verificationData.verifyStartDateTime)}
          </Label>
        </div>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Verified By:</Label>
          <Label className="text-xs font-medium text-muted">
            {verificationData.verifiedBy}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">End Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {formatDateTime(verificationData.verifyEndDateTime)}
          </Label>
        </div>
      </section>

      <section>
        <Label className="text-xs font-medium">Verification Remarks:</Label>
        <Label className="text-xs font-medium text-muted">
          {verificationData.verificationRemarks}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Turnaround Time:</Label>
        <Label className="text-xs font-medium text-muted">
          {verificationData.turnaroundTime}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Workflow Status:</Label>
        <Label className="text-xs font-medium text-muted">
          {verificationData.workflowStatus}
        </Label>
      </section>
    </div>
  );
}
