import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getInvoiceFilters } from "@/components/invoice-data-table/invoice-filters";
import BaseFilters from "./base-filters";
import RoleBasedFilters from "./role-based-filters";
import { Button } from "@/components/ui/button";
import CollapsibleSection from "@/components/ui/collapsible-section";
import { Filter } from "lucide-react";
// import { ranges } from "@/lib/utils";
import { toast } from "sonner";

import {
  useFilterRangeQuery,
  useFilterInvoicesMutation,
} from "@/features/invoices/invoicesAPI";
import { useAppDispatch } from "@/app/hook";
import { setInvoices } from "@/features/invoices/invoiceSlice";
import { useSelector } from "react-redux";

const FilterActions = ({ view = "default" }) => {
  // const [startDate, setStartDate] = useState("08/26/2025");
  // const [endDate, setEndDate] = useState("08/26/2025");
  const [dateRange, setDateRange] = useState("Current Date");
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useAppDispatch();

  const [filterInvoices, { data, isLoading, isError }] =
    useFilterInvoicesMutation();

  const { data: ranges } = useFilterRangeQuery();

  const { startDate, endDate } = useSelector((state) => state.invoice);

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
    const payload = {
      startDate: new Intl.DateTimeFormat("en-GB").format(new Date(startDate)),
      endDate: new Intl.DateTimeFormat("en-GB").format(new Date(endDate)),
      dateRange: "CUSTOM_RANGE",
      search: "",
      filters: {},
      pageNumber: 1,
      pageSize: 50,
    };

    filterInvoices(payload)
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(setInvoices({ invoices: data.invoices }));
      })
      .catch((error) => {
        let description = "Please check your credentials and try again.";
        if (error?.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat();
          if (errorMessages.length > 0) {
            description = errorMessages.join(" ");
          }
        } else if (error?.data?.message) {
          description = error.data.message;
        }
        toast.error("invoices Failed", {
          description: description,
          duration: 4000,
        });
      });
  };

  const handleClearFilters = () => {
    // setStartDate("08/26/2025");
    // setEndDate("08/26/2025");
    setDateRange("Current Date");
    setSearch("");
    setSelectedFilters({});
  };

  useEffect(() => {
    handleApplyFilter();
  }, []);

  return (
    <CollapsibleSection id="filters" icon={Filter} defaultOpen={true}>
      <Card className="shadow-sm border mb-1">
        <CardContent className="p-2 space-y-2">
          {/* Row 1: All filters in one line */}
          <section className="flex gap-2 items-end overflow-x-auto">
            <BaseFilters
              {...{
                startDate,
                // setStartDate,
                endDate,
                // setEndDate,
                dateRange,
                ranges,
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
              <span className="font-medium text-foreground">
                {new Intl.DateTimeFormat("en-GB").format(new Date(startDate))}
              </span>{" "}
              to{" "}
              <span className="font-medium text-foreground">
                {new Intl.DateTimeFormat("en-GB").format(new Date(endDate))}
              </span>
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
