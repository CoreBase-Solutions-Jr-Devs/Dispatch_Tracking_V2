import React from "react";

const getLabelStyle = (status) => {
    switch (status) {
        case "Store":
            return "text-status-store-foreground";
        case "Verification":
            return "text-status-verification-foreground";
        case "Dispatch":
            return "text-status-dispatch-foreground";
        case "Delivered":
            return "text-status-delivered-foreground";
        default:
            return "text-muted-foreground";
    }
};

const LabelValue = ({ status, label, value }) => {
    return (
        <div className="flex items-baseline gap-1">
            <span
                className={`text-xs sm:text-sm font-medium uppercase tracking-wide ${getLabelStyle(
                    status
                )}`}
            >
                {label}:
            </span>
            <span className="text-sm sm:text-base font-semibold text-foreground">
                {value}
            </span>
        </div>
    );
};

export default LabelValue;
