import React, { useState } from "react";
import { AdminSummaryCards, StoreSummaryCards, VerificationSummaryCards, DispatchSummaryCards } from "./status-summary-card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function InvoiceToolbar({ role = "admin" }) {
    const [search, setSearch] = React.useState("");

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
            {/* Search Bar */}
            <div className="flex-1 flex flex-col">
                <Label className="text-xs text-muted-foreground">Search</Label>
                <Input
                    placeholder="Invoice No / Account"
                    className="text-sm h-8 w-full sm:w-32 md:w-40 lg:w-44 xl:w-56"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {/* Summary Cards */}
            {renderSummaryCards()}
        </div>
    );
}
