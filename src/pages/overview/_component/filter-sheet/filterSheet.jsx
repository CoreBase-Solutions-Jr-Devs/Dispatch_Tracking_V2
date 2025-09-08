import { Button } from '@/components/ui/button'
import { DateRangeDropdown } from '@/components/ui/date-range-dropdown'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetFooter, SheetTitle } from '@/components/ui/sheet'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/app/hook'
import DatePicker from 'react-datepicker'
import { getInvoiceFilters } from '@/components/invoice-data-table/invoice-filters'
import RoleBasedFilters from '../filter-actions/role-based-filters'
import { setEndDate, setStartDate } from "@/features/invoices/invoiceSlice"
import { useFilterInvoicesMutation, useFilterRangeQuery } from '@/features/invoices/invoicesAPI'

    export default function FilterSheet({ view = 'default' }) {
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

        const handleStartDate = (date) => {
            dispatch(setStartDate(new Date(date).toISOString()));
        };

        const handleEndDate = (date) => {
            dispatch(setEndDate(new Date(date).toISOString()));
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

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className='cursor-pointer'>
                    Filter
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-md py-8 px-6">
                <SheetHeader>
                    <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>

                
                <section>
                    <Label className="text-xs text-muted">Date Range</Label>
                    <DateRangeDropdown ranges={ranges} value={dateRange} onChange={setDateRange} />
                </section>

                <section className="flex flex-row justify-between items-start gap-4 mt-6 mb-4">
                    <div className="flex justify-between items-center w-1/2">
                        <Label className="text-xs text-muted-foreground items-center">Start Date:</Label>
                        <DatePicker
                            className="w-full border border-gray-300 rounded-md px-2 h-8"
                            selected={startDate}
                            onChange={(date) => handleStartDate(date)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-1/2">
                        <Label className="text-xs text-muted-foreground items-center">End Date:</Label>
                        <DatePicker
                            className="w-full border border-gray-300 rounded-md px-2 h-8"
                            selected={endDate}
                            onChange={(date) => handleEndDate(date)}
                        />
                    </div>
                </section>

                <section className="flex flex-row justify-between items-center gap-4">
                    <section className="flex-1">
                        <Label className="text-xs whitespace-nowrap text-muted-foreground">Search</Label>
                        <Input
                            placeholder="Invoice No / Account"
                            className="mb-4 h-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </section>
                    <section className='flex-1'>
                        <RoleBasedFilters {...{ filters, selectedFilters, handleFilterChange }} />
                    </section>
                    
                </section>


                <SheetFooter className="border-t border-border flex justify-between items-center gap-x-4">
                    <div className="flex flex-row justify-start items-center gap-2">
                        <Label className="text-xs text-muted-foreground items-center">Filtered From:</Label>
                        <span className="font-medium text-foreground">
                            {new Intl.DateTimeFormat('en-GB').format(new Date(startDate))}
                        </span>

                        <Label className="text-xs text-muted-foreground items-center">To:</Label>
                        <span className="font-medium text-foreground">
                            {new Intl.DateTimeFormat('en-GB').format(new Date(endDate))}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="apply" size="sm" onClick= {handleApplyFilter}>
                            Apply
                        </Button>
                        <Button variant="destructive" size="sm" onClick={handleClearFilters}>
                            Clear
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
