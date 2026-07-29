import React from "react";
import ProcessStage from "@/pages/status_tracking/stage/ProcessStage";

export default function StatusTimeline({ stages = [] }) {
  const stageOrder = ["Store", "Verification", "Dispatch", "Delivery"];
  const sortedStages = [...stages].sort(
    (a, b) => stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage)
  );

  return (
    <div className="flex justify-between items-start gap-2">
      {sortedStages.length > 0 ? (
        sortedStages.map((stage, index) => (
          <ProcessStage key={index} stage={stage} />
        ))
      ) : (
        <p className="text-xs text-gray-500">No stage data available</p>
      )}
    </div>
  );
}