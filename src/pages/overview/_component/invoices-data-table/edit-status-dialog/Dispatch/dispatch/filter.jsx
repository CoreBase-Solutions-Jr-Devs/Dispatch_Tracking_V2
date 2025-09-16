
  import { useState } from "react";

export default function DispatchFilter() {
  const [filterType, setFilterType] = useState("");

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Main filter dropdown */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Filter By</label>
        <select
          className="border rounded-md p-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Select Filter</option>
          <option value="route">Route</option>
          <option value="customer">Customer Name</option>
        </select>
      </div>

      {/* Conditional dropdown */}
      {filterType === "route" && (
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Select Route</label>
          <select className="border rounded-md p-2">
            <option value="">Select Route</option>
            <option value="route1">Route 1</option>
            <option value="route2">Route 2</option>
          </select>
        </div>
      )}

      {filterType === "customer" && (
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Select Customer</label>
          <select className="border rounded-md p-2">
            <option value="">Select Customer</option>
            <option value="cust1">Customer 1</option>
            <option value="cust2">Customer 2</option>
          </select>
        </div>
      )}
    </div>
  );
}

