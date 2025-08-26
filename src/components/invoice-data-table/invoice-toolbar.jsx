import React, { useState } from "react";
import { AdminSummaryCards, StoreSummaryCards, VerificationSummaryCards, DispatchSummaryCards } from "./status-summary-card";

export default function InvoiceToolbar({ role = "admin" }) {
    const renderSummaryCards = () => {
        switch (role.toLowerCase() ) {
            case "admin":
                return <AdminSummaryCards />;
            case "store":
                return <StoreSummaryCards />;
            case "verification":
                return <VerificationSummaryCards />;
            case "dispatch":
                return <DispatchSummaryCards />;
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center gap-4">
            {/* Summary Cards */}
            {renderSummaryCards()}
        </div>
    );
}
