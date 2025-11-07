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
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { DateRangeDropdown } from "@/components/ui/date-range-dropdown";
import {
  setDateRange,
  setEndDate,
  setInvoices,
  setStatsStore,
  setStartDate,
  clearQueryFilter,
  setQueryFilter,
} from "@/features/invoices/invoiceSlice";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
import { useRoleInvoiceFilter } from "@/hooks/use-role-invoice-filter";
import { roleToView } from "@/lib/utils";
import RoleBasedFilters from "./role-based-filters";
import { Loader2 } from "lucide-react";
import { useGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";
import { useAppDispatch } from "@/app/hook";

// export default function FilterSheet() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { startDate, endDate, dateRange } = useSelector(
//     (state) => state.invoice
//   );
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const [filter, setFilter] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//     dateRange: "TODAY",
//     status: "",
//   });
//   const [isOpen, setIsOpen] = useState(false);
//   const [applyLoading, setApplyLoading] = useState(false);
//   const [clearLoading, setClearLoading] = useState(false);

//   const {
//     data: filterOptions = [],
//     isLoading: filtersLoading,
//     isError: filtersError,
//   } = useFilterOptionsQuery();

//   const dateRanges =
//     filterOptions?.find((f) => f.key === "dateRange")?.options || [];
//   const roleFilters = filterOptions?.filter((f) => f.key !== "dateRange") || [];

//   const handleDateRange = (dateRange) => {
//     const today = new Date();

//     setFilter((prevState) => ({
//       ...prevState,
//       dateRange: dateRange,
//     }));

//     switch (dateRange) {
//       case "TODAY":
//         setFilter((prevState) => ({
//           ...prevState,
//           startDate: today,
//           endDate: today,
//         }));
//         break;
//       case "LAST_7_DAYS":
//         setFilter((prevState) => ({
//           ...prevState,
//           startDate: new Date(new Date().setDate(today.getDate() - 6)),
//           endDate: today,
//         }));
//         break;
//       case "LAST_30_DAYS":
//         setFilter((prevState) => ({
//           ...prevState,
//           startDate: new Date(new Date().setDate(today.getDate() - 29)),
//           endDate: today,
//         }));
//         break;
//       case "LAST_90_DAYS":
//         setFilter((prevState) => ({
//           ...prevState,
//           startDate: new Date(new Date().setDate(today.getDate() - 89)),
//           endDate: today,
//         }));
//         break;
//       case "LAST_180_DAYS":
//         setFilter((prevState) => ({
//           ...prevState,
//           startDate: new Date(new Date().setDate(today.getDate() - 179)),
//           endDate: today,
//         }));
//         break;
//       case "LAST_365_DAYS":
//         setFilter((prevState) => ({
//           ...prevState,
//           startDate: new Date(new Date().setDate(today.getDate() - 364)),
//           endDate: today,
//         }));
//         break;
//       default:
//         setFilter((prevState) => ({
//           ...prevState,
//           startDate: "",
//           endDate: "",
//         }));
//     }
//   };

//   // const role = roleToView(user?.userRole);
//   const role =
//     user["userrights"]?.map((item) => item?.moduleArea)[0]?.toLowerCase() || "";

//   const [filterInvoices, { isLoading }] = useRoleInvoiceFilter(role);
//   const isCustomRange = dateRange === "CUSTOM_RANGE";

//   const { data, isError, error, refetch } = useGetFilteredStoreInvoicesQuery(
//     {
//       role,
//       startDate: new Date(startDate).toISOString(),
//       endDate: new Date(endDate).toISOString(),
//       dateRange,
//       search: "",
//       workflowStatus: selectedFilters?.status || "",
//       pageNumber: 1,
//       pageSize: 50,
//     },
//     { skip: !startDate || !endDate }
//   );

//   // useEffect(() => {
//   //   const today = new Date();
//   //   let start, end;

//   //   switch (dateRange) {
//   //     case "TODAY":
//   //       start = end = today;
//   //       break;
//   //     case "LAST_7_DAYS":
//   //       start = new Date(today);
//   //       start.setDate(today.getDate() - 6);
//   //       end = new Date();
//   //       break;
//   //     case "LAST_30_DAYS":
//   //       start = new Date(today);
//   //       start.setDate(today.getDate() - 29);
//   //       end = new Date();
//   //       break;
//   //     case "LAST_90_DAYS":
//   //       start = new Date(today);
//   //       start.setDate(today.getDate() - 89);
//   //       end = new Date();
//   //       break;
//   //     default:
//   //       return;
//   //   }

//   //   dispatch(setStartDate(start.toISOString()));
//   //   dispatch(setEndDate(end.toISOString()));
//   // }, [dateRange, dispatch]);

//   const handleDateChange = (type, date) => {
//     if (!date) return;
//     const iso = date.toISOString();
//     type === "start" ? dispatch(setStartDate(iso)) : dispatch(setEndDate(iso));
//   };

//   const handleApplyFilter = async () => {
//     const payload = {
//       startDate,
//       endDate,
//       dateRange,
//       workflowStatus: selectedFilters?.status || "",
//       pageNumber: 1,
//       pageSize: 50,
//     };

//     console.log("📌 Applying filters with payload:", payload);

//     try {
//       const data = await filterInvoices(payload).unwrap();
//       dispatch(
//         setInvoices({
//           invoices: data.invoices,
//           pagination: data.pagination,
//         })
//       );
//       setIsOpen(false);
//     } catch (error) {
//       let description = "Please check your credentials and try again.";
//       if (error?.data?.errors) {
//         const errorMessages = Object.values(error.data.errors).flat();
//         if (errorMessages.length > 0) description = errorMessages.join(" ");
//       } else if (error?.data?.message) description = error.data.message;

//       toast.error("Invoices Failed", { description, duration: 4000 });
//     }
//   };

//   const handleClearFilters = () => {
//     console.log("Clearing filters...");
//     dispatch(setDateRange("TODAY"));
//     setSelectedFilters({});
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     if (data) {
//       dispatch(
//         setInvoices({
//           invoices: data?.invoices,
//           pagination: data?.pagination,
//           stats: { ...(data?.stats || {}), role },
//         })
//       );
//       // dispatch(setStatsStore(data?.stats || {}));
//     }
//   }, [data, dispatch]);

//   // useEffect(() => {
//   //   handleApplyFilter();
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   if (role === "delivery") return null;

//   return (
//     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//       <SheetTrigger asChild>
//         <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
//           Filter
//         </Button>
//       </SheetTrigger>

//       <SheetContent side="right" className="w-full sm:max-w-md py-8 px-6">
//         <SheetHeader>
//           <SheetTitle>Filter Options</SheetTitle>
//         </SheetHeader>

//         <section className="mb-4">
//           <Label className="text-xs text-muted">Date Range</Label>
//           <DateRangeDropdown
//             value={dateRange}
//             onChange={(val) => dispatch(setDateRange(val))}
//             ranges={dateRanges}
//             isLoading={filtersLoading}
//             isError={filtersError}
//           />
//         </section>

//         <section className="flex gap-4 mb-4">
//           <div
//             className={`flex-1 flex flex-col ${
//               isCustomRange ? "border border-primary rounded-md p-1" : ""
//             }`}
//           >
//             <Label className="text-xs text-muted-foreground">Start Date</Label>
//             <DatePicker
//               className="w-full border rounded-md px-2 h-8"
//               selected={startDate ? new Date(startDate) : null}
//               onChange={(date) => handleDateChange("start", date)}
//               dateFormat="dd/MM/yyyy"
//               disabled={!isCustomRange}
//             />
//           </div>

//           <div
//             className={`flex-1 flex flex-col ${
//               isCustomRange ? "border border-primary rounded-md p-1" : ""
//             }`}
//           >
//             <Label className="text-xs text-muted-foreground">End Date</Label>
//             <DatePicker
//               className="w-full border rounded-md px-2 h-8"
//               selected={endDate ? new Date(endDate) : null}
//               onChange={(date) => handleDateChange("end", date)}
//               dateFormat="dd/MM/yyyy"
//               disabled={!isCustomRange}
//             />
//           </div>
//         </section>

//         <section className="flex gap-2 mb-4 items-end">
//           <div className="flex-1 flex flex-col justify-end">
//             <Label className="text-xs text-muted-foreground">
//               Filter by Status
//             </Label>
//             <RoleBasedFilters
//               filters={roleFilters}
//               selectedFilters={selectedFilters}
//               onChange={(key, val) =>
//                 setSelectedFilters((prev) => ({ ...prev, [key]: val }))
//               }
//             />
//           </div>
//         </section>

//         <SheetFooter className="border-t border-border flex justify-between items-center gap-x-4">
//           <div className="flex gap-2">
//             <Button
//               variant="apply"
//               size="sm"
//               onClick={async () => {
//                 setApplyLoading(true);
//                 await handleApplyFilter();
//                 setApplyLoading(false);
//               }}
//             >
//               {applyLoading ? (
//                 <span className="flex items-center gap-2">
//                   <Loader2 className="h-4 w-4 animate-spin" /> Apply
//                 </span>
//               ) : (
//                 "Apply"
//               )}
//             </Button>

//             <Button
//               variant="destructive"
//               size="sm"
//               onClick={async () => {
//                 setClearLoading(true);
//                 await new Promise((resolve) => setTimeout(resolve, 300));
//                 handleClearFilters();
//                 setClearLoading(false);
//               }}
//             >
//               {clearLoading ? (
//                 <span className="flex items-center gap-2">
//                   <Loader2 className="h-4 w-4 animate-spin" /> Clear
//                 </span>
//               ) : (
//                 "Clear"
//               )}
//             </Button>
//           </div>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }

function FilterSheet() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
    dateRange: "TODAY",
    status: "",
  });
  const [selectedFilters, setSelectedFilters] = useState({});

  const {
    data: filterOptions = [],
    isLoading: filtersLoading,
    isError: filtersError,
  } = useFilterOptionsQuery();

  // const roleFilters = filterOptions?.filter((f) => f.key !== "dateRange") || [];
  const roleFilters = filterOptions?.filter((f) => f.key === "status") || [];

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

  // const status = [
  //   {
  //     key: "status",
  //     label: "Filter by Status",
  //     options: [
  //       {
  //         label: "InStore",
  //         value: "InStore",
  //       },
  //       {
  //         label: "InVerification",
  //         value: "InVerification",
  //       },
  //       {
  //         label: "InDispatch",
  //         value: "InDispatch",
  //       },
  //       {
  //         label: "InDelivery",
  //         value: "InDelivery",
  //       },
  //     ],
  //   },
  // ];

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
        status: selectedFilters["status"] ?? "",
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

  // const { data, isError, error, refetch } = useGetFilteredStoreInvoicesQuery(
  //   {
  //     role: "store",
  //     startDate: new Date(filter.startDate).toISOString(),
  //     endDate: new Date(filter.endDate).toISOString(),
  //     dateRange: filter.dateRange,
  //     search: "",
  //     workflowStatus: selectedFilters?.status || "",
  //     pageNumber: 1,
  //     pageSize: 50,
  //   },
  //   { skip: !filter.startDate || !filter.endDate }
  // );

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
            {/* <RoleBasedFilters
              // filters={status}
              filters={statusOptions}
              selectedFilters={filter.status}
              onChange={(key, val) => {
                setFilter((prev) => ({ ...prev, status: val }));
              }}
            /> */}

            <RoleBasedFilters
              filters={roleFilters}
              selectedFilters={selectedFilters}
              onChange={(key, val) => {
                setSelectedFilters((prev) => ({ ...prev, [key]: val }));
              }}
            />
          </div>
        </section>

        {/* Footer */}
        <SheetFooter className="border-t border-border flex justify-between items-center gap-x-4">
          <div className="flex gap-2">
            <Button variant="apply" size="sm" onClick={applyFilters}>
              {filtersLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Apply
                </span>
              ) : (
                "Apply"
              )}
              {/* Apply */}
            </Button>

            <Button variant="destructive" size="sm" onClick={clearFilters}>
              {filtersLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Clear
                </span>
              ) : (
                "Clear"
              )}
              {/* Clear */}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;
