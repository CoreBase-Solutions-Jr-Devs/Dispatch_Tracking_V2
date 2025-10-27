import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStartVerificationProcessMutation,
  usePushVerificationInvoiceMutation,
  useRecallDocumentMutation,
} from "@/features/verification/verificationAPI";
import { toast } from "sonner";
import EditStatusDialog from "../edit-status-dialog";
import {  useTypedSelector } from "@/app/hook";
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
  const { user } = useTypedSelector((state) => state.auth);

  const [startDisabled, setStartDisabled] = useState(
    rowData?.workflowStatus === "Verified" || !!rowData?.verifyStartDateTime
  );
  const [dispatchDisabled, setDispatchDisabled] = useState(
    rowData?.workflowStatus !== "In Verification" ||
      !rowData?.verifyStartDateTime
  );

  const [startVerification] = useStartVerificationProcessMutation();
  const [pushVerification] = usePushVerificationInvoiceMutation();
  const [recallDocument] = useRecallDocumentMutation();

  const handleStartApi = async (credentials) => {
    const userName = user?.username || "";
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
    const userName = user?.username || "";

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
    } catch (error) {
      console.error("❌ Push Verification API Error:", error);
      toast.error("Push failed", {
        description: error?.data?.message || "Try again.",
      });
    }
  };

  const handleRecall = async (credentials) => {
    const recalledBy = user?.username || "";

    const payload = {
      docNo: Number(rowData?.docNo),
      currentStage: "Verification",
      targetStage: "Store",
      targetStatus: "Pending_Store",
      recalledBy,
    };

    console.log("🔁 Recall Document Payload:", payload);

    try {
      const response = await recallDocument(payload).unwrap();
      console.log("✅ Recall Document API Response:", response);
      toast.success("Document recalled successfully");
      refetchData?.();
    } catch (error) {
      console.error("❌ Recall Document API Error:", error);
      toast.error("Recall failed", {
        description:
          error?.data?.message || "User not authenticated or invalid request.",
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
      <EditStatusDialog
        view="verificationrecall"
        rowData={rowData}
        onSubmit={handleRecall}
      >
        <Button variant="destructive" className="mt-2 mr-2 uppercase">
          Recall
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
