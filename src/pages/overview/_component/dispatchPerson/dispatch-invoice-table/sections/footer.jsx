import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePushDispatchProcessMutation, useStartDispatchProcessMutation } from "@/features/dispatch/dispatchAPI";
import { useSaveSelectedDispatchesMutation } from "@/features/dispatch/dispatchAPI";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCarMake, setCarPlate, setCollectionType, setCustomerCourierId, setCustomerCourierName, setCustomerCourierPhone, setDispatch, setDispatchIds, setDriverId, setDriverName, setInvoices, setRouteCode, setRouteName } from "@/features/dispatch/dispatchSlice";

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
  // const [customerCourierName, setCustomerCourierName] = useState("" || null);
  // const [customerCourierId, setCustomerCourierId] = useState(0 || null);
  // const [customerCourierPhone, setCustomerCourierPhone] = useState("" || null);
  const [dispatchRemarks, setDispatchRemarks] = useState("");
  const [isPush, setIsPush] = useState(true);

  const {driverDetails} = useSelector(state => state.dispatch);

  const {
  courierDetails,
} = useSelector((state) => state.dispatch);

  console.log(courierDetails)


  const dispatch = useDispatch();

  const [startDispatch, {data: startData, isLoading: startLoading, isError: startError }] = useStartDispatchProcessMutation();
  const [sendDispatch, {data,isLoading,isError}] = usePushDispatchProcessMutation();
  // const [saveSelectedDispatches, {data:saveData, isLoading:saveLoading, isError:saveError}] = useSaveSelectedDispatchesMutation();

  const handleStart = async () => {
    try {
      const data = await startDispatch().unwrap();
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
      driverName: driverDetails?.driverName,
      driverId: driverDetails?.driverId,
      carMake: driverDetails?.carMake,
      carPlate: driverDetails?.regNo,
      customerCourierName:courierDetails?.customerCourierName,
      customerCourierId:courierDetails?.customerCourierId,
      customerCourierPhone:courierDetails?.customerCourierPhone,
      isPush: false
    }
    try {
      const data = await sendDispatch(formData).unwrap();
      dispatch(setDispatch(formData));
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

//     {
//     "driverId": 23,
//     "driverName": "delivery1",
//     "personalId": "123456789",
//     "driverLicenseNo": "D1234567",
//     "phoneNo": "+254792514851",
//     "email": "mikewanj@gmail.com",
//     "carMake": "Toyota Hilux",
//     "regNo": "KBA123A"
// }

    const formData = {
      dispatchIds: [],
      collectionType: 'DELIVERY',
      routeCode,
      routeName,
      driverName:driverDetails?.driverName,
      driverId:driverDetails?.driverId,
      carMake:driverDetails?.carMake,
      carPlate:driverDetails?.regNo,
      customerCourierName:courierDetails?.customerCourierName,
      customerCourierId:courierDetails?.customerCourierId,
      customerCourierPhone:courierDetails?.customerCourierPhone,
      dispatchRemarks,
      isPush: true
    }
    try {
      const data = await sendDispatch(formData).unwrap();
      dispatch(setDispatch(formData));
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
