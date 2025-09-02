import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useStartStoreProcessMutation,
  usePushToVerificationMutation,
} from "@/features/invoices/storeAPI";

export default function StoreFooter({ rowData, onSubmit, onClose }) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [verificationDisabled, setVerificationDisabled] = useState(true);

  const [startStoreProcess, { isLoading }] = useStartStoreProcessMutation(); // RTK mutation hook
  const [pushToVerification, { isLoading: isPushing }] =
    usePushToVerificationMutation(); // new push mutation

  const handleStart = async () => {
    if (!rowData?.docNum) {
      alert("docNum is missing for this invoice.");
      return;
    }

    try {
      setStartDisabled(true); // disable Start button immediately
      const response = await startStoreProcess(rowData.docNum).unwrap();
      console.log("Store process started:", response);

      setVerificationDisabled(false); // enable Verification button after success
      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to start store process:", err);
      setStartDisabled(false); // re-enable Start button on error
      alert("Failed to start store process. Please try again.");
    }
  };

  const handleVerification = async () => {
    if (!rowData?.docNum) {
      alert("docNum is missing for this invoice.");
      return;
    }

    try {
      setStartDisabled(true);
      setVerificationDisabled(true);

      const response = await pushToVerification({
        docNum: rowData.docNum,
        totalWeightKg: rowData.totalWeightKg || 0,
        storeRemarks: rowData.storeRemarks || "",
      }).unwrap();

      console.log("Pushed to verification:", response);

      if (onSubmit) onSubmit(rowData);
      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to push to verification:", err);
      alert("Failed to push to verification. Please try again.");
      setVerificationDisabled(false); // re-enable button on error
    }
  };

  return (
    <div className="flex flex-row justify-end w-full">
      <Button
        variant="verification"
        onClick={handleStart}
        disabled={startDisabled || isLoading}
        className="mt-2 mr-2 uppercase"
      >
        {isLoading ? "Starting..." : "Start"}
      </Button>
      <Button
        variant="apply"
        onClick={handleVerification}
        disabled={verificationDisabled || isPushing}
        className="mt-2 uppercase"
      >
        {isPushing ? "Sending..." : "Send to Verification"}
      </Button>
    </div>
  );
}
