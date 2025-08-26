import { DateRangeDropdown } from "@/components/ui/date-range-dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BaseFilters = ({ startDate, setStartDate, endDate, setEndDate, dateRange, setDateRange, search, setSearch }) => (
    <section className="flex gap-2 items-end flex-nowrap">
        <div className="flex flex-col min-w-[120px]">
            <Label className="text-xs whitespace-nowrap">Date Range</Label>
            <DateRangeDropdown value={dateRange} onChange={setDateRange} />
        </div>
        
        <div className="flex flex-col min-w-[100px]">
            <Label htmlFor="start-date" className="text-xs whitespace-nowrap">Start Date</Label>
            <Input
                id="start-date"
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-8 text-sm"
            />
        </div>

        <div className="flex flex-col min-w-[100px]">
            <Label htmlFor="end-date" className="text-xs whitespace-nowrap">End Date</Label>
            <Input
                id="end-date"
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-8 text-sm"
            />
        </div>

        <div className="flex flex-col flex-1 min-w-[200px]">
            <Label htmlFor="search" className="text-xs whitespace-nowrap">Search</Label>
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

export default BaseFilters;