import React from "react";
import SharedStatusCard from "./shared-status-cards";

const VerificationStatusCards = ({ data }) => {
    const today = new Date().toDateString();

    const counts = {
        todayInvoices: data.filter((i) => new Date(i.createdAt).toDateString() === today).length,
        pending: data.filter((i) => i.status === "VerificationPending").length,
        verified: data.filter((i) => i.status === "Verified").length,
        avgVerificationTime: "1h 40m",
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SharedStatusCard status="Store" label="Today's Invoices" count={counts.todayInvoices} />
            <SharedStatusCard status="Verification" label="Pending Verification" count={counts.pending} />
            <SharedStatusCard status="Dispatch" label="Verified Invoices" count={counts.verified} />
            <SharedStatusCard status="Delivered" label="Avg Verification Time" count={counts.avgVerificationTime} />
        </div>
    );
};

export default VerificationStatusCards;
