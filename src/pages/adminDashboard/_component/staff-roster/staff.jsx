// import { useState } from "react";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { DataTable } from "@/components/data-table";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import DashboardToolbar from "@/components/invoice-data-table/admin-dashboard-toolbar";
import {
  useQueryInvoiceQuery,
  useStaffRosterQuery,
  useUpdateStaffRosterMutation,
} from "@/features/dashboard/dashboardAPI";
import { roleToView } from "@/lib/utils";
import { useState } from "react";
import useDebouncedSearch from "@/hooks/use-debounce-search";
import StaffRoleTable, { EligibleStaffs, StaffEntries } from "./table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
// import { toast } from "sonner";

let weekDays = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
];

export default function StaffRosterTable() {
  const dispatch = useAppDispatch();

  const { queryFilter } = useTypedSelector((state) => state.adminDashboard);

  const { debouncedTerm, searchTerm, setSearchTerm } = useDebouncedSearch("", {
    delay: 500,
  });
  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 50,
  });

  const [searchValue, setSearchValue] = useState("");
  const [checkedStaffs, setCheckedStaffs] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    weekday: "",
    date: "",
    reason: "",
  });

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useStaffRosterQuery({
      ...queryFilter,
    });
  const [UpdateStaffRoster, { isLoading: isUpdatingLoading }] =
    useUpdateStaffRosterMutation();

  // const view = roleToView("View All Stages");
  const view = roleToView("SuperAdmin");
  const columns = getInvoiceColumns("finishedinvoices");

  const handlePageChange = (pageNumber) => {
    setFilter((prev) => ({ ...prev, pageNumber }));
  };

  const handlePageSizeChange = (pageSize) => {
    setFilter((prev) => ({ ...prev, pageSize }));
  };

  const handleSearchValue = (value) => {
    console.log(value);
    setSearchValue(value);
  };

  const handleParentSelect = (selected) => {
    console.log(selected);
    setSelectedRow(selected);
  };

  const handleRowCheck = (value, row) => {
    setSelectedRow({});

    if (value) {
      setCheckedStaffs((prev) => [...prev, row]);
    } else {
      setCheckedStaffs((prev) => prev.filter((r) => r !== row));
    }
  };

  const toggleStaffPopup = () => {
    setIsUpdateModal(!isUpdateModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setIsUpdateModal(false);
    setFormData({
      weekday: "",
      date: "",
      reason: "",
    });
    setCheckedStaffs([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      bCode: queryFilter.bCode,
      adminRole: queryFilter.adminRole,
      staffs: checkedStaffs,
      weekday: formData.weekday,
      date: formData.date,
      reason: formData.reason,
    };

    UpdateStaffRoster(payload)
      .unwrap()
      .then((data) => {
        toast.success("Staff role updated successful");
        setMpesa(false);
        handleClose();
      })
      .catch((error) => {
        toast.error("Staff role update failed", {
          description:
            error?.data?.message ||
            error?.data?.title ||
            "Please try paying again",
          duration: 4000,
        });
      });
  };

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    isError: isSearchError,
  } = useQueryInvoiceQuery(
    { searchWord: debouncedTerm.trim(), role: view },
    { skip: !debouncedTerm.trim() || debouncedTerm.length < 3 },
  );

  const isSearching = Boolean(debouncedTerm.trim());
  const eligibleUsers = isSearching
    ? searchData?.eligibleUsers || []
    : data?.eligibleUsers || [];
  const effectiveUsers = isSearching
    ? searchData?.effectiveUsers || []
    : data?.effectiveUsers || [];
  const entries = isSearching ? searchData?.entries || [] : data?.entries || [];
  // let pagination = data?.pagination || {};

  if (isError) {
    return (
      <div className="text-center text-red-500">
        {error?.data?.message ||
          error?.data?.title ||
          "Failed to load store tracking details."}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DashboardToolbar
        placeholder="Search..."
        searchValue={searchTerm}
        setSearchValue={setSearchTerm}
        enabled={false}
      />
      <div className="flex gap-3">
        <div className="basis-1/2">
          <div className="flex justify-between mb-2">
            <h6 className="mb-3">Eligible Users</h6>
            <Button
              variant="default"
              onClick={toggleStaffPopup}
              // disabled={checkedStaffs.length === 0}
              className="text-xs font-medium"
              size={"sm"}
            >
              Update
            </Button>
          </div>
          <EligibleStaffs
            data={eligibleUsers}
            handleRowCheck={handleRowCheck}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        <div className="basis-1/2">
          <h6 className="mb-5">Effective Users</h6>
          <StaffRoleTable
            data={effectiveUsers}
            handleRowSelection={handleParentSelect}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        <div className="basis-1/2">
          <h6 className="mb-5">Entries</h6>
          <StaffEntries
            data={entries}
            handleRowSelection={null}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>

      <Dialog open={isUpdateModal} onOpenChange={handleClose}>
        <DialogTrigger onClick={handleClose} />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Roles</DialogTitle>
            <DialogDescription>
              Please enter the staff role details.
            </DialogDescription>
          </DialogHeader>
          <form
            autoComplete="off"
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <section className="mb-4">
              <Label className="text-sm font-medium">WeekDay</Label>
              <div className="flex gap-3">
                <DatePicker
                  className="w-full border rounded-md"
                  selected={formData.date}
                  onChange={(date) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      date: date,
                      // weekday: new Date(date).toLocaleDateString("en-US", {
                      //   weekday: "long",
                      // }),
                    }))
                  }
                  dateFormat="dd/MM/yyyy"
                />
                {/* <Input
                  className={"disabled:opacity-75"}
                  type="text"
                  value={formData.weekday}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      weekday: e.target.value,
                    }))
                  }
                  disabled
                  // className="w-full pl-9 pr-3 py-2 bg-gray-100"
                /> */}
                <select
                  className="w-full disabled:opacity-75"
                  name="weekday"
                  value={formData.weekday}
                  onChange={handleChange}
                >
                  <option value="">Choose one…</option>
                  {weekDays.map((weekDay, i) => (
                    <option key={i} value={weekDay.value}>
                      {weekDay.label}
                    </option>
                  ))}
                </select>
              </div>
            </section>
            {/* <section className="mb-4">
              <Label className="text-sm font-medium">Date</Label>
              <select
                className="w-full"
                name="weekday"
                value={formData.weekday}
                onChange={handleChange}
              >
                <option value="">Choose one…</option>
                {weekDays.map((weekDay, i) => (
                  <option key={i} value={weekDay.value}>
                    {weekDay.label}
                  </option>
                ))}
              </select>
            </section> */}
            <section className="mb-4">
              <Label className="text-sm font-medium">Reason</Label>
              <textarea
                className="w-full"
                value={formData.reason}
                name="reason"
                onChange={handleChange}
              ></textarea>
            </section>
            <hr />
            <div className="flex gap-2 flex-row-reverse">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClose}
                disabled={isUpdatingLoading}
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="apply"
                size="sm"
                disabled={isUpdatingLoading}
              >
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
