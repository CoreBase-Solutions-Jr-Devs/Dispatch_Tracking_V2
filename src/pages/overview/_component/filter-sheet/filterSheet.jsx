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
import { Loader2 } from "lucide-react";
import { useGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";

export default function FilterSheet() {
  const dispatch = useDispatch();
  const { startDate, endDate, dateRange } = useSelector(
    (state) => state.invoice
  );
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isOpen, setIsOpen] = useState(false); // control sheet
  const [applyLoading, setApplyLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);

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

  const [filterInvoices, { isLoading }] = useRoleInvoiceFilter(role);
  const isCustomRange = dateRange === "CUSTOM_RANGE";

  const { data, isError, error, refetch } = useGetFilteredStoreInvoicesQuery(
    {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      dateRange,
      search: "",
      workflowStatus: selectedFilters?.status || "",
      pageNumber: 1,
      pageSize: 50,
    },
    { skip: !startDate || !endDate }
  );

  // Always store ISO in Redux
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
    const iso = date.toISOString();
    type === "start" ? dispatch(setStartDate(iso)) : dispatch(setEndDate(iso));
  };

  const handleApplyFilter = async () => {
    const payload = {
      startDate,
      endDate,
      dateRange,
      workflowStatus: selectedFilters?.status || "",
      pageNumber: 1,
      pageSize: 50,
    };

    console.log("📌 Applying filters with payload:", payload);

    try {
      const data = await filterInvoices(payload).unwrap();
      dispatch(
        setInvoices({
          invoices: data.invoices,
          pagination: data.pagination,
        })
      );
      setIsOpen(false); // close the sheet
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
    console.log("Clearing filters...");
    dispatch(setDateRange("TODAY"));
    setSelectedFilters({});
    setIsOpen(false);
  };

  // Load initial filters once
  useEffect(() => {
    if (data) {
      dispatch(
        setInvoices({
          invoices: data.invoices,
          pagination: data.pagination,
        })
      );
    }
  }, [data, dispatch]);
  // useEffect(() => {
  //   handleApplyFilter();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (role === "delivery") return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
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
          <div
            className={`flex-1 flex flex-col ${
              isCustomRange ? "border border-primary rounded-md p-1" : ""
            }`}
          >
            <Label className="text-xs text-muted-foreground">Start Date</Label>
            <DatePicker
              className="w-full border rounded-md px-2 h-8"
              selected={startDate ? new Date(startDate) : null}
              onChange={(date) => handleDateChange("start", date)}
              dateFormat="dd/MM/yyyy"
              disabled={!isCustomRange}
            />
          </div>

          <div
            className={`flex-1 flex flex-col ${
              isCustomRange ? "border border-primary rounded-md p-1" : ""
            }`}
          >
            <Label className="text-xs text-muted-foreground">End Date</Label>
            <DatePicker
              className="w-full border rounded-md px-2 h-8"
              selected={endDate ? new Date(endDate) : null}
              onChange={(date) => handleDateChange("end", date)}
              dateFormat="dd/MM/yyyy"
              disabled={!isCustomRange}
            />
          </div>
        </section>

        {/* Search + Role Filters */}
        <section className="flex gap-2 mb-4 items-end">
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
          <div className="flex gap-2">
            <Button
              variant="apply"
              size="sm"
              onClick={async () => {
                setApplyLoading(true);
                await handleApplyFilter();
                setApplyLoading(false);
              }}
            >
              {applyLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Apply
                </span>
              ) : (
                "Apply"
              )}
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={async () => {
                setClearLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 300));
                handleClearFilters();
                setClearLoading(false);
              }}
            >
              {clearLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Clear
                </span>
              ) : (
                "Clear"
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
