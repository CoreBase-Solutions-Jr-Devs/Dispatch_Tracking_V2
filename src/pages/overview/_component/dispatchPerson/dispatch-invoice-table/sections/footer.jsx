import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePushDispatchProcessMutation, useStartDispatchProcessMutation } from "@/features/dispatch/dispatchAPI";
import { useSaveSelectedDispatchesMutation } from "@/features/dispatch/dispatchAPI";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCarMake, setCarPlate, setCollectionType, setCustomerCourierId, setCustomerCourierName, setCustomerCourierPhone, setDispatchIds, setDriverId, setDriverName, setInvoices, setRouteCode, setRouteName } from "@/features/dispatch/dispatchSlice";

export default function DispatchFooter({ rowData, onSubmit, onClose }) {
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
  const [customerCourierName, setCustomerCourierName] = useState("" || null);
  const [customerCourierId, setCustomerCourierId] = useState(0 || null);
  const [customerCourierPhone, setCustomerCourierPhone] = useState("" || null);
  const [dispatchRemarks, setDispatchRemarks] = useState("");
  const [isPush, setIsPush] = useState(true);

  const dispatch = useDispatch();

  const [startDispatch, {data: startData, isLoading: startLoading, isError: startError }] = useStartDispatchProcessMutation();
  const [sendDispatch, {data,isLoading,isError}] = usePushDispatchProcessMutation();
  // const [saveSelectedDispatches, {data:saveData, isLoading:saveLoading, isError:saveError}] = useSaveSelectedDispatchesMutation();

  const handleStart = async (event) => {
    try {
      const data = await startDispatch('CSC999').unwrap();
      console.log(data);
      setStartDisabled(false);
    } catch (error) {
      let description = "Please check your credentials and try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) description = error.data.message;
      toast.error("Dispatch Process can not start. Please try again.", 
        { description, duration: 4000 });
    }
    setDeliveryDisabled(false);
    setSaveDisabled(false);
  };

  const handleSave = async () => {
    setSaveDisabled(false);
    setStartDisabled(true);
    setDeliveryDisabled(true);

    const formData = {
      dispatchIds: [],
      collectionType: 'DELIVERY',
      routeCode: 0 || null,
      routeName: '' || null,
      driverName,
      driverId,
      carMake,
      carPlate,
      customerCourierName,
      customerCourierId,
      customerCourierPhone,
      isPush: false
    }
    try {
      const data = await sendDispatch(formData).unwrap();
      dispatch(setDispatchIds({ dispatchIds: data.dispatchIds }));
      dispatch(setCollectionType({ collectionType: data.collectionType }));
      dispatch(setRouteCode({ routeCode: data.routeCode }));
      dispatch(setRouteName({ routeName: data.routeName }));
      dispatch(setDriverName({ driverName: data.driverName }));
      dispatch(setDriverId({ driverId: data.driverId }));
      dispatch(setCarMake({ carMake: data.carMake }));
      dispatch(setCarPlate({ carPlate: data.carPlate }));
      dispatch(setCustomerCourierName({ customerCourierName: data.customerCourierName }));
      dispatch(setCustomerCourierId({ customerCourierId: data.customerCourierId }));
      dispatch(setCustomerCourierPhone({ customerCourierPhone: data.customerCourierPhone }));
      console.log(data);
    } catch (error) {
      let description = "Saving failed. Please try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) description = error.data.message;

      toast.error("Error saving invoices! Please try again.", { description, duration: 4000 });
    }
    onSubmit(rowData);
    setSaveDisabled(true);
    setStartDisabled(false);
    setDeliveryDisabled(false);
  }

  const handleDelivery = async () => {
    setStartDisabled(true);
    setSaveDisabled(true);
    setDeliveryDisabled(false);

    const formData = {
      dispatchIds: [],
      collectionType: 'DELIVERY',
      routeCode,
      routeName,
      driverName,
      driverId,
      carMake,
      carPlate,
      customerCourierName,
      customerCourierId,
      customerCourierPhone,
      dispatchRemarks,
      isPush: true
    }
    try {
      const data = await sendDispatch(formData).unwrap();
      dispatch(setDispatchIds({ dispatchIds: data.dispatchIds }));
      dispatch(setCollectionType({ collectionType: data.collectionType }));
      dispatch(setRouteCode({ routeCode: data.routeCode }));
      dispatch(setRouteName({ routeName: data.routeName }));
      dispatch(setDriverName({ driverName: data.driverName }));
      dispatch(setDriverId({ driverId: data.driverId }));
      dispatch(setCarMake({ carMake: data.carMake }));
      dispatch(setCarPlate({ carPlate: data.carPlate }));
      dispatch(setCustomerCourierName({ customerCourierName: data.customerCourierName }));
      dispatch(setCustomerCourierId({ customerCourierId: data.customerCourierId }));
      dispatch(setCustomerCourierPhone({ customerCourierPhone: data.customerCourierPhone }));
      dispatch(setDispatchRemarks({ dispatchRemarks: data.dispatchRemarks }));
      dispatch(setIsPush({ isPush: data.isPush }));
      console.log(data);
    } catch (error) {
      let description = "Saving failed. Please try again.";
      if (error?.data?.errors) {
        const errorMessages = Object.values(error.data.errors).flat();
        if (errorMessages.length > 0) description = errorMessages.join(" ");
      } else if (error?.data?.message) description = error.data.message;

      toast.error("Error saving invoices! Please try again.", { description, duration: 4000 });
    }

    onSubmit(rowData);
    if (onClose) onClose();
    setDeliveryDisabled(true);
    setStartDisabled(false);
    setSaveDisabled(false);
  };

  return (
    <div className="flex flex-row justify-end w-full">
      <Button
        variant="apply"
        onClick={handleStart}
        disabled={startDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium border border-green-400"
      >
        Start
      </Button>
      <Button
        variant="verification"
        onClick={handleSave}
        disabled={saveDisabled}
        className="mt-1 mr-2 uppercase text-xs font-medium"
      >
        Save
      </Button>
      <Button
        variant="apply"
        onClick={handleDelivery}
        disabled={deliveryDisabled}
        className="mt-1 uppercase text-xs font-medium "
      >
        Send to Dispatch
      </Button>
    </div>
  );
}
