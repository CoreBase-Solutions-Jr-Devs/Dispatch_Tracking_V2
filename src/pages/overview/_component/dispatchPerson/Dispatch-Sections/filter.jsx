import { useState } from "react";

export default function DispatchFilter() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between p-4 gap-4 sm:gap-8 w-full">
      <div className="flex flex-col w-full sm:flex-row sm:items-center sm:w-auto">
        <label className="font-medium text-sm mb-1 sm:mb-0 sm:mr-2s">
          Filter by Route:
        </label>
        <input
          type="text"
          placeholder="Enter Route"
          className="border px-2 py-1 rounded text-sm w-full md:w-20 lg:w-32"
        />
      </div>

      <div className="flex flex-col w-full sm:flex-row sm:items-center sm:w-auto">
        <label className="font-medium text-sm mb-1 sm:mb-0 sm:mr-2">
          Filter by Customer:
        </label>
        <input
          type="text"
          placeholder="Enter Customer"
          className="border px-2 py-1 rounded text-sm w-full md:w-20 lg:w-32"
        />
      </div>
    </div>
  );
}
