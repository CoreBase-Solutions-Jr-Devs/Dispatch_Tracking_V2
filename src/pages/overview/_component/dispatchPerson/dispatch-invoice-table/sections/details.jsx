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
  setDeliveryDetails,
  setDriverDetails,
  setRouteName,
} from "@/features/dispatch/dispatchSlice";

export default function DispatchDetails({
  data,
  collectionType,
  deliveryPerson,
  driverLoading,
  driverError,
  driverApiError,
  enabled,
  route
}) {
  const [courierDetails, setCourierDetailsState] = useState({
    customerCourierName: "",
    customerCourierId: "",
    customerCourierPhone: "",
    customerCourierRegNo: "",
  });

  const dispatch = useDispatch();

  const deliveryDetails = useSelector((state) => state.dispatch.deliveryDetails);


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
    if (field === "delivery") {
      return dispatch(setDeliveryDetails({ ...deliveryDetails, [name]: value }));
    }
    if (field === "route") {
      return dispatch(setRouteName({ ...route, [name]: value }));
    }

    return;
  };

  useEffect(() => {
    if (data) {
      dispatch(setDeliveryDetails(data));
    }
  }, [data, dispatch]);



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
  <section className="flex flex-col w-full space-y-2">
    <div className="flex items-center w-full justify-between">
      <Label className="text-xs font-medium w-1/3">Client Name</Label>
      <Input
        className="w-2/3 h-6 text-xs"
        value={courierDetails.customerCourierName}
        name="customerCourierName"
        onChange={(e) => handleChange("self-collection", e)}
        disabled={!enabled}
      />
    </div>

    <div className="flex items-center w-full justify-between">
      <Label className="text-xs font-medium w-1/3">ID No</Label>
      <Input
        className="w-2/3 h-6 text-xs"
        value={courierDetails.customerCourierId}
        name="customerCourierId"
        onChange={(e) => handleChange("self-collection", e)}
        disabled={!enabled}
      />
    </div>

    <div className="flex items-center w-full justify-between">
      <Label className="text-xs font-medium w-1/3">Phone No</Label>
      <Input
        className="w-2/3 h-6 text-xs"
        value={courierDetails.customerCourierPhone}
        name="customerCourierPhone"
        onChange={(e) => handleChange("self-collection", e)}
        disabled={!enabled}
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
                onChange={(e) => handleChange("delivery", e)}
                disabled={!enabled}
              />
            </div>

            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">DP DL:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="driverLicense"
                value=""
                onChange={(e) => handleChange("delivery", e)}
                disabled={!enabled}
              />
            </div>

            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">Car Make:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="carMake"
                value=""
                onChange={(e) => handleChange("delivery", e)}
                disabled={!enabled}
              />
            </div>

            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">Reg No:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="regNo"
                value=""
                onChange={(e) => handleChange("delivery", e)}
                disabled={!enabled}
              />
            </div>
          </section>
        </>
      )}

      {collectionType === "delivery" && deliveryPerson && data && (
        <section className="flex flex-col w-full h-full gap-2">
          <div className="flex items-center justify-between w-full">
            <Label className="text-xs font-medium w-1/3">DP ID:</Label>
            <Input 
              className="w-2/3 h-6 text-xs"
              value={deliveryDetails.driverId || ""}
              name="driverId"
              onChange={(e) => handleChange("delivery", e)}
              disabled={false}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <Label className="text-xs font-medium w-1/3">DP DL:</Label>
            {/* <Label className="text-xs font-medium">
              {data.driverLicenseNo}
            </Label> */}
            <Input 
              className="w-2/3 h-6 text-xs"
              value={deliveryDetails.driverLicenseNo || ""}
              name="driverLicenseNo"
              onChange={(e) => handleChange("delivery", e)}
              disabled={false}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <Label className="text-xs font-medium w-1/3">Car Make:</Label>
            {/* <Label className="text-xs font-medium">{data.carMake}</Label> */}
            <Input 
              className="w-2/3 h-6 text-xs"
              value={deliveryDetails?.carMake || ""}
              name="carMake"
              onChange={(e) => handleChange("delivery", e)}
              disabled={false}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <Label className="text-xs font-medium w-1/3">Reg No:</Label>
            {/* <Label className="text-xs font-medium">{data.regNo}</Label> */}
            <Input 
              className="w-2/3 h-6 text-xs"
              value={deliveryDetails?.regNo || ""}
              name="regNo"
              onChange={(e) => handleChange("delivery", e)}
              disabled={false}
            />
          </div>
        </section>
      )}

    {collectionType === "courier" && (
      <section className="flex flex-col w-full space-y-2">
        <div className="flex items-center w-full justify-between">
          <Label className="text-xs font-medium w-1/3">Courier Name</Label>
          <Input
            className="w-2/3 h-6 text-xs"
            value={courierDetails.customerCourierName || ""}
            name="customerCourierName"
            onChange={(e) => handleChange("courier", e)}
            disabled={!enabled}
          />
        </div>

        <div className="flex items-center w-full justify-between">
          <Label className="text-xs font-medium w-1/3">Courier ID</Label>
          <Input
            className="w-2/3 h-6 text-xs"
            value={courierDetails.customerCourierId || ""}
            name="customerCourierId"
            onChange={(e) => handleChange("courier", e)}
            disabled={!enabled}
          />
        </div>

        <div className="flex items-center w-full justify-between">
          <Label className="text-xs font-medium w-1/3">Phone No</Label>
          <Input
            className="w-2/3 h-6 text-xs"
            value={courierDetails.customerCourierPhone || ""}
            name="customerCourierPhone"
            onChange={(e) => handleChange("courier", e)}
            disabled={!enabled}
          />
        </div>

        <div className="flex items-center w-full justify-between">
          <Label className="text-xs font-medium w-1/3">Reg No</Label>
          <Input
            className="w-2/3 h-6 text-xs"
            value={courierDetails.customerCourierRegNo || ""}
            name="customerCourierRegNo"
            onChange={(e) => handleChange("courier", e)}
            disabled={!enabled}
          />
        </div>
      </section>
    )}

    {collectionType === "delivery" && route && (
      <div className="flex justify-between items-center w-full">
        <Label className="text-xs font-medium w-1/3">Route:</Label>
        <Input 
          className="text-xs font-medium !h-6 w-2/3 truncate"
          title={route}
          value={route}
          onChange={(e) => handleChange("route", e)}
          disabled={!enabled ? true : false}
        />
      </div>
    )}

    </div>
  );
}
