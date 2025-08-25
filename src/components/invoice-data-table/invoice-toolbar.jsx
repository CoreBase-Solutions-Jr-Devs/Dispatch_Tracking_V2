import React, { useState } from "react";
import { AdminSummaryCards, StoreSummaryCards, VerificationSummaryCards } from "./status-summary-card";

export default function InvoiceToolbar({ filters, role = "admin" }) {
    const [search, setSearch] = useState("");

    const renderSummaryCards = () => {
        switch (role.toLowerCase() ) {
            case "admin":
                return <AdminSummaryCards />;
            case "store":
                return <StoreSummaryCards />;
            case "verification":
                return <VerificationSummaryCards />;
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
