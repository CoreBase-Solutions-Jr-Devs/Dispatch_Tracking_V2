import { useState } from "react";

export default function DispatchFilterDesign() {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  return (
    <div className="flex justify-between p-4 items-center space-x-8">
      <div className="flex items-center gap-2 text-sm min-w-[200px]">
        <span className="font-medium whitespace-nowrap">Filter by Route:</span>
        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="border px-2 py-1 rounded text-sm flex-1"
        >
          <option value="">Select Route</option>
          <option value="A">Route A</option>
          <option value="B">Route B</option>
          <option value="C">Route C</option>
        </select>
      </div>

    
      <div className="flex items-center gap-2 text-sm min-w-[200px]">
        <span className="font-medium whitespace-nowrap">
          Filter by Customer:
        </span>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="border px-2 py-1 rounded text-sm flex-1"
        >
          <option value="">Select Customer</option>
          <option value="John">John Doe</option>
          <option value="Jane">Jane Smith</option>
          <option value="Acme">Acme Ltd</option>
        </select>
      </div>
    </div>
  );
}
