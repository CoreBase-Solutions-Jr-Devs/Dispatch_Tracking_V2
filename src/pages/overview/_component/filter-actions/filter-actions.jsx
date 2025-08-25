import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import BaseFilters from "./base-filters";
import RoleBasedFilters from "./role-based-filters";

const FilterActions = ({ view = "default" }) => {
  const [startDate, setStartDate] = useState("20/08/2025");
  const [endDate, setEndDate] = useState("20/08/2025");
  const [dateRange, setDateRange] = useState("Current Date");
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});

  const filters = useMemo(() => getInvoiceFilters(view), [view]);

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilter = () => {
    console.log("Applying filters:", {
      startDate,
      endDate,
      dateRange,
      search,
      ...selectedFilters,
    });
  };

  const handleClearFilters = () => {
    setStartDate("20/08/2025");
    setEndDate("20/08/2025");
    setDateRange("Current Date");
    setSearch("");
    setSelectedFilters({});
  };

  return (
    <Card className="shadow-sm border mb-2">
      <CardContent className="p-2 space-y-3">
        {/* Row 1: Dates + Search in one line */}
        <section className="flex flex-wrap gap-2 items-center">
          <BaseFilters
            {...{
              startDate,
              setStartDate,
              endDate,
              setEndDate,
              dateRange,
              setDateRange,
              search,
              setSearch,
            }}
          />
        </section>

        {/* Row 2: Role-based filters */}
        <RoleBasedFilters
          {...{ filters, selectedFilters, handleFilterChange }}
        />

        {/* Row 3: Buttons */}
        <section className="flex justify-end gap-2">
          <button
            onClick={handleApplyFilter}
            className="px-4 bg-primary text-white py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors font-medium text-sm"
          >
            Apply
          </button>
          <button
            onClick={handleClearFilters}
            className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors font-medium text-sm"
          >
            Clear
          </button>
        </section>

        {/* Row 4: Filter summary */}
        <footer className="text-xs text-muted-foreground border-t border-border pt-1">
          Filtered From:{" "}
          <span className="font-medium text-foreground">{startDate}</span> to{" "}
          <span className="font-medium text-foreground">{endDate}</span>
        </footer>
      </CardContent>
    </Card>
  );
};

export default FilterActions;
