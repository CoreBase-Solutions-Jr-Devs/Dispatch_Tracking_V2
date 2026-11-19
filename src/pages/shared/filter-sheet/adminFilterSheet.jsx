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
  clearQueryFilter,
  setQueryFilter,
} from "@/features/dashboard/adminDashboardSlice";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
import { useRoleInvoiceFilter } from "@/hooks/use-role-invoice-filter";
import { roleToView } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { default as MultiSelect } from "react-select";

let kinds = [
  { label: "StageSla", value: "StageSla" },
  { label: "Notification", value: "Notification" },
  { label: "Payment", value: "Payment" },
  { label: "Dispute", value: "Dispute" },
];

let adminKinds = [
  { label: "Invoice", value: "Invoice" },
  { label: "DispatchBatch", value: "DispatchBatch" },
];

let modules = [
  { label: "Store", value: "Store" },
  { label: "Invoices", value: "Invoices" },
  { label: "Verification", value: "Verification" },
  { label: "Dispatch", value: "Dispatch" },
  { label: "Payments", value: "Payments" },
  { label: "Notifications", value: "Notifications" },
  { label: "Drivers", value: "Drivers" },
];

let stages = [
  { label: "Store", value: "1" },
  { label: "Verification", value: "2" },
  { label: "Dispatch", value: "3" },
  { label: "Delivery", value: "4" },
];

let Finishedstages = [
  { label: "Processed", value: "Processed" },
  { label: "Verified", value: "Verified" },
  { label: "Dispatched", value: "Dispatched" },
  { label: "Delivered", value: "Delivered" },
];

