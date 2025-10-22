import { Button } from "@/components/ui/button";
import { DateRangeDropdown } from "@/components/ui/date-range-dropdown";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import DatePicker from "react-datepicker";
import RoleBasedFilters from "./role-based-filters";
import { useAppDispatch } from "@/app/hook";
import {
  setQueryFilter,
  clearQueryFilter,
} from "@/features/dashboard/dashboardSlice";

function FilterSheet() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false); // control sheet
  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
    dateRange: "TODAY",
    status: "",
  }); // control sheet

  const dateRanges = [
    {
      label: "Today",
      value: "TODAY",
    },
    {
      label: "Last 7 Days",
      value: "LAST_7_DAYS",
    },
    {
      label: "Last 30 Days",
      value: "LAST_30_DAYS",
    },
    {
      label: "Last 90 Days",
      value: "LAST_90_DAYS",
    },
    {
      label: "Last 180 Days",
      value: "LAST_180_DAYS",
    },
    {
      label: "Last 365 Days",
      value: "LAST_365_DAYS",
    },
    {
      label: "Custom Range",
      value: "CUSTOM_RANGE",
    },
  ];

  const status = [
    {
      key: "status",
      label: "Filter by Status",
      options: [
        {
          label: "InStore",
          value: "InStore",
        },
        {
          label: "InVerification",
          value: "InVerification",
        },
        {
          label: "InDispatch",
          value: "InDispatch",
        },
        {
          label: "InDelivery",
          value: "InDelivery",
        },
      ],
    },
  ];

  const handleDateRange = (dateRange) => {
    const today = new Date();

    setFilter((prevState) => ({
      ...prevState,
      dateRange: dateRange,
    }));

    switch (dateRange) {
      case "TODAY":
        setFilter((prevState) => ({
          ...prevState,
          startDate: today,
          endDate: today,
        }));
        break;
      case "LAST_7_DAYS":
        setFilter((prevState) => ({
          ...prevState,
          startDate: new Date(new Date().setDate(today.getDate() - 6)),
          endDate: today,
        }));
        break;
      case "LAST_30_DAYS":
        setFilter((prevState) => ({
          ...prevState,
          startDate: new Date(new Date().setDate(today.getDate() - 29)),
          endDate: today,
        }));
        break;
      case "LAST_90_DAYS":
        setFilter((prevState) => ({
          ...prevState,
          startDate: new Date(new Date().setDate(today.getDate() - 89)),
          endDate: today,
        }));
        break;
      case "LAST_180_DAYS":
        setFilter((prevState) => ({
          ...prevState,
          startDate: new Date(new Date().setDate(today.getDate() - 179)),
          endDate: today,
        }));
        break;
      case "LAST_365_DAYS":
        setFilter((prevState) => ({
          ...prevState,
          startDate: new Date(new Date().setDate(today.getDate() - 364)),
          endDate: today,
        }));
        break;
      default:
        setFilter((prevState) => ({
          ...prevState,
          startDate: "",
          endDate: "",
        }));
    }
  };

  const applyFilters = () => {
    dispatch(
      setQueryFilter({
        ...filter,
        startDate: new Date(filter.startDate).toISOString(),
        endDate: new Date(filter.endDate).toISOString(),
      })
    );

    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilter({
      startDate: new Date(),
      endDate: new Date(),
      dateRange: "",
      status: {},
    });

    dispatch(clearQueryFilter());

    setIsOpen(false);
  };

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
            value={filter.dateRange}
            onChange={(val) => handleDateRange(val)}
            ranges={dateRanges}
            isLoading={false}
            isError={false}
          />
        </section>

        {/* Start/End Date Pickers */}
        <section className="flex gap-4 mb-4">
          <div
            className={`flex-1 flex flex-col ${
              filter.dateRange === "CUSTOM_RANGE"
                ? "border border-primary rounded-md p-1"
                : ""
            }`}
          >
            <Label className="text-xs text-muted-foreground">Start Date</Label>
            <DatePicker
              className="w-full border rounded-md px-2 h-8"
              selected={filter.startDate}
              onChange={(date) =>
                setFilter((prevState) => ({
                  ...prevState,
                  startDate: date,
                }))
              }
              dateFormat="dd/MM/yyyy"
              disabled={!filter.dateRange === "CUSTOM_RANGE"}
            />
          </div>
          <div
            className={`flex-1 flex flex-col ${
              filter.dateRange === "CUSTOM_RANGE"
                ? "border border-primary rounded-md p-1"
                : ""
            }`}
          >
            <Label className="text-xs text-muted-foreground">End Date</Label>
            <DatePicker
              className="w-full border rounded-md px-2 h-8"
              selected={filter.endDate}
              onChange={(date) =>
                setFilter((prevState) => ({
                  ...prevState,
                  endDate: date,
                }))
              }
              dateFormat="dd/MM/yyyy"
              disabled={!filter.dateRange === "CUSTOM_RANGE"}
            />
          </div>
        </section>

        {/* Search + Role Filters */}
        <section className="mb-4">
          <div className="flex-1 flex flex-col">
            <Label className="text-xs text-muted-foreground">
              Filter by Status
            </Label>
            <RoleBasedFilters
              filters={status}
              selectedFilters={filter.status}
              onChange={(key, val) => {
                setFilter((prev) => ({ ...prev, status: val }));
              }}
            />
          </div>
        </section>

        {/* Footer */}
        <SheetFooter className="border-t border-border flex justify-between items-center gap-x-4">
          <div className="flex gap-2">
            <Button variant="apply" size="sm" onClick={applyFilters}>
              {/* {applyLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Apply
                </span>
              ) : (
                "Apply"
              )} */}
              Apply
            </Button>

            <Button variant="destructive" size="sm" onClick={clearFilters}>
              {/* {clearLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Clear
                </span>
              ) : (
                "Clear"
              )} */}
              Clear
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;
