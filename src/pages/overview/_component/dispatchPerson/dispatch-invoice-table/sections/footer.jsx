import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { useSaveSelectedDispatchesMutation } from "@/features/dispatch/dispatchAPI";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDispatchData,
  setAssignedTo,
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
} from "@/features/dispatch/dispatchAPI";
import EditStatusDialog from "../../../invoices-data-table/edit-status-dialog/edit-status-dialog";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { useAppDispatch } from "@/app/hook";

export default function DispatchFooter({
  dispatchIDs,
  rowData,
  selectValues,
  onSubmit,
  onClose,
  onEnableSelection,
  dispatchRemarks,
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
  const [isPush, setIsPush] = useState(true);
  const hasCollectionType = Boolean(selectValues?.collectionType);
  const navigate = useNavigate();

  const { courierDetails, driverDetails, clientDetails } = useSelector(
    (state) => state.dispatch
  );

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [
    startDispatch,
    { data: startData, isLoading: startLoading, isError: startError },
  ] = useStartDispatchProcessMutation();
  const [sendDispatch, { data, isLoading, isError }] =
    usePushDispatchProcessMutation();
  // const [saveSelectedDispatches, {data:saveData, isLoading:saveLoading, isError:saveError}] = useSaveSelectedDispatchesMutation();

  const handleStart = async (username) => {
    const payload = {
      dispatchIds: dispatchIDs,
      userName: user?.username || "",
    };
    try {
      const data = await startDispatch(payload).unwrap();
      dispatch(setAssignedTo(data?.assignedTo || "—"));
      console.log(data);
      // if (refetchData) setTimeout(() => refetchData(), 50);
      if (onEnableSelection) onEnableSelection();
      setDeliveryDisabled(false);
      setSaveDisabled(false);
      setStartDisabled(true);
      toast.success("Dispatch started!");
    } catch (error) {
      toast.error("Dispatch Failed", {
        description:
          error?.data?.message || error?.data?.title || "Please try again",
        duration: 4000,
      });
      setDeliveryDisabled(true);
      setSaveDisabled(true);
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
      userName: user?.username || "",
    };

    if (selectValues.collectionType === "delivery") {
      delete formData.customerCourierId;
      delete formData.customerCourierName;
      delete formData.customerCourierPhone;
    }

    if (
      selectValues.collectionType === "self-collection" ||
      selectValues.collectionType === "courier"
    ) {
      delete formData.driverId;
      delete formData.driverName;
      delete formData.routeName;
      delete formData.carMake;
      delete formData.carPlate;
    }

    try {
      const data = await sendDispatch(formData).unwrap();
      dispatch(setDispatch(formData));

      toast.success("Dispatch saved succesfully!");
      console.log(data);
      setDeliveryDisabled(false);
      dispatch(resetDispatchData());
      navigate(PROTECTED_ROUTES.OVERVIEW);
    } catch (error) {
      let description = "Saving failed. Please try again.";

      toast.error("Dispatching start Failed", {
        description: error?.data?.message || error?.data?.title || description,
        duration: 4000,
      });
      setSaveDisabled(true);
      setStartDisabled(true);
    }
    onSubmit(rowData);
    setSaveDisabled(true);
    setStartDisabled(true);
  };

  const handleDelivery = async () => {
    setStartDisabled(true);
    setSaveDisabled(true);
    setDeliveryDisabled(false);

    const formData = {
      dispatchIds: dispatchIDs,
      collectionType: selectValues.collectionType,
      userName: user?.username || "",
      // routeCode,
      routeName: selectValues?.dispatchRoute,
      driverName: driverDetails?.driverName,
      driverId: Number(driverDetails?.driverId.slice(2)),
      carMake: driverDetails?.carMake,
      carPlate: driverDetails?.regNo,
      customerCourierName: courierDetails?.customerCourierName,
      customerCourierId: courierDetails?.customerCourierId,
      customerCourierPhone: courierDetails?.customerCourierPhone,
      dispatchRemarks,
      isPush: true,
    };

    {
      /* Remove unneccessary values from payload */
    }
    if (selectValues.collectionType === "delivery") {
      delete formData.customerCourierId;
      delete formData.customerCourierName;
      delete formData.customerCourierPhone;
    }

    if (
      selectValues.collectionType === "self-collection" ||
      selectValues.collectionType === "courier"
    ) {
      delete formData.driverId;
      delete formData.driverName;
      delete formData.routeName;
      delete formData.carMake;
      delete formData.carPlate;
    }

    try {
      const data = await sendDispatch(formData).unwrap();
      dispatch(setDispatch(formData));

      toast.success("Dispatch pushed successfully!");
      console.log(data);
      navigate(PROTECTED_ROUTES.OVERVIEW);
      dispatch(resetDispatchData());
    } catch (error) {
      let description = "Saving failed. Please try again.";

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
          disabled={deliveryDisabled || !hasCollectionType}
          className="mt-1 uppercase text-xs font-medium "
        >
          Push
        </Button>
      </EditStatusDialog>
    </div>
  );
}
