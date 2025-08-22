import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DateRangeDropdown } from "@/components/ui/date-range-dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FilterActions = () => {
  const [startDate, setStartDate] = useState("20/08/2025");
  const [endDate, setEndDate] = useState("20/08/2025");
  const [dateRange, setDateRange] = useState("Current Date");

  const handleApplyFilter = () => {
    console.log("Applying filters:", { startDate, endDate, dateRange });
  };

  return (
    <Card className="shadow-sm border mb-4">
      <CardContent className="p-3">
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
          {/* Start Date Input */}
          <section>
            <Label htmlFor="start-date" className="text-xs">Start Date</Label>
            <Input
              id="start-date"
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="h-8 text-sm"
            />
          </section>

          {/* End Date Input */}
          <section>
            <Label htmlFor="end-date" className="text-xs">End Date</Label>
            <Input
              id="end-date"
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="h-8 text-sm"
            />
          </section>

          {/* Date Range Dropdown */}
          <section>
            <Label className="text-xs">Date Range</Label>
            <DateRangeDropdown value={dateRange} onChange={setDateRange} />
          </section>

          {/* Apply Button */}
          <section className="flex items-end">
            <button
              onClick={handleApplyFilter}
              className="w-full btn-apply py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors font-medium"
            >
              Apply
            </button>
          </section>
        </section>

        {/* Filter Summary */}
        <footer className="text-xs text-muted-foreground border-t border-border pt-2">
          Filtered From:{" "}
          <span className="font-medium text-foreground">{startDate}</span> to{" "}
          <span className="font-medium text-foreground">{endDate}</span>
        </footer>
      </CardContent>
    </Card>
  );
};

export default FilterActions;
