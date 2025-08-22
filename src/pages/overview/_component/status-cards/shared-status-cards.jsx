import React from "react";

const getStatusCardColor = (status) => {
    switch (status) {
        case "Store":
            return "bg-orange-100 border-orange-300";
        case "Verification":
            return "bg-yellow-100 border-yellow-300";
        case "Dispatch":
            return "bg-blue-100 border-blue-300";
        case "Delivered":
            return "bg-green-100 border-green-300";
        default:
            return "bg-gray-100 border-gray-300";
    }
};

const SharedStatusCard = ({ status, label, count }) => {
    return (
        <div className={`p-6 rounded-lg border-2 ${getStatusCardColor(status)}`}>
            <h3 className="text-sm font-medium text-gray-600">{label}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{count}</p>
        </div>
    );
};

export default SharedStatusCard;
