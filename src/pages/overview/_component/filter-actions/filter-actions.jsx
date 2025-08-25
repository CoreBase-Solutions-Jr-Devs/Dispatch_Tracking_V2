import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRangeDropdown } from "@/components/ui/date-range-dropdown";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";

const FilterActions = ({ view= "default" }) => {
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
      <CardContent className="p-2 space-y-2">
        {/* Row 1: Date Range */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
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

          <section>
            <Label className="text-xs">Date Range</Label>
            <DateRangeDropdown value={dateRange} onChange={setDateRange} />
          </section>
        </section>

        {/* Row 2: Search + Dynamic Filters */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <section>
            <Label htmlFor="search" className="text-xs">Search</Label>
            <Input
              id="search"
              placeholder="Search Invoice No or Account"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 text-sm"
            />
          </section>

          {filters.map((filter) => (
            <section key={filter.key}>
              <Label className="text-xs">{filter.label}</Label>
              <Select
                value={selectedFilters[filter.key] || ""}
                onValueChange={(val) => handleFilterChange(filter.key, val)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>
          ))}
        </section>

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

        {/* Filter summary */}
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
