import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import BaseFilters from "./base-filters";
import RoleBasedFilters from "./role-based-filters";
import { Button } from "@/components/ui/button";
import CollapsibleSection from "@/components/ui/collapsible-section";
import { Filter } from "lucide-react";

const FilterActions = ({ view = "default" }) => {
  const [startDate, setStartDate] = useState("08/26/2025");
  const [endDate, setEndDate] = useState("08/26/2025");
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
    setStartDate("08/26/2025");
    setEndDate("08/26/2025");
    setDateRange("Current Date");
    setSearch("");
    setSelectedFilters({});
  };

  return (
    <CollapsibleSection id="filters" icon={Filter} defaultOpen={true}>
      <Card className="shadow-sm border mb-1">
        <CardContent className="p-2 space-y-2">
          {/* Row 1: All filters in one line */}
          <section className="flex gap-2 items-end overflow-x-auto">
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
            <RoleBasedFilters
              {...{ filters, selectedFilters, handleFilterChange }}
            />
          </section>

          {/* Row 2: Filter summary (left) and buttons (right) */}
          <section className="flex justify-between items-center border-t border-border pt-2">
            {/* Filter summary - Left side */}
            <div className="text-xs text-muted-foreground">
              Filtered From:{" "}
              <span className="font-medium text-foreground">{startDate}</span>{" "}
              to <span className="font-medium text-foreground">{endDate}</span>
            </div>

            {/* Buttons - Right side */}
            <div className="flex gap-2">
              <Button variant="apply" size="sm" onClick={handleApplyFilter}>
                Apply
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearFilters}>
                Clear
              </Button>
            </div>
          </section>
        </CardContent>
      </Card>
    </CollapsibleSection>
  );
};

export default FilterActions;
