import { Skeleton } from "@/components/ui/skeleton";
import { useGetOverviewQuery } from "@/features/overview/overviewApi";
import React from 'react';
import SharedStatusCard from './shared-label-value';

const DeliveryStatusCards = () => {
  const { data, isLoading, isError } = useGetOverviewQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 col-span-full">
        Failed to load overview data.
      </div>
    );
  }

  const today = new Date().toDateString();

  const statusCounts = {
    todaysInvoices: data.todayCount || 0,
    pending: data.pending || 0,
    delivered: data.delivered || 0,
    avgDeliveryTime: data.avgDeliveryTime || "N/A",
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <SharedStatusCard status="Store" label="Today's Deliveries" count={statusCounts.todaysInvoices} />
      <SharedStatusCard status="Verification" label="Invoices Pending Collection" count={statusCounts.pending} />
      <SharedStatusCard status="Dispatch" label="Invoices Delivered" count={statusCounts.delivered} />
      <SharedStatusCard status="Delivered" label="Avg Delivery Time" count={statusCounts.avgDeliveryTime} />
    </div>
  );
}

export default DeliveryStatusCards;
