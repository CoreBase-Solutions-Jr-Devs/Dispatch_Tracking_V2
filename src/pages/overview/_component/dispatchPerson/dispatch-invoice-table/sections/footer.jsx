import { useEffect, useState } from "react";
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
} from "@/features/Dispmain/dispatchAPI";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { useAppDispatch } from "@/app/hook";
import StartPopup from "../../../invoices-data-table/edit-status-dialog/sharedPopup/startpopup";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [nextAction, setNextAction] = useState(null); // 'start' | 'save' | 'push'
  const [authenticatedUser, setAuthenticatedUser] = useState(null); // ✅ Stores who started the operation

  const hasCollectionType = Boolean(selectValues?.collectionType);
  const navigate = useNavigate();

  const { courierDetails, driverDetails, updatedDispatches } = useSelector((state) => state.dispatch);
  const dispatch = useAppDispatch();

  const [startDispatch] = useStartDispatchProcessMutation();
  const [sendDispatch] = usePushDispatchProcessMutation();

  // Ensure Start is disabled if there are no selected dispatches
  useEffect(() => {
    if (updatedDispatches && updatedDispatches.length > 0) {
      setStartDisabled(false);
    } else {
      setStartDisabled(true);
    }
  }, [updatedDispatches]);

  const handleStart = async () => {
    try {
      await startDispatch({ dispatchIds: dispatchIDs }).unwrap();
      if (onEnableSelection) onEnableSelection();
      toast.success("Dispatch started!");
      setDeliveryDisabled(false);
      setSaveDisabled(false);
      setStartDisabled(true);
    } catch (error) {
      toast.error("Dispatch Failed", {
        description: error?.data?.message || error?.data?.title || "Please try again",
        duration: 4000,
      });
      setDeliveryDisabled(true);
      setSaveDisabled(true);
    }
  };

  const handleSave = async () => {
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

    if (selectValues.collectionType === "self-collection" || selectValues.collectionType === "courier") {
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
      dispatch(resetDispatchData());
      navigate(PROTECTED_ROUTES.OVERVIEW);
    } catch (error) {
      toast.error("Dispatch save failed", {
        description: error?.data?.message || error?.data?.title || "Please try again",
        duration: 4000,
      });
      setSaveDisabled(true);
      setStartDisabled(true);
    }

    onSubmit(rowData);
  };

  const handleDelivery = async () => {
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

    if (selectValues.collectionType === "self-collection" || selectValues.collectionType === "courier") {
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
      dispatch(resetDispatchData());
      navigate(PROTECTED_ROUTES.OVERVIEW);
    } catch (error) {
      toast.error("Dispatch push failed", {
        description: error?.data?.message || error?.data?.title || "Please try again",
        duration: 4000,
      });
    }

    onSubmit(rowData);
    if (onClose) onClose();
  };

  // ✅ Authentication gate before running any action
  const requireAuth = (action) => {
    setNextAction(action); // e.g., 'start'
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (user) => {
    setAuthenticatedUser(user);
    setShowAuthModal(false);

    switch (nextAction) {
      case "start":
        handleStart();
        break;
      case "save":
        handleSave();
        break;
      case "push":
        handleDelivery();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-2">
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-sm">
          <StartPopup
            rowData={rowData}
            onClose={() => setShowAuthModal(false)}
            onSubmit={handleAuthSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <div className="flex flex-row justify-center w-full">
        <Button
          variant="apply"
          onClick={() => requireAuth("start")}
          disabled={startDisabled}
          className="mt-1 mr-2 uppercase text-xs font-medium border border-green-400"
        >
          Start
        </Button>

        <Button
          variant="verification"
          onClick={() => requireAuth("save")}
          disabled={saveDisabled}
          className="mt-1 mr-2 uppercase text-xs font-medium"
        >
          Save
        </Button>

        <Button
          variant="apply"
          onClick={() => requireAuth("push")}
          disabled={deliveryDisabled || !hasCollectionType}
          className="mt-1 uppercase text-xs font-medium"
        >
          Push
        </Button>
      </div>

      {/* Show who authenticated */}
      {authenticatedUser && (
        <div className="text-sm text-muted-foreground">
          Operation started by:{" "}
          <span className="font-medium">{authenticatedUser?.userName}</span>
        </div>
      )}
    </div>
  );
}
