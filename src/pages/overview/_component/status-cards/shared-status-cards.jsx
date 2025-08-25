import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const getStatusCardStyle = (status) => {
    switch (status) {
        case "Store":
            return "status-store border hover:opacity-80 transition-opacity";
        case "Verification":
            return "status-verification border hover:opacity-80 transition-opacity";
        case "Dispatch":
            return "status-dispatch border hover:opacity-80 transition-opacity";
        case "Delivered":
            return "status-delivered border hover:opacity-80 transition-opacity";
        default:
            return "bg-muted text-muted-foreground border hover:opacity-80 transition-opacity";
    }
};

const SharedStatusCard = ({ status, label, count }) => {
    return (
        <Card className={`transition-all duration-200 ${getStatusCardStyle(status)}`}>
            <CardContent className="p-3 sm:p-4">
                <div className="space-y-1">
                    <h3 className="text-xs text-accent-foreground font-medium opacity-75">
                        {label}
                    </h3>
                    <p className="text-xl sm:text-2xl text-accent-foreground font-semibold">
                        {count}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default SharedStatusCard;
