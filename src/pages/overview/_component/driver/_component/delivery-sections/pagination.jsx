import React from "react";

export default function DeliveryPagination() {
  return (
<div className="flex justify-between items-center mt-4 text-xs font-medium">
        <span className="text-xs font-medium">Showing 1–10 of invoices</span>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100 text-xs font-medium">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md bg-gray-200 text-xs font-medium">1</button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100 text-xs font-medium">
            2
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100 text-xs font-medium">
            3
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100 text-xs font-medium">
            Next
          </button>
        </div>
      </div>

  );
}
