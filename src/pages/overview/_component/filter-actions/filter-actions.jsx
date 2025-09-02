import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import BaseFilters from "./base-filters";
import RoleBasedFilters from "./role-based-filters";
import { Button } from "@/components/ui/button";
import CollapsibleSection from "@/components/ui/collapsible-section";
import { Filter } from "lucide-react";
import { useFilterInvoicesMutation } from "@/features/invoices/filterAPI";

const FilterActions = ({ view = "default" }) => {
  const [startDate, setStartDate] = useState("08/26/2025");
  const [endDate, setEndDate] = useState("08/26/2025");
  const [dateRange, setDateRange] = useState("Current Date");
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});

  const [filterInvoices, { data, isLoading, error }] =
    useFilterInvoicesMutation();

  const filters = useMemo(() => getInvoiceFilters(view), [view]);

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilter = async () => {
    try {
      const response = await filterInvoices({
        startDate,
        endDate,
        dateRange,
        search,
        filters: selectedFilters,
        pageNumber: 1,
        pageSize: 10,
      }).unwrap();

      console.log("✅ API Response:", response);
    } catch (err) {
      console.error("❌ Error filtering invoices:", err);
    }
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

          <section className="flex justify-between items-center border-t border-border pt-2">
            <div className="text-xs text-muted-foreground">
              Filtered From:{" "}
              <span className="font-medium text-foreground">{startDate}</span>{" "}
              to <span className="font-medium text-foreground">{endDate}</span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="apply"
                size="sm"
                onClick={handleApplyFilter}
                disabled={isLoading}
              >
                {isLoading ? "Applying..." : "Apply"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearFilters}>
                Clear
              </Button>
            </div>
          </section>

          {data && (
            <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
          {error && (
            <p className="text-red-500 text-xs">Error loading invoices.</p>
          )}
        </CardContent>
      </Card>
    </CollapsibleSection>
  );
};

export default FilterActions;
