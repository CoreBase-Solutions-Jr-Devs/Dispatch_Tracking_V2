import { useAppDispatch } from "@/app/hook";
import { DateRangeDropdown } from "@/components/ui/date-range-dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setEndDate, setStartDate } from "@/features/invoices/invoiceSlice";
import DatePicker from "react-datepicker";

const BaseFilters = ({
  startDate,
  // setStartDate,
  endDate,
  // setEndDate,
  dateRange,
  ranges,
  setDateRange,
  search,
  setSearch,
}) => {
  const dispatch = useAppDispatch();

  const handleStartDate = (date) => {
    dispatch(setStartDate(new Date(date).toISOString()));
  };
  const handleEndDate = (date) => {
    dispatch(setEndDate(new Date(date).toISOString()));
  };

  return (
    <section className="flex gap-2 items-end flex-nowrap">
      <div className="flex flex-col min-w-[120px]">
        <Label className="text-xs whitespace-nowrap">Date Range</Label>
        <DateRangeDropdown
          ranges={ranges}
          value={dateRange}
          onChange={setDateRange}
        />
      </div>

      <div className="flex flex-col min-w-[100px]">
        <Label htmlFor="start-date" className="text-xs whitespace-nowrap">
          Start Date
        </Label>
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => handleStartDate(date)}
        />

        {/* <Input
                id="start-date"
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-8 text-sm"
            /> */}
      </div>

      <div className="flex flex-col min-w-[100px]">
        <Label htmlFor="end-date" className="text-xs whitespace-nowrap">
          End Date
        </Label>

        <DatePicker
          selected={endDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => handleEndDate(date)}
        />
        {/* <Input
        id="end-date"
        type="text"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="h-8 text-sm"
      /> */}
      </div>

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
