import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { DateRangeDropdown } from "@/components/ui/date-range-dropdown";
import {
  setDateRange,
  setEndDate,
  setInvoices,
  setStartDate,
} from "@/features/invoices/invoiceSlice";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
import { useRoleInvoiceFilter } from "@/hooks/use-role-invoice-filter";
import { roleToView } from "@/lib/utils";
import RoleBasedFilters from "./role-based-filters";

export default function FilterSheet() {
  const dispatch = useDispatch();
  const { startDate, endDate, dateRange } = useSelector(
    (state) => state.invoice
  );

  const [selectedFilters, setSelectedFilters] = useState({});
  const [search, setSearch] = useState("");

  const {
    data: filterOptions,
    isLoading: filtersLoading,
    isError: filtersError,
  } = useFilterOptionsQuery();
  const dateRanges =
    filterOptions?.find((f) => f.key === "dateRange")?.options || [];
  const roleFilters = filterOptions?.filter((f) => f.key !== "dateRange") || [];

  const { user } = useSelector((state) => state.auth);
  const role = roleToView(user?.userRole);
  const [filterInvoices] = useRoleInvoiceFilter(role);

  const isCustomRange = dateRange === "CUSTOM_RANGE";

  const formatDDMMYYYY = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : null;

  useEffect(() => {
    const today = new Date();
    let start, end;

    switch (dateRange) {
      case "TODAY":
        start = end = today;
        break;
      case "LAST_7_DAYS":
        start = new Date(today);
        start.setDate(today.getDate() - 6);
        end = new Date();
        break;
      case "LAST_30_DAYS":
        start = new Date(today);
        start.setDate(today.getDate() - 29);
        end = new Date();
        break;
      case "LAST_90_DAYS":
        start = new Date(today);
        start.setDate(today.getDate() - 89);
        end = new Date();
        break;
      default:
        return;
    }

        dispatch(setStartDate(start.toISOString()));
        dispatch(setEndDate(end.toISOString()));
    }, [dateRange, dispatch]);

  const handleDateChange = (type, date) => {
    if (!date) return;
    const formatted = formatDDMMYYYY(date);
    type === "start"
      ? dispatch(setStartDate(formatted))
      : dispatch(setEndDate(formatted));
  };

    const handleApplyFilter = async () => {
        const payload = {
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            dateRange,
            search,
            status: selectedFilters,
            pageNumber: 1,
            pageSize: 50,
        };

    console.log("Filter Payload:", JSON.stringify(payload, null, 2));

    try {
      const data = await filterInvoices(payload).unwrap();
      dispatch(setInvoices({ invoices: data.invoices }));
    } catch (error) {
      let description = "Please check your credentials and try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) description = error.data.message;

      toast.error("Invoices Failed", { description, duration: 4000 });
    }
  };

    const handleClearFilters = () => {
        dispatch(setDateRange("TODAY"));
        setSearch("");
        setSelectedFilters({});
    };

    useEffect(() => {
        handleApplyFilter();
    }, []);

    if(role === "delivery") return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Filter
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md py-8 px-6">
        <SheetHeader>
          <SheetTitle>Filter Options</SheetTitle>
        </SheetHeader>

        {/* Date Range Dropdown */}
        <section className="mb-4">
          <Label className="text-xs text-muted">Date Range</Label>
          <DateRangeDropdown
            value={dateRange}
            onChange={(val) => dispatch(setDateRange(val))}
            ranges={dateRanges}
            isLoading={filtersLoading}
            isError={filtersError}
          />
        </section>

                {/* Start/End Date Pickers */}
                <section className="flex gap-4 mb-4">
                    <div className={`flex-1 flex flex-col ${isCustomRange ? 'border border-primary rounded-md p-1' : ''}`}>
                        <Label className="text-xs text-muted-foreground">Start Date</Label>
                        <DatePicker
                            className="w-full border rounded-md px-2 h-8"
                            selected={startDate ? new Date(startDate) : null}
                            onChange={date => handleDateChange("start", date)}
                            dateFormat="dd/MM/yyyy"
                            disabled={!isCustomRange}
                        />
                    </div>

                    <div className={`flex-1 flex flex-col ${isCustomRange ? 'border border-primary rounded-md p-1' : ''}`}>
                        <Label className="text-xs text-muted-foreground">End Date</Label>
                        <DatePicker
                            className="w-full border rounded-md px-2 h-8"
                            selected={endDate ? new Date(endDate) : null}
                            onChange={date => handleDateChange("end", date)}
                            dateFormat="dd/MM/yyyy"
                            disabled={!isCustomRange}
                        />
                    </div>
                </section>

        {/* Search + Role Filters */}
        <section className="flex gap-2 mb-4 items-end">
          <div className="flex-1 flex flex-col">
            <Label className="text-xs text-muted-foreground">Search</Label>
            <Input
              placeholder="Invoice No / Account"
              className="h-8 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <Label className="text-xs text-muted-foreground">
              Filter by Status
            </Label>
            <RoleBasedFilters
              filters={roleFilters}
              selectedFilters={selectedFilters}
              onChange={(key, val) =>
                setSelectedFilters((prev) => ({ ...prev, [key]: val }))
              }
            />
          </div>
        </section>

        {/* Footer */}
        <SheetFooter className="border-t border-border flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-2 text-xs">
            <span>From:</span>
            <span className="font-medium">{startDate || "-"}</span>
            <span>To:</span>
            <span className="font-medium">{endDate || "-"}</span>
          </div>

          <div className="flex gap-2">
            <Button variant="apply" size="sm" onClick={handleApplyFilter}>
              Apply
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
