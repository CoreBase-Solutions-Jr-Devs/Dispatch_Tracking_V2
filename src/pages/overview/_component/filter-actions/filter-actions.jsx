import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import BaseFilters from "./base-filters";
import RoleBasedFilters from "./role-based-filters";
import { Button } from "@/components/ui/button";
import CollapsibleSection from "@/components/ui/collapsible-section";
import { Filter } from "lucide-react";

const FilterActions = ({ view = "default" }) => {
  const [startDate, setStartDate] = useState("26/08/2025");
  const [endDate, setEndDate] = useState("26/08/2025");
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
    setStartDate("26/08/2025");
    setEndDate("26/08/2025");
    setDateRange("Current Date");
    setSearch("");
    setSelectedFilters({});
  };

  return (
    <CollapsibleSection id="filters" icon={Filter} defaultOpen={true}>
      <Card className="shadow-sm border mb-1">
        <CardContent className="p-1 space-y-1">
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
            <Button
              variant="apply"
              size="sm"
              onClick={handleApplyFilter}
            >
              Apply
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </section>


          {/* Row 4: Filter summary */}
          <footer className="text-xs text-muted-foreground border-t border-border pt-0.5">
            Filtered From:{" "}
            <span className="font-medium text-foreground">{startDate}</span> to{" "}
            <span className="font-medium text-foreground">{endDate}</span>
          </footer>
        </CardContent>
      </Card>
    </CollapsibleSection>
  );
};

export default FilterActions;
