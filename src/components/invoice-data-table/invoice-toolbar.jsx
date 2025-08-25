import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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

            {/* Filters */}
            {filters.map((filter) => (
                <Select key={filter.key}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent>
                        {filter.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ))}

            {/* Search */}
            <Input
                placeholder="Search Invoice No or Account"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
            />
        </div>
    );
}
