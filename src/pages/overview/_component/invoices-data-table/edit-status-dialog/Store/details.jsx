import React from "react";
import { Label } from "@/components/ui/label";
import { useGetStoreTrackingQuery } from "@/features/invoices/storeAPI";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreDetails({ row }) {
  const docNum = row?.original?.docNumber;

  console.log("docNum received in StoreDetails:", docNum);

  const skipQuery = !docNum;
  const { data, isLoading, isError } = useGetStoreTrackingQuery(docNum, {
    skip: skipQuery,
  });

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
        Failed to load store tracking data.
      </div>
    );
  }

  const storeData = data?.value || {};

  const formatDateTime = (date) =>
    date ? new Date(date).toLocaleString() : "N/A";

  return (
    <div className="flex flex-col gap-2">
      <section className="flex gap-x-12">
        <Label className="text-xs font-medium">Customer Name:</Label>
        <Label className="text-xs font-medium text-muted">
          {data?.customerName}
        </Label>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Invoice No:</Label>
          <Label className="text-xs font-medium text-muted">
            {data?.invoiceNo}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Invoice Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {/* {data.invoiceDate} */}
            {new Date(data?.invoiceDateTime).toLocaleString()}
          </Label>
        </div>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Salesman:</Label>
          <Label className="text-xs font-medium text-muted">
            {data?.salesman}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Start Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {data?.startDate}
          </Label>
        </div>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Goods Removed By:</Label>
          <Label className="text-xs font-medium text-muted">
            {data?.goodsRemovedBy}
          </Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">End Date & Time:</Label>
          <Label className="text-xs font-medium text-muted">
            {data?.endDate}
          </Label>
        </div>
      </section>

      <section>
        <Label className="text-xs font-medium">Store Remarks:</Label>
        <Label className="text-xs font-medium text-muted">
          {storeData.storeRemarks || "N/A"}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Turnaround Time:</Label>
        <Label className="text-xs font-medium text-muted">
          {storeData.turnaroundTime || "N/A"}
        </Label>
      </section>

      <section>
        <Label className="text-xs font-medium">Workflow Status:</Label>
        <Label className="text-xs font-medium text-muted">
          {storeData.workflowStatus || "N/A"}
        </Label>
      </section>
    </div>
  );
}
