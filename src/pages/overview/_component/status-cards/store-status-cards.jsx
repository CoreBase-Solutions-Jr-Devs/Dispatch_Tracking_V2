import React from "react";
import SharedStatusCard from "./shared-status-cards";

const StoreStatusCards = ({ data }) => {
    const today = new Date().toDateString();

    const counts = {
        todayInvoices: data.filter((i) => new Date(i.createdAt).toDateString() === today).length,
        pending: data.filter((i) => i.status === "Pending").length,
        processed: data.filter((i) => i.status === "Processed").length,
        avgProcessingTime: "2h 15m",
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SharedStatusCard status="Store" label="Today's Invoices" count={counts.todayInvoices} />
            <SharedStatusCard status="Verification" label="Pending Invoices" count={counts.pending} />
            <SharedStatusCard status="Dispatch" label="Processed Invoices" count={counts.processed} />
            <SharedStatusCard status="Delivered" label="Avg Processing Time" count={counts.avgProcessingTime} />
        </div>
    );
};

export default StoreStatusCards;
