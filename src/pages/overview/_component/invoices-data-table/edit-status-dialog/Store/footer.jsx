import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStartStoreProcessMutation,
  usePushStoreInvoiceMutation,
} from "@/features/store/storeAPI";
import { toast } from "sonner";
import EditStatusDialog from "../edit-status-dialog";

export default function StoreFooter({
  rowData,
  onSubmit,
  onClose,
  remarks,
  errors,
  setErrors,
  refetchData,
}) {
  const [startDisabled, setStartDisabled] = useState(
    rowData?.workflowStatus === "Processed" || !!rowData?.storeStartDateTime
  );

  const [verificationDisabled, setVerificationDisabled] = useState(
    rowData?.workflowStatus !== "In Process" || !rowData?.storeStartDateTime
  );

  const [startStore] = useStartStoreProcessMutation();
  const [pushStore] = usePushStoreInvoiceMutation();

  const handleStartApi = async (credentials) => {
    const userName = credentials?.userName || credentials?.user?.username;
    const docNum = Number(rowData?.docNo);

    if (!userName) {
      toast.error("Username is missing. Cannot start store process.");
      console.warn("⚠️ Missing userName in credentials:", credentials);
      return;
    }

    try {
      const response = await startStore({ docNum, userName }).unwrap();
      console.log("✅ Store Start API Response:", response);

      toast.success("Store process started successfully");
      setStartDisabled(true);
      refetchData?.();
    } catch (error) {
      console.error("❌ Store Start API Error:", error);
      toast.error("Failed to start store process", {
        description: error?.data?.message || "Try again.",
      });
    }
  };

  const handleVerification = async (credentials) => {
    const userName = credentials?.userName || credentials?.user?.username;

    if (!userName) {
      console.warn("⚠️ Missing userName in credentials:", credentials);
      toast.error("Username is missing. Cannot push to Verification.");
      return;
    }

    const payload = {
      docNum: Number(rowData?.docNo),
      userName,
      totalWeightKg: rowData?.totalWeightKg ?? 0,
      storeRemarks: remarks ?? "",
    };

    console.log("📦 Push Store payload:", payload);

    try {
      const response = await pushStore(payload).unwrap();
      console.log("✅ Push Store API Response:", response);

      toast.success("Pushed to Verification successfully");
      setVerificationDisabled(true);
      refetchData?.();
    } catch (error) {
      console.error("❌ Push Store API Error:", error);
      toast.error("Push failed", {
        description: error?.data?.message || "Try again.",
      });
    }
  };

  const handleClose = () => onClose?.();

  return (
    <div className="flex flex-row justify-between w-full">
      <EditStatusDialog
        view="storestart"
        rowData={rowData}
        onSubmit={handleStartApi}
      >
        <Button
          variant="default"
          disabled={startDisabled}
          className="mt-2 uppercase"
        >
          Start
        </Button>
      </EditStatusDialog>

      <EditStatusDialog
        view="storepush"
        rowData={rowData}
        onSubmit={handleVerification}
      >
        <Button
          variant="apply"
          disabled={verificationDisabled}
          className="mt-2 uppercase"
        >
          Send to Verification
        </Button>
      </EditStatusDialog>
 
      <Button
        variant="destructive"
        onClick={handleClose}
        className="mt-2 mr-2 uppercase"
      >
        Close
      </Button>
    </div>
  );
}
