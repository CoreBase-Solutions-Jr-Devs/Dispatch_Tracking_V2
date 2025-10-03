import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { useSaveSelectedDispatchesMutation } from "@/features/dispatch/dispatchAPI";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  setCarMake,
  setCarPlate,
  setCollectionType,
  setCustomerCourierId,
  setCustomerCourierName,
  setCustomerCourierPhone,
  setDispatch,
  setDispatchIds,
  setDriverId,
  setDriverName,
  setInvoices,
  setRouteCode,
  setRouteName,
} from "@/features/dispatch/dispatchSlice";
import {
  usePushDispatchProcessMutation,
  useStartDispatchProcessMutation,
} from "@/features/Dispmain/dispatchAPI";
import EditStatusDialog from "../../../invoices-data-table/edit-status-dialog/edit-status-dialog";

export default function DispatchFooter({
  dispatchIDs,
  rowData,
  selectValues,
  onSubmit,
  onClose,
}) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [collectionType, setCollectionType] = useState("");
  const [routeCode, setRouteCode] = useState(0);
  const [routeName, setRouteName] = useState("");
  const [driverName, setDriverName] = useState("" || null);
  const [driverId, setDriverId] = useState(0 || null);
  const [carMake, setCarMake] = useState("" || null);
  const [carPlate, setCarPlate] = useState("" || null);
  // const [customerCourierName, setCustomerCourierName] = useState("" || null);
  // const [customerCourierId, setCustomerCourierId] = useState(0 || null);
  // const [customerCourierPhone, setCustomerCourierPhone] = useState("" || null);
  const [dispatchRemarks, setDispatchRemarks] = useState("");
  const [isPush, setIsPush] = useState(true);

  const { courierDetails, driverDetails, clientDetails } = useSelector(
    (state) => state.dispatch
  );

  const dispatch = useDispatch();

  const [
    startDispatch,
    { data: startData, isLoading: startLoading, isError: startError },
  ] = useStartDispatchProcessMutation();
  const [sendDispatch, { data, isLoading, isError }] =
    usePushDispatchProcessMutation();
  // const [saveSelectedDispatches, {data:saveData, isLoading:saveLoading, isError:saveError}] = useSaveSelectedDispatchesMutation();

  const handleStart = async () => {
    const payload = {
      dispatchIds: dispatchIDs,
    };
    try {
      const data = await startDispatch(payload).unwrap();
      console.log(data);
      // if (refetchData) setTimeout(() => refetchData(), 50);
      setStartDisabled(false);
      toast.success("Dispatch started!");
    } catch (error) {
      // let description = "Please check your credentials and try again.";
      // if (error?.data?.errors) {
      //   const errorMessages = Object.values(error.data.errors).flat();
      //   if (errorMessages.length > 0) description = errorMessages.join(" ");
      // } else if (error?.data?.message) description = error.data.message;
      // toast.error("Dispatch Process can not start. Please try again.", {
      //   duration: 2500,
      // });

      toast.error("Dispatched Failed", {
        description:
          error?.data?.message || error?.data?.title || "Please try again",
        duration: 4000,
      });
    }
    setDeliveryDisabled(false);
    setSaveDisabled(false);
  };

  const handleSave = async () => {
    setSaveDisabled(false);
    setStartDisabled(true);
    setDeliveryDisabled(true);

    const formData = {
      dispatchIds: dispatchIDs,
      collectionType: selectValues.collectionType,
      // routeCode: 0 || null,
      routeName: selectValues?.dispatchRoute || null,
      driverName: driverDetails?.driverName,
      driverId: driverDetails?.driverId,
      carMake: driverDetails?.carMake,
      carPlate: driverDetails?.regNo,
      customerCourierName: courierDetails?.customerCourierName,
      customerCourierId: courierDetails?.customerCourierId,
      customerCourierPhone: courierDetails?.customerCourierPhone,
      isPush: false,
    };
    try {
      const data = await sendDispatch(formData).unwrap();
      dispatch(setDispatch(formData));

      toast.success("Dispatch saved succesfully!");
      // if (refetchData) refetchData();
      console.log(data);
    } catch (error) {
      let description = "Saving failed. Please try again.";
      // if (error?.data?.errors) {
      //   const errorMessages = Object.values(error.data.errors).flat();
      //   if (errorMessages.length > 0) description = errorMessages.join(" ");
      // } else if (error?.data?.message) description = error.data.message;

      toast.error("Dispatching start Failed", {
        description: error?.data?.message || error?.data?.title || description,
        duration: 4000,
      });
      setSaveDisabled(true);
      setStartDisabled(false);
    }
    onSubmit(rowData);
    setSaveDisabled(true);
    setStartDisabled(false);
    setDeliveryDisabled(false);
  };

  const handleDelivery = async () => {
    setStartDisabled(true);
    setSaveDisabled(true);
    setDeliveryDisabled(false);

    const formData = {
      dispatchIds: dispatchIDs,
      collectionType: selectValues.collectionType,
      // routeCode,
      routeName:selectValues?.dispatchRoute,
      driverName: driverDetails?.driverName,
      driverId: driverDetails?.driverId,
      carMake: driverDetails?.carMake,
      carPlate: driverDetails?.regNo,
      customerCourierName: courierDetails?.customerCourierName,
      customerCourierId: courierDetails?.customerCourierId,
      customerCourierPhone: courierDetails?.customerCourierPhone,
      dispatchRemarks,
      isPush: true,
    };
    try {
      const data = await sendDispatch(formData).unwrap();
      dispatch(setDispatch(formData));

      toast.success("Dispatch pushed succesfully!");
      // if (refetchData) refetchData();
      console.log(data);
    } catch (error) {
      let description = "Saving failed. Please try again.";
      // if (error?.data?.errors) {
      //   const errorMessages = Object.values(error.data.errors).flat();
      //   if (errorMessages.length > 0) description = errorMessages.join(" ");
      // } else if (error?.data?.message) description = error.data.message;

      toast.error("Dispatching push Failed", {
        description: error?.data?.message || error?.data?.title || description,
        duration: 4000,
      });
    }

    onSubmit(rowData);
    if (onClose) onClose();
    setDeliveryDisabled(true);
    setStartDisabled(false);
    setSaveDisabled(false);
  };

  return (
    <div className="flex flex-row justify-center w-full">
      <EditStatusDialog
        rowData={rowData}
        view="dispatchstart"
        onSubmit={handleStart}
      >
        <Button
          variant="apply"
          // onClick={handleStart}
          disabled={startDisabled}
          className="mt-1 mr-2 uppercase text-xs font-medium border border-green-400"
        >
          Start
        </Button>
      </EditStatusDialog>
      <EditStatusDialog
        rowData={rowData}
        view="dispatchstart"
        onSubmit={handleSave}
      >
        <Button
          variant="verification"
          // onClick={handleSave}
          disabled={saveDisabled}
          className="mt-1 mr-2 uppercase text-xs font-medium"
        >
          Save
        </Button>
      </EditStatusDialog>
      <EditStatusDialog
        rowData={rowData}
        view="dispatchstart"
        onSubmit={handleDelivery}
      >
        <Button
          variant="apply"
          // onClick={handleDelivery}
          disabled={deliveryDisabled}
          className="mt-1 uppercase text-xs font-medium "
        >
          Push
        </Button>
      </EditStatusDialog>
    </div>
  );
}
