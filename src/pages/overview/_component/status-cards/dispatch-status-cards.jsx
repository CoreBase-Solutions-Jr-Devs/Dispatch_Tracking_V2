import React from 'react';
import SharedStatusCard from './shared-status-cards';
import {Skeleton} from "@/components/ui/skeleton"
import { useGetOverviewQuery } from "@/features/overview/overviewApi";

const DispatchStatusCards = () => {
    const {data, isLoading, isError} = useGetOverviewQuery();

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
        inDispatch: data.indispatch || 0,
        avgDispatchTime: data.avgDispatchTime || "N/A",
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <SharedStatusCard status="Store" label="Today's Invoices" count={statusCounts.todaysInvoices} />
            <SharedStatusCard status="Verification" label="Pending Dispatch" count={statusCounts.pending} />
            <SharedStatusCard status="Dispatch" label="In-Dispatch Invoices" count={statusCounts.inDispatch} />
            <SharedStatusCard status="Delivered" label="Avg Dispatch Time" count={statusCounts.avgDispatchTime} />
        </div>
    );
}

export default DispatchStatusCards;
