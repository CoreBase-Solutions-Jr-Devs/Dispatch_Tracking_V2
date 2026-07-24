import React from "react";
import { PartyPopper } from "lucide-react";

export default function StatusMessage({ message, currentStage }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-0.5">
      <div className="flex items-center space-x-2">
        <h3 className="text-sm font-semibold">
          Currently at : {currentStage || "Status Update"}
        </h3>
        <PartyPopper className="w-5 h-5 text-primary" />
      </div>

      <p className="text-xs text-gray-600 max-w-sm">
        {message ||
          "Your order is currently being processed. Please check back later for updates."}
      </p>
    </div>
  );
}
