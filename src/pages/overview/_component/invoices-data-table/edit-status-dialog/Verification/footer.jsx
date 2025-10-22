import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStartVerificationProcessMutation,
  usePushVerificationInvoiceMutation,
} from "@/features/verification/verificationAPI";
import { toast } from "sonner";
import EditStatusDialog from "../edit-status-dialog";

export default function VerificationFooter({
  rowData,
  onSubmit,
  credentials,
  onClose,
  remarks,
  errors,
  setErrors,
  refetchData,
  setRemarks,
}) {
  const [startDisabled, setStartDisabled] = useState(
    rowData?.workflowStatus === "Verified" || !!rowData?.verifyStartDateTime
  );
  const [dispatchDisabled, setDispatchDisabled] = useState(
    rowData?.workflowStatus !== "In Verification" ||
      !rowData?.verifyStartDateTime
  );

  const [startVerification] = useStartVerificationProcessMutation();
  const [pushVerification] = usePushVerificationInvoiceMutation();

  const handleStartApi = async (credentials) => {
    const userName =
      credentials?.userName ||
      credentials?.UserName ||
      credentials?.user?.username ||
      "system";
    const docNum = Number(rowData?.docNo);

    try {
      const response = await startVerification({ docNum, userName }).unwrap();
      console.log("✅ Verification Start API Response:", response);
      toast.success("Verification process started successfully");
      setStartDisabled(true);
      setDispatchDisabled(false);
      refetchData?.();
    } catch (error) {
      console.error("❌ Verification Start API Error:", error);
      toast.error("Failed to start verification process", {
        description: error?.data?.message || "Try again.",
      });
    }
  };

  const handleDispatch = async (credentials) => {
    const userName =
      credentials?.userName ||
      credentials?.UserName ||
      credentials?.user?.username ||
      "system";

    if (!userName) {
      toast.error("Username is missing. Cannot push to Dispatch.");
      return;
    }

    const payload = {
      docNum: Number(rowData?.docNo),
      userName,
      totalWeightKg: rowData?.totalWeightKg ?? 0,
      verificationRemarks: remarks ?? "",
    };

    console.log("📦 Push Verification payload:", payload);

    try {
      const response = await pushVerification(payload).unwrap();
      console.log("✅ Push Verification API Response:", response);
      toast.success("Sent to Dispatch successfully");
      setDispatchDisabled(true);
      refetchData?.();
    } catch (error) {
      console.error("❌ Push Verification API Error:", error);
      toast.error("Push failed", {
        description: error?.data?.message || "Try again.",
      });
    }
  };

  const handleClose = () => onClose?.();

  return (
    <div className="flex flex-row justify-between w-full">
      <EditStatusDialog
        view="verificationstart"
        rowData={rowData}
        onSubmit={handleStartApi}
      >
        <Button
          variant="default"
          disabled={startDisabled}
          className="mt-2 mr-2 uppercase"
        >
          Start
        </Button>
      </EditStatusDialog>

      <EditStatusDialog
        view="verificationpush"
        rowData={rowData}
        onSubmit={handleDispatch}
      >
        <Button
          variant="apply"
          disabled={dispatchDisabled}
          className="mt-2 uppercase"
        >
          Send to Dispatch
        </Button>
      </EditStatusDialog>
      <Button
        variant="destructive"
        onClick={handleClose}
        className="mt-2 mr-2 uppercase"
      >
        Recall
      </Button>
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
