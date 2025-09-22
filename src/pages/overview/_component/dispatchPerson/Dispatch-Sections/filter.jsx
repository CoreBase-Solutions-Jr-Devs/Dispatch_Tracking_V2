
  import { useState } from "react";

export default function DispatchFilter() {
  const [filterType, setFilterType] = useState("");

  return (
<div className="flex flex-col gap-4 p-4">
  {/* Main filter dropdown */}
  <div className="flex flex-col w-40"> {/* 👈 sets width of the wrapper */}

    <select
      className="border rounded-md  w-full"
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
    >
      <option value="route">Route</option>
      <option value="customer">Customer Name</option>
    </select>
  </div>
</div>

  );
}

