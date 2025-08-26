import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const StatusSummaryCard = ({ statuses }) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      {statuses.map((status, index) => (
        <React.Fragment key={status}>
          <Card className="rounded-full shadow-sm border px-3 py-1 bg-gray-50">
            <CardContent className="p-0 text-xs font-medium text-gray-700">
              {status}
            </CardContent>
          </Card>
          {index < statuses.length - 1 && (
            <ArrowRight className="text-gray-400" size={14} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Role-specific wrappers
export const AdminSummaryCards = () => (
  <StatusSummaryCard
    statuses={["Store", "Verification", "Dispatch", "Delivered"]}
  />
);

export const StoreSummaryCards = () => (
  <StatusSummaryCard statuses={["Pending", "Processed"]} />
);

export const VerificationSummaryCards = () => (
  <StatusSummaryCard statuses={["Pending", "Rejected", "Verified"]} />
);

export const DispatchSummaryCards = () => (
  <StatusSummaryCard
    statuses={["Pending", "In-Dispatch", "Dispatched", "Returned"]}
  />
);

export const DeliverySummaryCards = () => (
  <StatusSummaryCard
    statuses={["Pending Collection", "In-Delivery", "Delivered"]}
  />
);
