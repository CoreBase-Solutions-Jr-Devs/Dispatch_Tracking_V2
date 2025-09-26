import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DeliveryFooter({
  rowData,
  // onClose,
  isLoading,
  generateOTP,
  onSubmit,
}) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);

  // const handleGenerateOTP = () => {
  //   return
  //   // setStartDisabled(true);
  //   // setDeliveryDisabled(false);
  //   // if (onClose) onClose();
  // };

  const handleDelivery = () => {
    setStartDisabled(true);
    setDeliveryDisabled(true);
    if (onSubmit) onSubmit(rowData);
    // if (onClose) onClose();
  };

  return (
    <div className="flex flex-row justify-end max-w-full gap-5">
      {/* <Button
        variant="default"
        onClick={handleStart}
        className="mt-1 uppercase text-xs font-medium"
      >
        Print
      </Button> */}
      <Button
        variant="default"
        onClick={generateOTP}
        disabled={!rowData?.CUS_CODE}
        className="mt-1  uppercase text-xs font-medium"
      >
        Generate OTP
      </Button>
      <Button
        variant="apply"
        onClick={handleDelivery}
        disabled={isLoading || rowData?.BALANCE > 0}
        className="mt-1  uppercase text-xs font-medium"
      >
        Complete
      </Button>
    </div>
  );
}
