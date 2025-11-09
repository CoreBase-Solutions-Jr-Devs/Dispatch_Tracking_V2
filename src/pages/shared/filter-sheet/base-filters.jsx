import { useAppDispatch } from "@/app/hook";
import { DateRangeDropdown } from "@/components/ui/date-range-dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setEndDate, setStartDate } from "@/features/invoices/invoiceSlice";
import DatePicker from "react-datepicker";

const BaseFilters = ({
  startDate,
  endDate,
  dateRange,
  ranges,
  setDateRange,
  search,
  setSearch,
}) => {
  const dispatch = useAppDispatch();

  const handleDateChange = (type, date) => {
    if (!date) return;
    // Format ISO string but keep the original date
    const iso = new Date(date).toISOString();
    type === "start" ? dispatch(setStartDate(iso)) : dispatch(setEndDate(iso));
  };

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString("en-GB") : "");

  return (
    <section className="flex flex-wrap gap-2 items-end">
      {/* Date Range */}
      <div className="flex flex-col min-w-[120px]">
        <Label className="text-xs whitespace-nowrap">Date Range</Label>
        <DateRangeDropdown
          ranges={ranges}
          value={dateRange}
          onChange={setDateRange}
        />
      </div>

      {/* Start Date */}
      <div className="flex flex-col min-w-[100px]">
        <Label htmlFor="start-date" className="text-xs whitespace-nowrap">
          Start Date
        </Label>
        <DatePicker
          id="start-date"
          selected={startDate ? new Date(startDate) : null}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => handleDateChange("start", date)}
          className="h-8 w-full border rounded-md px-2"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col min-w-[100px]">
        <Label htmlFor="end-date" className="text-xs whitespace-nowrap">
          End Date
        </Label>
        <DatePicker
          id="end-date"
          selected={endDate ? new Date(endDate) : null}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => handleDateChange("end", date)}
          className="h-8 w-full border rounded-md px-2"
        />
      </div>

      {/* Search */}
      <div className="flex flex-col flex-1 min-w-[200px]">
        <Label htmlFor="search" className="text-xs whitespace-nowrap">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Search Invoice No or Account"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
    </section>
  );
};

export default BaseFilters;
