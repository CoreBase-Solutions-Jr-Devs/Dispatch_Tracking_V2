import React from 'react'
import { iconMap, statusColor } from '@/pages/status_tracking/ui/icons'

export default function ProcessStage({ stage }) {
    const Icon = iconMap[stage.stage?.toUpperCase()] 
    const processColor = statusColor[stage.status] || "text-gray-400";

    const timestamp = stage.timestamp
        ? new Date(stage.timestamp).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        })
        : "Pending";

    const statusText = stage.status || "Pending";

    return (
        <div className="flex flex-col items-center gap-0.5">

            <span className="text-[11px] font-semibold leading-none">{stage.stage}</span>

            {Icon && <Icon size={16} className={processColor} />}
        
            <span className={`text-[10px] font-medium ${processColor}`}>{statusText}</span>

            <section className="text-[10px] text-gray-500 leading-none">
                {timestamp !== "Pending" ? (
                    <span>{timestamp}</span>
                ) : (
                    <span className="italic text-gray-400">Pending</span>
                )}
            </section>
        </div>
    )
}