function AdminFilterSheet({ title }) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { user, bcode } = useTypedSelector((state) => state.auth);
  let branches = user["userBranches"] || [];

  let branchOptions = branches.map((branch) => {
    return {
      value: branch.bcode,
      label: branch.brancH_NAME,
    };
  });

  const { queryFilter } = useTypedSelector((state) => state.adminDashboard);

  const [filter, setFilter] = useState({
    // startDate: new Date(),
    // endDate: new Date(),
    // dateRange: "TODAY",
    // status: "",
    // dispatchNumber: "",
    // kind: "",
    // adminKind: "",
    // stage: "",
    // _module: "Store",
    // minimumMinutes: "",
    // number: "",
    // bcode: "",
    startDate: new Date(queryFilter.startDate),
    endDate: new Date(queryFilter.endDate),
    dateRange: queryFilter.dateRange,
    status: queryFilter.status,
    dispatchNumber: queryFilter.dispatchNumber,
    kind: queryFilter.kind,
    adminKind: queryFilter.adminKind,
    stage: queryFilter.stage,
    finishedStage: queryFilter.finishedStage,
    _module: queryFilter._module,
    minimumMinutes: queryFilter.minimumMinutes,
    number: queryFilter.number,
    bcode: queryFilter.bCode,
    branches: queryFilter.branches,
  });

  const [selectedFilters, setSelectedFilters] = useState({});

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
    localStorage.setItem("bcode", filter.bcode);
    dispatch(
      setQueryFilter({
        ...filter,
        startDate: new Date(filter.startDate).toISOString(),
        endDate: new Date(filter.endDate).toISOString(),
        status: selectedFilters["status"] ?? "",
        dispatchNumber: filter.dispatchNumber,
        kind: filter.kind,
        adminKind: filter.adminKind,
        stage: filter.stage,
        finishedStage: filter.finishedStage,
        minimumMinutes: filter.minimumMinutes,
        number: filter.number,
        bcode: filter.bcode,
      }),
    );

    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilter({
      startDate: new Date(),
      endDate: new Date(),
      dateRange: "TODAY",
      status: "",
      dispatchNumber: "",
      kind: "",
      adminKind: "",
      stage: "",
      finishedStage: "",
      _module: "Store",
      minimumMinutes: "",
      number: "",
      bcode: bcode || 0,
      branches: [],
    });

    dispatch(clearQueryFilter());

    setIsOpen(false);
  };

  const handleBranchSelect = (selectedList) => {
    const data = selectedList.map((item) => item.value);

    setFilter((prevState) => ({
      ...prevState,
      //   branches: Array.from(new Set([...(prevState.branches ?? []), ...data])),
      branches: data,
    }));
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
        {/* Branch Dropdown */}
        {title !== "finishedInvoices" && (
          <section className="mb-4">
            <Label className="text-xs text-muted">Branch</Label>
            <Select
              value={filter.bcode}
              onValueChange={(value) =>
                setFilter((prevState) => ({
                  ...prevState,
                  bcode: value,
                }))
              }
            >
              <SelectTrigger className="w-full border-gray-500">
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Select branch...">
                    {
                      branches.find(
                        (item) => item.bcode === Number(filter.bcode),
                      )?.brancH_NAME
                    }
                  </SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-stone-50">
                {branches.map((opt, index) => (
                  <SelectItem key={index} value={opt.bcode}>
                    {opt.brancH_NAME}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        )}
        {/* Kind */}
        {title === "exception" && (
          <section className="mb-4">
            <Label className="text-xs text-muted">Kind</Label>
            <Select
              value={filter.kind}
              onValueChange={(value) =>
                setFilter((prevState) => ({
                  ...prevState,
                  kind: value,
                }))
              }
            >
              <SelectTrigger className="w-full border-gray-500">
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Select Kind...">
                    {kinds.find((item) => item.value === filter.kind)?.label}
                  </SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-stone-50">
                {kinds.map((opt, index) => (
                  <SelectItem key={index} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        )}
        {title === "adminSearch" && (
          <>
            <section className="mb-4">
              <Label className="text-xs text-muted">Kind</Label>
              <Select
                value={filter.adminKind}
                onValueChange={(value) =>
                  setFilter((prevState) => ({
                    ...prevState,
                    adminKind: value,
                  }))
                }
              >
                <SelectTrigger className="w-full border-gray-500">
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Select Kind...">
                      {
                        adminKinds.find(
                          (item) => item.value === filter.adminKind,
                        )?.label
                      }
                    </SelectValue>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-stone-50">
                  {adminKinds.map((opt, index) => (
                    <SelectItem key={index} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>
            <section className="mb-4">
              <Label className="text-xs text-muted">Number</Label>
              <Input
                type="text"
                value={filter.number}
                onChange={(e) =>
                  setFilter((prevState) => ({
                    ...prevState,
                    number: e.target.value,
                  }))
                }
                placeholder={"10000678"}
                // className="w-full pl-9 pr-3 py-2 bg-gray-100"
              />
            </section>
          </>
        )}
        {title === "report" && (
          <section className="mb-4">
            <Label className="text-xs text-muted">Module</Label>
            <Select
              value={filter._module}
              onValueChange={(value) =>
                setFilter((prevState) => ({
                  ...prevState,
                  _module: value,
                }))
              }
            >
              <SelectTrigger className="w-full border-gray-500">
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Select Module...">
                    {
                      modules.find((item) => item.value === filter._module)
                        ?.label
                    }
                  </SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-stone-50">
                {modules.map((opt, index) => (
                  <SelectItem key={index} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        )}
        {/* Dispatch No */}
        {title === "reconciliation" && (
          <section className="mb-4">
            <Label className="text-xs text-muted">Dispatch No</Label>
            <Input
              type="text"
              value={filter.dispatchNumber}
              onChange={(e) =>
                setFilter((prevState) => ({
                  ...prevState,
                  dispatchNumber: e.target.value,
                }))
              }
              placeholder={"10000678"}
              // className="w-full pl-9 pr-3 py-2 bg-gray-100"
            />
          </section>
        )}
        {title === "finishedInvoices" && (
          <>
            <section className="mb-4">
              <Label className="text-xs text-muted">Branches</Label>
              <MultiSelect
                isMulti
                name="branches"
                options={branchOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  handleBranchSelect(selectedOptions)
                }
              />
            </section>
            <section className="mb-4">
              <Label className="text-xs text-muted">Stages</Label>
              <Select
                value={filter.stage}
                onValueChange={(value) =>
                  setFilter((prevState) => ({
                    ...prevState,
                    finishedStage: value,
                  }))
                }
              >
                <SelectTrigger className="w-full border-gray-500">
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Select Stage...">
                      {
                        Finishedstages.find(
                          (item) => item.value === filter.finishedStage,
                        )?.label
                      }
                    </SelectValue>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-stone-50">
                  {Finishedstages.map((opt, index) => (
                    <SelectItem key={index} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>
          </>
        )}
        {title === "dashboardAgeing" && (
          <>
            <section className="mb-4">
              <Label className="text-xs text-muted">Minimum Minutes</Label>
              <Input
                type="text"
                value={filter.minimumMinutes}
                onChange={(e) =>
                  setFilter((prevState) => ({
                    ...prevState,
                    minimumMinutes: e.target.value,
                  }))
                }
                // className="w-full pl-9 pr-3 py-2 bg-gray-100"
              />
            </section>
            <section className="mb-4">
              <Label className="text-xs text-muted">Stages</Label>
              <Select
                value={filter.stage}
                onValueChange={(value) =>
                  setFilter((prevState) => ({
                    ...prevState,
                    stage: value,
                  }))
                }
              >
                <SelectTrigger className="w-full border-gray-500">
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Select Stage...">
                      {
                        stages.find((item) => item.value === filter.stage)
                          ?.label
                      }
                    </SelectValue>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-stone-50">
                  {stages.map((opt, index) => (
                    <SelectItem key={index} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>
          </>
        )}

        {title !== "reconciliation" &&
          title !== "dashboardAgeing" &&
          title !== "finishedInvoices" && (
            <>
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
                  <Label className="text-xs text-muted-foreground">
                    Start Date
                  </Label>
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
                  <Label className="text-xs text-muted-foreground">
                    End Date
                  </Label>
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
            </>
          )}
        {/* Search + Role Filters */}
        {/* Footer */}
        <SheetFooter className="border-t border-border flex justify-between items-center gap-x-4">
          <div className="flex gap-2">
            <Button variant="apply" size="sm" onClick={applyFilters}>
              Apply
            </Button>

            <Button variant="destructive" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default AdminFilterSheet;
