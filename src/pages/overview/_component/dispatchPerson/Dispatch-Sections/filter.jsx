import { useState } from "react";

export default function DispatchFilter() {
  return (
    <div className="flex justify-between p-4 items-center space-x-8">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium whitespace-nowrap">Filter by Route:</span>
        <input
          type="text"
          placeholder="Enter Route"
          className="border px-2 py-1 rounded text-sm flex-1"
        />
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium whitespace-nowrap">
          Filter by Customer:
        </span>
        <input
          type="text"
          placeholder="Enter Customer"
          className="border px-2 py-1 rounded text-sm flex-1"
        />
      </div>
    </div>
  );
}
