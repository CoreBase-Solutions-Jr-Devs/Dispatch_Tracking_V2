import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStoreInvoicesMutation } from "@/features/invoices/invoicesAPI";
import React, { useEffect } from "react";
import LabelValue from "./shared-label-value";

const DispatchLabelValue = () => {
    const [filterStoreInvoices, { data, isLoading, isError }] =
        useFilterStoreInvoicesMutation()
    
        useEffect(() => {
            filterStoreInvoices({});
        }, [filterStoreInvoices]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
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

    const stats = data?.stats || {};

    return (
        <div
            className="
                flex flex-col gap-2 
                sm:flex-row sm:flex-wrap sm:justify-center 
                md:gap-4
                lg:gap-6
            "
        >
            <LabelValue
                status="Store"
                label="Today"
                value={data?.invoices?.length || 0}
            />
            <LabelValue
                status="Verification"
                label="Pending"
                value={stats.pendingCount || 0}
            />
            <LabelValue
                status="Dispatch"
                label="Dispatched"
                value={stats.dispatchedCount || 0}
            />
            <LabelValue
                status="Delivered"
                label="Avg. Dispatch Time"
                value={
                    stats.avgDurationSeconds !== undefined
                        ? `${stats.avgDurationSeconds} sec`
                        : "N/A"
                }
            />
        </div>
    );
};

export default DispatchLabelValue;
