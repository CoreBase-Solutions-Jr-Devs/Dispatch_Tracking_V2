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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLLECTION_TYPES = {
  // COURIER: "3",
  // CUSTOMER: "1",
  // OUR_DELIVERY: "4",
  // SALESMAN: "2",
  COURIER: "COURIER",
  CUSTOMER: "CUSTOMER",
  OUR_DELIVERY: "OUR DELIVERY",
  SALESMAN: "SALESMAN",
};

export default function DispatchDetails({
  data,
  collectionType,
  deliveryPerson,
  driverLoading,
  driverError,
  driverApiError,
  enabled,
  route,
  courierOptions = [],
}) {
  const [courierDetails, setCourierDetailsState] = useState({
    customerCourierName: "",
    customerCourierId: "",
    customerCourierPhone: "",
  });

  useEffect(() => {
    setCourierDetailsState({
      customerCourierName: "",
      customerCourierId: "",
      customerCourierPhone: "",
    });
  }, [collectionType]); // Reset when collectionType changes

  const dispatch = useDispatch();

  const deliveryDetails = useSelector(
    (state) => state.dispatch.deliveryDetails
  );

  const handleChange = (field, e, stringField) => {
    const name = stringField || e.target?.name;
    const value = stringField ? e : e.target?.value;

    if (!name) return; 

    const updatedState = {
      ...courierDetails,
      [name]: value,
    };
    setCourierDetailsState(updatedState); // Update local state

    switch (field) {
      case COLLECTION_TYPES.CUSTOMER:
        dispatch(setClientDetails(updatedState));
        break;
      case COLLECTION_TYPES.COURIER:
        dispatch(setCourierDetails(updatedState));
        break;
      case COLLECTION_TYPES.OUR_DELIVERY:
        dispatch(setDeliveryDetails({ ...deliveryDetails, [name]: value }));
        break;
      case "route":
        dispatch(setRouteName({ ...route, [name]: value }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setDeliveryDetails(data));
    }
  }, [data, dispatch]);

  return (
    <div className="flex flex-col gap-2 text-xs font-medium">
      {/* <section className="flex justify-between items-center h-full">
        <Label className="text-xs font-medium">Dispatch Date & Time:</Label>
      </section> */}

      {/* Loading and error states for filter options */}
      {/* {filterLoading && <Label className="text-xs text-blue-500">Loading delivery options...</Label>}
      {filterError && <Label className="text-xs text-red-500">Error loading delivery options: {filterError?.message || "Unknown error"}</Label>} */}

      {/* Loading and error states for driver details */}
      {collectionType === COLLECTION_TYPES.OUR_DELIVERY && driverLoading && (
        <Label className="text-xs text-blue-500">
          Loading driver details...
        </Label>
      )}
      {collectionType === COLLECTION_TYPES.OUR_DELIVERY && driverError && (
        <Label className="text-xs text-red-500">
          Error loading driver details:{" "}
          {driverApiError?.message || "Unknown error"}
        </Label>
      )}

      {collectionType === COLLECTION_TYPES.CUSTOMER && (
        <section className="flex flex-col w-full space-y-2">
          <div className="flex items-center w-full justify-between">
            <Label className="text-xs font-medium w-1/3">Client Name</Label>
            <Input
              className="w-2/3 h-6 text-xs"
              value={courierDetails.customerCourierName}
              name="customerCourierName"
              onChange={(e) => handleChange(COLLECTION_TYPES.CUSTOMER, e)}
              disabled={!enabled}
            />
          </div>

          <div className="flex items-center w-full justify-between">
            <Label className="text-xs font-medium w-1/3">ID No</Label>
            <Input
              className="w-2/3 h-6 text-xs"
              value={courierDetails.customerCourierId}
              name="customerCourierId"
              onChange={(e) => handleChange(COLLECTION_TYPES.CUSTOMER, e)}
              disabled={!enabled}
            />
          </div>

          <div className="flex items-center w-full justify-between">
            <Label className="text-xs font-medium w-1/3">Phone No</Label>
            <Input
              className="w-2/3 h-6 text-xs"
              value={courierDetails.customerCourierPhone}
              name="customerCourierPhone"
              onChange={(e) => handleChange(COLLECTION_TYPES.CUSTOMER, e)}
              disabled={!enabled}
            />
          </div>
        </section>
      )}

      {collectionType === COLLECTION_TYPES.OUR_DELIVERY && !deliveryPerson && (
        <>
          <section className="flex flex-col w-full h-full gap-2">
            {/* <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">DP ID:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="driverId"
                value=""
                onChange={(e) => handleChange(COLLECTION_TYPES.OUR_DELIVERY, e)}
                disabled={!enabled}
              />
            </div>

            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">DP DL:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="driverLicense"
                value=""
                onChange={(e) => handleChange(COLLECTION_TYPES.OUR_DELIVERY, e)}
                disabled={!enabled}
              />
            </div> */}

            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">Car Make:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="carMake"
                value=""
                onChange={(e) => handleChange(COLLECTION_TYPES.OUR_DELIVERY, e)}
                disabled={!enabled}
              />
            </div>

            <div className="flex items-center gap-2 justify-between w-full">
              <Label className="text-xs font-medium w-2/5">Reg No:</Label>
              <Input
                className="w-3/5 h-5 text-xs"
                name="regNo"
                value=""
                onChange={(e) => handleChange(COLLECTION_TYPES.OUR_DELIVERY, e)}
                disabled={!enabled}
              />
            </div>
          </section>
        </>
      )}

      {collectionType === COLLECTION_TYPES.OUR_DELIVERY &&
        deliveryPerson &&
        data && (
          <section className="flex flex-col w-full h-full gap-2">
            {/* <div className="flex items-center justify-between w-full">
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
              <Input
                className="w-2/3 h-6 text-xs"
                value={deliveryDetails.driverLicenseNo || ""}
                name="driverLicenseNo"
                onChange={(e) => handleChange("delivery", e)}
                disabled={false}
              />
            </div> */}

            <div className="flex items-center justify-between w-full">
              <Label className="text-xs font-medium w-1/3">Car Make:</Label>
              <Input
                className="w-2/3 h-6 text-xs"
                value={deliveryDetails?.carMake || ""}
                name="carMake"
                onChange={(e) => handleChange("delivery", e)}
                disabled={false}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <Label className="text-xs font-medium w-1/3">Phone No:</Label>
              <Input
                className="w-2/3 h-6 text-xs"
                value={deliveryDetails?.phoneNo || ""}
                name="phoneNo"
                onChange={(e) => handleChange(COLLECTION_TYPES.OUR_DELIVERY, e)}
                disabled={false}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <Label className="text-xs font-medium w-1/3">Reg No:</Label>
              <Input
                className="w-2/3 h-6 text-xs"
                value={deliveryDetails?.regNo || ""}
                name="regNo"
                onChange={(e) => handleChange(COLLECTION_TYPES.OUR_DELIVERY, e)}
                disabled={false}
              />
            </div>
          </section>
        )}

      {collectionType === COLLECTION_TYPES.COURIER && (
        <section className="flex flex-col w-full space-y-2">
          <div className="flex items-center justify-between w-full">
            <Label className="text-xs font-medium w-1/3">Courier Name</Label>
            <Select
              value={courierDetails.customerCourierName}
              onValueChange={(value) =>
                handleChange(COLLECTION_TYPES.COURIER, value, "customerCourierName")}
                disabled={!enabled}
            >
              <SelectTrigger className="w-2/3 h-6 text-xs">
                <SelectValue placeholder="Select courier name" />
              </SelectTrigger>
              <SelectContent className="bg-gray-300">
                {courierOptions.map((courier) => (
                  <SelectItem key={courier.value} value={courier.label}>
                    {courier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center w-full justify-between">
            <Label className="text-xs font-medium w-1/3">ID No</Label>
            <Input
              className="w-2/3 h-6 text-xs"
              value={courierDetails.customerCourierId || ""}
              name="customerCourierId"
              onChange={(e) => handleChange(COLLECTION_TYPES.COURIER, e)}
              disabled={!enabled}
            />
          </div>

          <div className="flex items-center w-full justify-between">
            <Label className="text-xs font-medium w-1/3">Phone No</Label>
            <Input
              className="w-2/3 h-6 text-xs"
              value={courierDetails.customerCourierPhone || ""}
              name="customerCourierPhone"
              onChange={(e) => handleChange(COLLECTION_TYPES.COURIER, e)}
              disabled={!enabled}
            />
          </div>

          {/* <div className="flex items-center w-full justify-between">
            <Label className="text-xs font-medium w-1/3">Reg No</Label>
            <Input
              className="w-2/3 h-6 text-xs"
              value={courierDetails.customerCourierRegNo || ""}
              name="customerCourierRegNo"
              onChange={(e) => handleChange(COLLECTION_TYPES.COURIER, e)}
              disabled={!enabled}
            />
          </div> */}
        </section>
      )}
    </div>
  );
}
