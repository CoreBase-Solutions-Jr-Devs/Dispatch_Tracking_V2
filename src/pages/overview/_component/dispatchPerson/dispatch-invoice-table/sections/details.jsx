import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
// import { useGetDeliveryDriverQuery } from "@/features/dispatch/dispatchAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setClientDetails,
  setCourierDetails,
  setCustomerCourierId,
  setCustomerCourierName,
  setCustomerCourierPhone,
  setDriverDetails,
} from "@/features/dispatch/dispatchSlice";

export default function DispatchDetails({
  data,
  collectionType,
  deliveryPerson,
  driverLoading,
  driverError,
  driverApiError,
  enabled
}) {
  const [courierDetails, setCourierDetailsState] = useState({
    customerCourierName: "",
    customerCourierId: "",
    customerCourierPhone: "",
    customerCourierRegNo: "",
  });

  const dispatch = useDispatch();

  const handleChange = (field, e) => {
    const { name, value } = e.target;

    setCourierDetailsState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (field === "self-collection") {
      return dispatch(setClientDetails({ ...courierDetails, [name]: value }));
    }
    if (field === "courier") {
      return dispatch(setCourierDetails({ ...courierDetails, [name]: value }));
    }

    return;
  };


  return (
    <div className="flex flex-col gap-2 text-xs font-medium">
      <section className="flex justify-between items-center h-full">
        <Label className="text-xs font-medium">Dispatch Date & Time:</Label>
        {/* <Label className="text-xs font-medium">08/20/2025 12:31</Label> */}
      </section>

      {/* Loading and error states for filter options */}
      {/* {filterLoading && <Label className="text-xs text-blue-500">Loading delivery options...</Label>}
      {filterError && <Label className="text-xs text-red-500">Error loading delivery options: {filterError?.message || "Unknown error"}</Label>} */}

      {/* Loading and error states for driver details */}
      {collectionType === "delivery" && driverLoading && (
        <Label className="text-xs text-blue-500">
          Loading driver details...
        </Label>
      )}
      {collectionType === "delivery" && driverError && (
        <Label className="text-xs text-red-500">
          Error loading driver details:{" "}
          {driverApiError?.message || "Unknown error"}
        </Label>
      )}

      {collectionType === "self-collection" && (
        <section className="flex flex-col w-full justify-between space-x-2">
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Client Name</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierName}
              name="customerCourierName"
              onChange={(e) => handleChange("self-collection", e)}
              disabled={!enabled}
              // onChange={(e) => dispatch(setCustomerCourierName(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">ID No</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierId}
              name="customerCourierId"
              onChange={(e) => handleChange("self-collection", e)}
              disabled={!enabled}
              // onChange={(e) => dispatch(setCustomerCourierId(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Phone No</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierPhone}
              name="customerCourierPhone"
              onChange={(e) => handleChange("self-collection", e)}
              disabled={!enabled}
              // onChange={(e) =>
              //   dispatch(setCustomerCourierPhone(e.target.value))
              // }
            />
          </div>
        </section>
      )}

      {collectionType === "delivery" && !deliveryPerson && (
        <>
          <section className="flex flex-col w-full h-full gap-2">
            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">DP ID:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="driverId"
                value=""
                onChange={(e) => e.handleChange?.(e.target.value)}
                disabled={!enabled}
              />
            </div>

            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">DP DL:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="driverLicense"
                value=""
                onChange={(e) => e.handleChange?.(e.target.value)}
                disabled={!enabled}
              />
            </div>

            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">Car Make:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="carMake"
                value=""
                onChange={(e) => e.handleChange?.(e.target.value)}
                disabled={!enabled}
              />
            </div>

            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">Reg No:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="regNo"
                value=""
                onChange={(e) => e.handleChange?.(e.target.value)}
                disabled={!enabled}
              />
            </div>
          </section>
        </>
      )}

      {collectionType === "delivery" && deliveryPerson && data && (
        <section className="flex flex-col w-full h-full gap-2">
          <div className="flex items-center justify-between w-full">
            <Label className="text-xs font-medium">DP ID:</Label>
            <Label className="text-xs font-medium">
              {data.personalId}
            </Label>
          </div>

          <div className="flex items-center justify-between w-full">
            <Label className="text-xs font-medium">DP DL:</Label>
            <Label className="text-xs font-medium">
              {data.driverLicenseNo}
            </Label>
          </div>

          <div className="flex items-center justify-between w-full">
            <Label className="text-xs font-medium">Car Make:</Label>
            <Label className="text-xs font-medium">{data.carMake}</Label>
          </div>

          <div className="flex items-center justify-between w-full">
            <Label className="text-xs font-medium">Reg No:</Label>
            <Label className="text-xs font-medium">{data.regNo}</Label>
          </div>
        </section>
      )}

      {collectionType === "courier" && (
        <section className="flex flex-col justify-between space-x-2">
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Courier Name</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierName || ""}
              name="customerCourierName"
              onChange={(e) => handleChange("courier", e)}
              disabled={!enabled}
              // onChange={(e) => dispatch(setCustomerCourierName(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Courier ID</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierId || ""}
              name="customerCourierId"
              onChange={(e) => handleChange("courier", e)}
              disabled={!enabled}
              // onChange={(e) => dispatch(setCustomerCourierId(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Phone No</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierPhone}
              name="customerCourierPhone"
              onChange={(e) => handleChange("courier", e)}
              disabled={!enabled}
              // onChange={(e) => dispatch(setCustomerCourierPhone(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <Label className="text-xs font-medium">Reg No</Label>
            <Input
              className="w-full h-6 text-xs"
              value={courierDetails.customerCourierRegNo}
              name="customerCourierRegNo"
              onChange={(e) => handleChange("courier", e)}
              disabled={!enabled}
            />
          </div>
        </section>
      )}
    </div>
  );
}
