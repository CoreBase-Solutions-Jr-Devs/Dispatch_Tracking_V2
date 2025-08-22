import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const getStatusCardStyle = (status) => {
    switch (status) {
        case "Store":
            return "status-store border-2 hover:opacity-80 transition-opacity";
        case "Verification":
            return "status-verification border-2 hover:opacity-80 transition-opacity";
        case "Dispatch":
            return "status-dispatch border-2 hover:opacity-80 transition-opacity";
        case "Delivered":
            return "status-delivered border-2 hover:opacity-80 transition-opacity";
        default:
            return "bg-muted text-muted-foreground border-2 border-border hover:opacity-80 transition-opacity";
    }
};

const SharedStatusCard = ({ status, label, count }) => {
    return (
        <Card className={`transition-all duration-200 ${getStatusCardStyle(status)}`}>
            <CardContent className="p-6">
                <div className="space-y-2">
                    <h3 className="text-sm text-accent-foreground font-medium opacity-80">
                        {label}
                    </h3>
                    <p className="text-3xl text-accent-foreground font-bold">
                        {count}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default SharedStatusCard;