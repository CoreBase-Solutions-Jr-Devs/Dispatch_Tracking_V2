import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  resetDispatchData,
  setDispatch,
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
}) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [dispatchRemarks, setDispatchRemarks] = useState("");
  const hasCollectionType = Boolean(selectValues?.collectionType);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { courierDetails, driverDetails } = useSelector(
    (state) => state.dispatch
  );

  const [startDispatch] = useStartDispatchProcessMutation();
  const [sendDispatch] = usePushDispatchProcessMutation();

  const handleStart = async () => {
    const payload = { dispatchIds: dispatchIDs };

    try {
      const data = await startDispatch(payload).unwrap();
      console.log("✅ Dispatch Start Response:", data);

      setStartDisabled(true);
      setDeliveryDisabled(false);
      setSaveDisabled(false);

      if (onEnableSelection) onEnableSelection();
      toast.success("Dispatch started successfully!");
    } catch (error) {
      console.error("❌ Dispatch Start Error:", error);
      toast.error("Dispatch start failed", {
        description:
          error?.data?.message || error?.data?.title || "Please try again.",
      });
      setDeliveryDisabled(true);
      setSaveDisabled(true);
    }
  };

  const handleSave = async () => {
    setSaveDisabled(false);
    setStartDisabled(true);
    setDeliveryDisabled(true);

    const formData = {
      dispatchIds: dispatchIDs,
      collectionType: selectValues.collectionType,
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

      toast.success("Dispatch saved successfully!");
      console.log("✅ Dispatch Save Response:", data);

      setDeliveryDisabled(false);
      dispatch(resetDispatchData());
      navigate(PROTECTED_ROUTES.OVERVIEW);
    } catch (error) {
      console.error("❌ Dispatch Save Error:", error);
      toast.error("Saving failed", {
        description:
          error?.data?.message ||
          error?.data?.title ||
          "Saving failed. Please try again.",
      });
      setSaveDisabled(true);
      setStartDisabled(true);
    }

    onSubmit?.(rowData);
  };

  const handleDelivery = async () => {
    setStartDisabled(true);
    setSaveDisabled(true);
    setDeliveryDisabled(false);

    const formData = {
      dispatchIds: dispatchIDs,
      collectionType: selectValues.collectionType,
      routeName: selectValues?.dispatchRoute,
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
      console.log("✅ Dispatch Push Response:", data);

      dispatch(resetDispatchData());
      navigate(PROTECTED_ROUTES.OVERVIEW);
    } catch (error) {
      console.error("❌ Dispatch Push Error:", error);
      toast.error("Dispatch push failed", {
        description:
          error?.data?.message ||
          error?.data?.title ||
          "Dispatch push failed. Please try again.",
      });
      setDeliveryDisabled(true);
    }
  };

  return (
    <div className="flex justify-end gap-2 p-4 border-t">
      <Button
        variant="outline"
        onClick={onClose}
        className="text-gray-600 border-gray-400"
      >
        Cancel
      </Button>

      <Button
        onClick={handleStart}
        disabled={startDisabled}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Start
      </Button>

      <Button
        onClick={handleSave}
        disabled={!hasCollectionType || saveDisabled}
        className="bg-green-600 text-white hover:bg-green-700"
      >
        Save
      </Button>

      <Button
        onClick={handleDelivery}
        disabled={!hasCollectionType || deliveryDisabled}
        className="bg-orange-600 text-white hover:bg-orange-700"
      >
        Push
      </Button>
    </div>
  );
}
